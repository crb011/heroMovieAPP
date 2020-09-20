<!-- 组件： -->
<template>
  <div class="home">
    <!-- 首页幻灯片，使用touchSlide.js实现的 -->
    <div id="slideBox" class="slideBox">
      <div class="bd">
        <ul>
          <li v-for="item,index in slideList" :key="index">
            <a class="pic" href="#">
              <img :src="item.image" />
            </a>
          </li>
        </ul>
      </div>

      <div class="hd">
        <ul></ul>
      </div>
    </div>
    <!-- 热门超英 -->
    <div class="hotMoive mt20">
      <h4 class="mTitle pd20">
        <span class="iconfont icon-zuire red"></span>
        热门超英
      </h4>
      <div class="hotMoiveView">
        <ul class="hotMoiveList clearfix">
          <li v-for="item,index in hotList" @click="selectMoive(item)">
            <img :src="item.cover" :alt="item.name" />
            <h5 class="cutFont">{{item.name}}</h5>
            <!-- 因为星星评分在很多地方都使用到了，所以可以做成组件导入到这里 -->
            <movieStar :score="item.score"></movieStar>
          </li>
        </ul>
      </div>
    </div>
    <!-- 热门预告 -->
    <div class="hotMoive mt20">
      <h4 class="mTitle pd20">
        <span class="iconfont icon-yugao green"></span>
        热门预告
      </h4>
      <div class="previewMoive">
        <ul class="previewMoiveList clearfix">
          <li v-for="item,index in yugaoList" v-if="index<2" :key="index">
            <div class="moiveBox posir">
              <!-- 隐形的问题说明（非bug）：如果给video标签添加了controls属性，不管是动态添加还是手动添加，都无法在该标签上绑定点击事件等 -->
              <video width="100%" :poster="item.poster" ref="v" :src="item.trailer"></video>
              <div class="mask" v-show="showMask[index]" @click="playMovie(index)">
                <!-- 播放按钮 -->
                <p class="iconfont icon-ttpodicon"></p>
                <!-- 总时长 -->
                <div>{{mTime[index]}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <!-- 热门预告 -->
    <div class="hotMoive mt20">
      <h4 class="mTitle pd20">
        <span class="iconfont icon-caiwoxihuan blue"></span>
        猜你喜欢
      </h4>
      <div class="guessUlike">
        <ul class="guessUlikeList clearfix">
          <li class="pd20" v-for="item,index in uLikeList" :key="index" @click="selectMoive(item)">
            <div class="uMovieImg">
              <img :src="item.cover" :alt="item.name" />
            </div>
            <div class="uMoiveDesc">
              <h5 class="cutFont">{{item.name}}</h5>
              <movie-star :score="item.score"></movie-star>
              <p>{{item.basicInfo}}</p>
              <p>{{item.releaseDate}}</p>
            </div>
            <div class="uMovieZan orange">
              <span class="iconfont icon-zan"></span>
              <span>赞一下</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 这里是电影详情，覆盖在首页上 -->
    <movieDetail :moiveData="selectMovieInfo" ref="showDetail"></movieDetail>
  </div>
</template>

<script>
// 导入评分组件
import movieStar from "./movieStar.vue";
import movieDetail from "./movieDetail.vue";
export default {
  data() {
    return {
      // 幻灯片
      slideList: [],
      // 记录幻灯片执行次数，如果大于2次则不重复调用了，用来解决小圆点重复生成的bug
      dotCall: 0,
      // 热门超英占位符
      hotList: [],
      // 热门预告
      yugaoList: [],
      // 猜你喜欢
      uLikeList: [],
      // 选中的电影信息
      selectMovieInfo: {},
      // 因为有2部预告片，所以在这里使用数组来显示各自的视频总时长和是否显示遮罩层
      mTime: {},
      showMask: [true, true],
    };
  },
  methods: {
    // 在vue中是可以使用DOM的JS选择器的
    selectMoive(item) {
      this.selectMovieInfo = item;
      // 通过父组件控制子组件movieDetail.vue的show方法
      this.$refs.showDetail.show();
    },
    // 点击遮罩层播放视频
    playMovie(i) {
      // 数组需要使用splice才能响应式更新
      this.showMask.splice(i, 1, false);
      // console.log(this.showMask[i]);
      this.$refs.v[i].setAttribute("controls", true);
      // this.$refs.v[i].controls=true;

      // 如果其他视频处于播放中，需要暂停，这时可以先将所有的视频暂停，再播放本视频
      for (let j = 0; j < this.showMask.length; j++) {
        if (this.$refs.v[i].paused) {
          this.$refs.v[i].play();
          this.$refs.v[j].pause();
        }
      }
    },
    // 点击当前视频的播放暂停按钮时，如果该视频在播放需要暂停其他视频(但是如果该视频的控件是由浏览器提供的，则在移动端给video绑定的事件是无效的，除非禁用浏览器控件改为自己实现自定义播放器)
    // isPlay(i){
    //    for(let j=0;j<this.showMask.length;j++){
    //        console.log(j);
    //         if(this.$refs.v[i].paused){
    //             console.log(2)
    //             this.$refs.v[i].play();
    //             this.$refs.v[j].pause();
    //         }
    //     }
    // }
  },
  components: {
    movieStar,
    movieDetail,
  },
  // 钩子函数，在生成渲染DOM树之前会执行
  created() {
    //获取幻灯片数据
    this.$axios
      .get("json/index-slide.json")
      // 假设获取数据成功，则会执行then方法
      .then((res) => {
        // console.log(res.data.data);
        this.slideList = res.data.data;
      })
      // 否则会执行catch方法：捕捉
      .catch(function (err) {
        // console.log(err);
        console.log("获取数据失败，请稍后再试！");
      });
    // 添加热门超英的JSON
    this.$axios.get("json/index-hot.json").then((res) => {
      // console.log(res.data.data)
      this.hotList = res.data.data;
    });
    // 添加热门预告的JSON
    this.$axios.get("json/index-yugao.json").then((res) => {
      // console.log(res.data.data)
      this.yugaoList = res.data.data;
    });
    // 添加猜你喜欢的JSON
    this.$axios.get("json/index-guss-u-like.json").then((res) => {
      // console.log(res.data.data)
      this.uLikeList = res.data.data;
    });
  },
  updated() {
    //这里添加if用来解决导致幻灯片很多小圆点的问题
    // 因为updated钩子函数不只是执行一次，只要数据引起DOM更新就会执行，所以这里的TouchSlide被重复调用了很多次，所以圆点被重复追加了。那么思路就是只让TouchSlide只执行一次即可，方法有多种，这里提供了一个变量(该变量写在data中的)来记录执行次数，如果大于2次就不执行了
    if (this.dotCall < 1) {
      TouchSlide({
        slideCell: "#slideBox",
        titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        mainCell: ".bd ul",
        effect: "leftLoop",
        autoPage: true, //自动分页
        autoPlay: true, //自动播放
      });
      // 这里执行一次后计数
      this.dotCall++;
    }

    // 为什么要添加if语句呢？
    // 首先如果v-for结合了ref,那么得到的是数组元素。但是ref配合for使用时，因为时间差的问题，当第一个video绘制后，此时还是单元素，所以打印出来是一个DOM元素，后面第二个也绘制出来了，这时打印出来就变2个元素了，所以导致当你通过数组来视图访问第一个数组元素，那就会报“  Cannot read property '0' of undefined”的错误，所以就确保所有的refs数组成型了再给视频绑定元素
    if (this.$refs.v != undefined) {
      var v = this.$refs.v;
      for (let i = 0; i < v.length; i++) {
        v[i].addEventListener("loadedmetadata", () => {
          // 这里的mTime为什么是对象？
          // 这是因为updated被重复执行了很多次，如果是数组，因为它是有顺序之分的，可能导致前两次存放的视频时长都是同一个视频的，这样在浏览器中看也是一个视频，所以需要改为对象的方式，因为对象是不允许有重复key值的，就能做到每个视频的唯一性，获取的时长也是唯一的对应的
          this.$set(this.mTime, i, formatTime(v[i].duration));
        });
      }
    }
  },
};

//时间格式化函数
function formatTime(t) {
  var h = toZero(parseInt(t / 3600)); // 时
  var m = toZero(parseInt((t % 3600) / 60)); // 分
  var s = toZero(parseInt(t % 60)); // 秒
  return h + ":" + m + ":" + s;
}
// 时间补0
function toZero(num) {
  return num < 10 ? "0" + num : num;
}
</script>

<style type="text/css">
/*幻灯片样式*/
.slideBox {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  max-width: 7.5rem; 
}
.slideBox .hd {
  position: absolute;
  height: 28px;
  line-height: 28px;
  bottom: 0.5rem;
  right: 2.5rem;
  z-index: 1;
}
.slideBox .hd li {
  display: inline-block;
  width: 10px;
  height: 10px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  background: #333;
  text-indent: -9999px;
  overflow: hidden;
  margin: 0 6px;
}
.slideBox .hd li.on {
  background: #fff;
}
.slideBox .bd {
  position: relative;
  z-index: 0;
}
.slideBox .bd li {
  position: relative;
  text-align: center;
}
.slideBox .bd li img {
  vertical-align: top;
  width: 100%;
}
</style>