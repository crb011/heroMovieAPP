<!-- 组件： -->
<template>
    <div class="me">
       <!-- -->
       <div class="uInfo">
           <img src="../assets/img/ia_100000000350.png" alt="">
           <div class="loginText">
               注册/登录
           </div>
       </div>
       <div class="ubox">
           <span class="bgText">
               N
           </span>
           <span class="bgText">
               E
           </span>
           <span class="bgText">
               X
           </span>
           <span class="bgText">
               T
           </span>

       </div>
    </div>
</template>

<script>
export default{
    data(){
        return{

        }
    }
}
</script>

<style type="text/css">  
    .me{
        background-color: #fff;
        min-height: 13rem;
    }
    .uInfo{
        height: 3rem;
        background: url(../assets/img/ia_100000000351.png);
        background-size: cover;
        display: flex;
        align-items: center;
        padding: 0.25rem;
    }
    .uInfo img{
        /* flex: 1; */
        width: 1.2rem;
        height: 1.2rem;
        display: block;
        border-radius: 50%;

    }
    .uInfo .loginText{
        color: #6c4e18;
        font-size: 0.34rem;
        margin-left: 0.5rem;
    }
    .ubox{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .bgText{
        font-size: 1.2rem;
        color: #f8f8f8;
    }
</style>