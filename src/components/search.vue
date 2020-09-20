<!-- 组件： -->
<template>
  <div class="search">
    <!-- -->
    <form class="searchForm posir">
      <span class="iconfont icon-sousuo"></span>
      <input type="text" placeholder="输入关键字搜索预告片" />
    </form>
    <ul class="searchList">
      <li v-for="item,index in searchList" :key="index" @click="selectMoive(item)">
        <img :src="item.cover" />
      </li>
    </ul>
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
      // 搜索数据
      searchList: [],
      // 选中的电影信息
      selectMovieInfo: {},
    };
  },
  methods: {
    // 在vue中是可以使用DOM的JS选择器的
    selectMoive(item) {
      this.selectMovieInfo = item;
      // 通过父组件控制子组件movieDetail.vue的show方法
      this.$refs.showDetail.show();
    },
  },
  components: {
    movieStar,
    movieDetail,
  },
  created() {
    //获取幻灯片数据
    this.$axios
      .get("json/search.json")
      // 假设获取数据成功，则会执行then方法
      .then((res) => {
        this.searchList = res.data.data.rows;
      })
      // 否则会执行catch方法：捕捉
      .catch(function (err) {
        console.log("获取数据失败，请稍后再试！");
      });
  },
};
</script>

<style type="text/css">
.searchForm {
  padding: 0.2rem;
}
.searchForm span {
  position: absolute;
  left: 0.3rem;
  top: 0.26rem;
}
.searchForm input {
  display: block;
  width: 100%;
  background: #eaeaea;
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0 0.2rem 0 0.5rem;
  box-sizing: border-box;
}
.searchList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #fff;
  padding: 0.2rem 0;
}
.searchList > li {
  flex: 1;
  width: 2rem;
  height: 100%;
  margin: 0.2rem 0;
}
.searchList img {
  display: block;
  width: 2rem;
  height: 2.7rem;
  margin: 0 auto;
}
</style>