<template>
  <transition name="move">
    <div class="mDetail" v-show="isShow">
      <div class="topBar posir">
        <!-- 点击返回时，如果视频在播放中，需要关闭isShow=!isShow  并重新添加视频遮罩层等 -->
        <span class="iconfont icon-left leftArr" @click="closeDetail"></span>
      </div>
      <!-- {{moiveData}} -->
      <!-- 电影预告视频 -->
      <div class="moiveBox posir">
        <video width="100%" :poster="moiveData.poster" ref="mInfo" :src="moiveData.trailer"></video>
        <div class="mask" v-show="showMask" @click="playMovie">
          <p class="iconfont icon-ttpodicon">
            <span></span>
          </p>
          <div>{{mTime}}</div>
        </div>
      </div>
      <!-- 电影详情-电影基本信息 -->
      <div class="moiveInfoBox pd20 mt20">
        <div class="moiveCover">
          <img :src="moiveData.cover" :alt="moiveData.name" class="w100" />
        </div>
        <div class="moiveInfo">
          <h4 class="mb10">{{moiveData.name}}</h4>
          <p>{{moiveData.basicInfo}}</p>
          <p>{{moiveData.originalName}}</p>
          <p>{{moiveData.totalTime}}</p>
          <p class="cutFont">{{moiveData.releaseDate}}</p>
          <div class="scoreBox mt20">
            <h5 class="brown">综合评分：</h5>
            <div class="scoreInfo">
              <strong class="orange">{{moiveData.score}}</strong>
              <div class="prisedBox">
                <movie-star :score="moiveData.score"></movie-star>
                <span class="gray">
                  <em>{{moiveData.prisedCounts}}</em>&nbsp;&nbsp;人点赞
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 剧情介绍 -->
      <article class="plotDesc pd20">
        <h4 class="gray">剧情介绍</h4>
        <p>{{moiveData.plotDesc}}</p>
      </article>
      <!-- 备注：json中并未提供演职人员的数据，所以这里省去 -->
      <!-- 剧照 -->
      <article class="plotPics">
        <h4 class="gray">剧照</h4>
        <ul class="plotImg">
          <!-- 注意：
                    1、剧照的json的数组是字符串数组，需要通过JSON.parse转为数组对象后才能通过v-for得到每一张图片 ，但是如果直接在v-for中使用JSON.parse(moiveData.plotPics)会有问题。所以需要在数据传进来（或被另一部电影刷新）时就做处理（在计算属性中）

                    2、假如想直接将v-for循环得到的单个元素直接使用在v-for标签中是不行的，只会得到最后一个item,因为v-for需要使用到父级上，才能使用循环出来的每一个item,但你可以通过在外面包裹一层虚拟的transition标签实现
                    <transition  v-for="pic,index in ">
                    <img :src="pic" alt="">
                    </transition>
          -->
          <li v-for="(pic,index) in plotPicsArr">
            <!-- 给div添加背景图是用来解决使用img图片时，原图片大小不一的问题，如果背景图要放变量，后面的值如果还有字符串，需要做拼接处理 -->
            <div :style="{backgroundImage:'url('+pic+')'}"></div>
            <img :src="pic" />
          </li>
        </ul>
      </article>
    </div>
  </transition>
</template>

<script>
// 星星评分组件
import movieStar from "./movieStar.vue";

export default {
  props: {
    moiveData: Object,
  },
  data() {
    return {
      isShow: false,
      mTime: "",
      showMask: true,
    };
  },
  methods: {
    // show方法会有父组件的ref属性控制，因为写在自定义标签的ref，父组件可以访问子组件中所有的属性和方法
    show() {
      this.isShow = true;
    },
    // 如果点击了向左的关闭按钮
    closeDetail() {
      // 首先隐藏详情页
      this.isShow = false;
      // 然后让视频遮罩层等恢复未点击前的状态
      this.$refs.mInfo.pause();
      this.showMask = true;
      this.$refs.mInfo.removeAttribute("controls");
    },
    playMovie() {
      this.showMask = false;
      this.$refs.mInfo.setAttribute("controls", true);
      // this.$refs.mInfo.controls=true;
      this.$refs.mInfo.play();
    },
  },
  components: {
    movieStar,
  },
  computed: {
    // 通过计算属性去监听movieData中对应每一部电影的改变，然后更新每一部电影的剧照，添加到created只会触发一次，后面的电影不会更新剧照，如果添加到updated则会不断触发，陷入死循环
    plotPicsArr() {
      if (this.moiveData.plotPics) {
        return JSON.parse(this.moiveData.plotPics);
        // console.log(this.moiveData.plotPics)
      }
    },
  },
  updated() {
    // 获取电影时长,土方法
    // setTimeout(() => {
    // console.log(this.$refs.mInfo.duration);
    // console.log(formatTime(this.$refs.mInfo.duration));
    // this.mTime=formatTime(this.$refs.mInfo.duration);
    // }, 1000);
    // 通过loadedmetadata来监测视频是否已经下载完毕，只有下载完毕才会有duration属性
    this.$refs.mInfo.addEventListener("loadedmetadata", () => {
      this.mTime = formatTime(this.$refs.mInfo.duration);
    });
  },
};
//时间格式化函数
function formatTime(t) {
  var h = toZero(parseInt(t / 3600));
  var m = toZero(parseInt((t % 3600) / 60));
  var s = toZero(parseInt(t % 60));
  return h + ":" + m + ":" + s;
}

function toZero(num) {
  return num < 10 ? "0" + num : num;
}
</script>

<style lang="less" scoped>
.mDetail {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0.92rem;
  overflow-y: scroll;
  z-index: 30;
  background-color: #f7f5fa;
  transition: all 0.3s linear;
  &.move-enter,
  &.move-leave {
    transform: translate(0, 0);
  }
  &.move-enter-active,
  &.move-leave-active {
    transform: translate(100%, 0);
  }
}
// 返回按钮
.leftArr {
  position: absolute;
  color: #fff;
  width: 0.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.4rem;
  top: 0.2rem;
  left: 0.2rem;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
}
</style>