<template>
    <div id="app">
        <!-- 路由视图 -->
        <router-view></router-view>
        <!-- 导航 -->
        <div class="fixedTop"></div>
        <ul class="navList">
            <router-link to="/" tag="li" exact>
                <a>
                    <i class="iconfont icon-dianying"></i>
                    <span>首页</span>
                </a>
            </router-link>
            <router-link :to="{path:'search'}" tag="li">
                <a>
                    <i class="iconfont icon-sousuo"></i>
                    <span>搜索</span>
                </a>
            </router-link>
            <router-link :to="{path:'me'}" tag="li">
                <a>
                    <i class="iconfont icon-wo1"></i>
                    <span>我的</span>
                </a>
            </router-link>
           
        </ul>
        
    </div>
</template>

<script>
export default{
    data(){
        return{
            
        }
    },
    methods:{
       
    }
}    
</script>
<!-- 
样式中如果要写less，在style标签中给添加一个lang="less"属性
 -->
<style lang="less">

</style>