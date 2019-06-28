<template>
    <div id="management">
        <div :class="['sidebar',{sidebar2:showSidebar==true}]">
            <div class="sidebar-content">
                <router-link v-for="(link,index) of links" :key="index" :to="{path:`/management/${link.route}`}"
                    @click.native="currentLink=link.route;showSidebar=false">
                    {{link.name}}
                </router-link>
            </div>
            <div class="show-side-bar" @click="showSidebar=!showSidebar">
                <span v-if="showSidebar">&lt;</span>
                <span v-else>&gt;</span>
            </div>
        </div>
        <div class="view">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name:"Management",
    data(){
        return {
            links:[
                {name:"数据分析",route:"dataAnalysis"},            
                {name:"用户信息修改",route:"userPermission"},
                {name:"设备基础信息",route:"equipmentInfo"},
                {name:"项目基础信息",route:"projectInfo"},
                {name:"设备报修请求",route:"answerRequest"},                
                // {name:"项目基础信息",route:"projectInfo"},
                {name:"备份",route:"backups"},                
                {name:"日志",route:"logs"}           
            ],
            currentLink:"dataAnalysis",
            showSidebar:false
        }
    },
    watch: {
        currentLink(){
            console.log(this.currentLink)
        }
    },
    methods: {
    }
}
</script>
<style>

#management .sidebar{
    position: fixed;
    top:75px;
    left:0;
    right:80%;
    bottom: 0;
    transition: all .5s ease;
    border-right:1px solid lightgray;
    background: white;
    z-index: 20;
}
#management .sidebar-content{
    width:100%;
    height:100%;
    overflow: auto
}
#management .view{
    position: fixed;
    top:75px;
    left:20%;
    right:0;
    bottom: 0;
    transition: all .5s ease;
    z-index: 0;
}
#management a{
    text-decoration-line: none;
    width:150px;
    padding: 20px;
    display: block;
    border:1px solid lightgray;
    margin:0 auto;
    margin-top:15px;
    color:black;
    font-size: 16px;
    font-weight: bold;
    /* display: inline-block; */
    /* width:15%; */
}
#management a:hover{
    color:white;
    background: #2f3542
}
#management a.router-link-exact-active{
    color:white;
    background: rgb(206, 7, 7);
}
#management .show-side-bar{
    border:1px solid lightgray;
    border-left:none;
    height:40px;
    width: 20px;
    line-height: 40px;
    position: absolute;
    right:-21px;
    top:50%;
    background: white;
    z-index:30;
    cursor: pointer;
    display: none;
}
@media screen and (max-width: 1000px){
    #management .sidebar{
        position: fixed;
        width:200px;
        top:75px;
        /* left:-200px; */
        bottom: 0;
        border:1px solid lightgray;
        /* transition: all .5s ease; */
        transform:translateX(-100%);
    }
    /* #management .sidebar1{
    } */
    #management .sidebar2{   
        transform:translateX(0);
    }
    #management .view{
        position: fixed;
        top:75px;
        left:0;
        right:0;
        bottom: 0;
    }
    #management .show-side-bar{
        /* border-radius: 50%; */   
        display:block
    }
}
</style>

