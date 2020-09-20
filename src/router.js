import Vue from 'vue';
// 开始路由配置
/*
1、在main.js的工作（）
 */
import vueRouter from 'vue-router';
// console.log(vueRouter)
// 路由是插件，需要在main.js中启用
Vue.use(vueRouter);
// 配置路由对象，即在这里实现一个url对应一个组件
// 在这里导入要在路由中关联的组件
import home from './components/home.vue';
import search from './components/search.vue';
import me from './components/me.vue';
// 导入404组件
import notfound from './components/404.vue'

// 这里会产生一个路由实例对象，需要在vue的实例中注册
let router = new vueRouter({
    // 启用history模式
    mode:"history",
    linkActiveClass:"cur",
    routes:[
    // 每一个对象对应的是一个url和组件
        {
            path:"/",
            name:'home',
            component:home
        },
        {   
            // path对应的是url部分，当url的地址栏是#/about时，就会显示对应的组件
            path:"/search",
            // name:'about',
            component:search
        },
        {    
            path:"/me",
            // 在每一个配置中添加name属性来实现命名路由，可以更精简路由名字
            name:'me',
            component:me
            
        },
        {
            // *表示匹配除上面以外的路径时就显示nofonfound组件
            path:"*",
            component:notfound,
            // redirect是跳转的意思
            // redirect:'/about' //字符串的形式：
            // redirect:{name:'about'} //对象的形式
            // 选择性的跳转：
            // redirect:function(to){
            //     // to表示的是目标路由对象，保存的是所有的跟目标路由有关的信息，比如你访问的是：
            //     // http://localhost:8080/contact此时该路径即为目标路由
            //     // console.log(to)
            //     if(to.path=="/123"){
            //         return {name:'about'};
            //     }else if(to.path=="/456"){
            //         return {name:'home'};  
            //     }else{
            //         return {name:'contact'};
            //     }
            // }
        }
    ]
});
// 将router.js导出给其他文件使用
export default router;