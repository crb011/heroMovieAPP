<template>
  <div class="starList">
    <span v-for="yellow in yellowScore" class="iconfont icon-Starlarge orange"></span>
    <span v-for="gray in grayScore" class="iconfont icon-Starlarge gray"></span>
    <em>{{score}}</em>
  </div>
</template>

<script>
export default {
  props: {
    score: 0,
  },
  data() {
    return {
      yellowScore: 0,
      grayScore: 5,
    };
  },
  watch: {
    //详情页的星星虽然将score传进来了，但是created()并没有触发，所以需要重新监听并更新data中的星星数据
    score(val) {
      this.yellowScore = parseInt(val / 2);
      this.grayScore = 5 - this.yellowScore;
    },
  },
  created() {
    // 使用created是能确保在页面载入时根据传进来的值点亮星星，但是只会运行一次，所以导致点击不同的电影时，星星不会点亮，那就需要到监听属性中更新data中的yellowScore和grayScore的值
    // 定义一个临时变量，以确保传递过来的值是合法有效的
    var temp = 0;
    if (this.score != null && this.score != undefined && this.score != "") {
      // 分数共为10分，所以1颗星星代表2分
      temp = this.score;
      // 再根据score的值计算黄色星星、灰色星星个数
      this.yellowScore = parseInt(temp / 2);
      this.grayScore = 5 - this.yellowScore;
    }
  },
};
</script> 

<style scoped>
.starList {
  height: 0.24rem;
  line-height: 0.24rem;
}
.starList span,
.starList em {
  float: left;
}
.iconfont {
  font-size: 0.24rem;
}
.starList em {
  font-size: 0.24rem;
  margin-left: 0.1rem;
  font-style: normal;
}
</style>