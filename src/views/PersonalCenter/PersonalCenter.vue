<template>
    <div id="personal-center">
        <div class="nav-row">
            <div class="sidebar">
                <div class="link-area">
                    <router-link v-for="(route,index) of routes" :key="index" :to="{path:route.path}">{{route.name}}</router-link>
                </div>
            </div>
            <div class="view">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"PersonalCenter",
    data () {
        return {
            routes:[
                {name:"用户基础信息",path:"userInfo"},
                {name:"预约管理",path:"userOrderManagement"},
                {name:"消息中心",path:"messageCenter"}
            ]
        }
    }
}
</script>
<style>
#personal-center .sidebar{
    width: 20%;
    height:500px;
    margin-top:10px;
    border-right:1px solid lightgray;
    /* border-top:1px solid gray; */
    float:left;
}
#personal-center .sidebar .link-area{
    width:100%;
    padding-top:30px;
}
#personal-center .sidebar a{
    display: block;
    width:80%;
    /* height:30px; */
    line-height: 20px;
    border:1px solid lightgray;
    text-decoration-line: none;
    margin:0 auto;
    margin-top:30px;
    padding: 20px 10px;
    color:black
}
#personal-center .sidebar a:hover{
    background: #2f3542;
    color:white;
}
#personal-center .sidebar .link-area a.router-link-exact-active{
    color:white;
    background: rgb(206, 7, 7);
}
#personal-center .view{
    width:79%;
    float:left;
}
@media screen and (max-width: 1000px){
    #personal-center .nav-row{
        width:100vw;
    }
    #personal-center .sidebar a{
        width:60%;
        padding:10px 10px;
        margin-top:20px;
    }
}

</style>

