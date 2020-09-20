import Vue from 'vue';
import App from './App';

// 将生产环境的错误提示关闭（生产环境是每个人都可以看到，没必要暴露自己的bug给用户看）
Vue.config.productionTip=false;

// 将全局样式导进来
import reset from './assets/css/reset.css'
import style from './assets/css/style.css'
import iconfont from './assets/font/iconfont.css'

// 将路由的配置文件，即router/index.js导入,可以写成'./router'
import router from './router'

// 将Axios导入
import Axios from 'axios'
//为了全局使用，可以将axios挂载到vue的prototype中
//在组件中使用时，格式为this.$axios({})或this.$axios.get('url')
Vue.prototype.$axios=Axios;

new Vue({
    // 在vue根实例中注册一下组件
    router,
    el:"#app",
    render : h => h(App)
});