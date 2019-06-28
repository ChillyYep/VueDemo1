<template>
    <div id="nav-header">
        <div class="container">
            <div class="nav-bars">
                <font-awesome-icon icon="bars" @click="showNavCenter=true"></font-awesome-icon>
            </div>
            <div class="nav-left">
                <div class="home-img">
                    <router-link to="/">
                        <!-- <span>perficient</span> -->
                        <img src="../assets/img/2015_logo_horiz_notag_png.png"  height="100%" width="100%" alt="logo">
                    </router-link>
                </div>
            </div>
            <div :class="['nav-center',{'show-nav-center':showNavCenter}]">
                <div class="close">
                    <font-awesome-icon icon="times" @click="showNavCenter=false"></font-awesome-icon>
                </div>
                <div class="nav-item" @click="showNavCenter=false">
                    <router-link to="/">首页</router-link>
                </div>
                <div class="nav-item" @click="showNavCenter=false">
                    <router-link to="/search/byCategory">查询及预约</router-link>
                </div>
                <div class="nav-item" @click="showNavCenter=false">
                    <router-link to="/management">后台管理</router-link>                    
                </div>
            </div>            
            <div class="nav-right">
                <div>
                    <template v-if="loginState==0">
                        <router-link to="/login">登录/注册</router-link>
                    </template>
                    <template v-else>
                        <router-link to="/user">用户中心</router-link>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'NavHeader',
        props: {
            loginState:Boolean
        },
        data () {
            return {
                showNavCenter:false
            }
        }
    }
</script>
<style>
.nav-row{
    width:80%;
    margin:0 auto;
}
.nav-row::before,.nav-row::after{
    content: "";
    display: table;
}
.nav-row::after{
    clear: both;
}
</style>

<style>
#nav-header{
    border-bottom: 1px solid lightgray;
}
#nav-header .container::before,.container::after{
    content: "";
    display: table;
}
#nav-header .container::after{
    clear: both;
}
#nav-header .nav-left,#nav-header .nav-center{
    float:left;
}
#nav-header .nav-left .home-img a{
    padding: 0 10px;
    display: flex;
    height:60px;
    justify-content: center;
    align-items: center
}
#nav-header .nav-center .nav-item a,#nav-header .nav-right a{
    display: block;
    text-decoration-line: none;
    -ms-text-decoration-line: none;
    color: black;
    font-size:16px;
    font-weight: bold;
    height:60px;
    padding:0 20px; 
    width:80px;
    line-height: 60px;  
    text-align: center;
}
#nav-header .nav-center::after,#nav-header .nav-center::before{
    content: "";
    display:table
}
#nav-header .nav-center::after{
    clear: both;
}
#nav-header .nav-center div.nav-item{
    float:left;
    border-right:1px solid lightgray;
}
#nav-header .nav-left{
    border-right:1px solid lightgray;
    width:fit-content;
}
#nav-header .nav-center div.nav-item:hover{
    background:rgba(224, 224, 224, 0.815)
}
#nav-header .nav-left div,#nav-header .nav-center div,#nav-header .nav-right div{
    min-width: 80px;
    cursor: pointer;
}
#nav-header .nav-right div{
    float:right;
    background: rgb(206, 7, 7);
}
#nav-header .nav-right div:hover{
    background: #ff4757
}

#nav-header .nav-right a{
    color:white    
}
#nav-header .home-img{
    width:fit-content;
}
#nav-header .nav-bars{
    height:60px;
    line-height:60px;
    width: 60px;
    text-align: center;
    font-size: 25px;
    border:none;
    color:black;
    float:left;
    display: none;
    cursor: pointer;
}
#nav-header .close{
    height:40px;
    line-height:40px;
    text-align: end;
    font-size:30px;
    padding-right: 10px;
    cursor: pointer;
    color:white;
    display: none;
}
#nav-header .nav-left a img{
    height:40px;
    width:200px;
    margin-left:10px;
}
@media screen and (max-width: 790px){
    #nav-header .nav-center{
        position:fixed;
        right:100%;
        top:0;
        width:50%;
        height:100%;
        background: rgba(0, 0, 0, 0.8);
        z-index:40;
    }
    #nav-header .nav-item{
        clear: float;
        display: none;
    }
    #nav-header .show-nav-center{
        right:50%;
        top:0;
        transition: all .5s ease
    }
    #nav-header .show-nav-center .nav-item{
        clear: left;
        display: block;
        width:100%;
        border:none!important;
    }
    #nav-header .show-nav-center .nav-item a{
        color:white;
        width:80%;
        margin:0 auto;
    }
    #nav-header .show-nav-center .close{
        display: block;
    }
    #nav-header .nav-left{
        min-width:100px;
        border:none;
        width:30%;
    }
    #nav-header .nav-bars{
        display: block
    }
}
@media screen and (max-width: 400px){
    #nav-header .home-img{
        display: none;
    }
}
</style>
