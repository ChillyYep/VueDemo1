<template>
<div id="search-by-all">
    <div class="nav-row">
        <div class="layout">
            <div class="type-selector">
                <ul>
                    <li v-for="(deviceCategory,index) of deviceCategorys" :key="index" @click="currentSelected=deviceCategory.route" :class="{actived:currentSelected==deviceCategory.route}">
                        <router-link :to="{path:`/search/byCategory/${deviceCategory.route}`}">{{deviceCategory.category}}</router-link>
                    </li>
                    <li></li>
                </ul>
            </div>
            <div class="device-list">
                <router-view></router-view>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:"SearchByAll",
    data(){
        return{
            deviceCategorys:[
                {category:"全部设备",route:"all"},
                {category:"原料药设备及机械",route:"crudeDrug"},
                {category:"制剂机械",route:"pharmaceutical"},
                {category:"药用粉碎机械",route:"medicinalPulverizer"},
                {category:"饮片机械",route:"yinpian"},
                {category:"制药用水设备",route:"waterUsed"},
                {category:"药品包装机械",route:"packaging"},
                {category:"药物检测设备",route:"detection"},
                {category:"其他制药机械及设备",route:"others"},
            ],
            currentSelected:""
        }
    },
    updated(){
        this.updateSelected()
    },
    mounted(){
        this.updateSelected()
    },
    methods: {
        updateSelected(){
            let path=this.$route.path;
            this.currentSelected=path.split('/').pop();
            console.log(this.currentSelected)
        }
    }
}
</script>

<style>
#search-by-all .layout{
    width:100%;
    display: table;
}
#search-by-all .type-selector{
    width:210px;
    display: table-cell;
    vertical-align: top;
}
#search-by-all ul{
    border-left:1px solid lightgray;
    border-right:1px solid lightgray;
    width:200px;
    margin-top:10px;
    padding:0 5px 20px 5px;
    list-style-type: none;
    text-align: start;
}
#search-by-all .device-list{
    display: table-cell;
    vertical-align: top;
}
#search-by-all ul li{
    height:fit-content;
    font-size:14px;
    color:black;
    cursor: pointer;
    border-top:1px solid lightgray;
}
#search-by-all ul li a{
    color:black;
    height:35px;
    line-height: 35px;
    width:100%;
    display:block;
    padding:5px 0 5px 15px;
    text-decoration-line: none;
}
#search-by-all ul li.actived,#search-by-all ul li:hover{
    border-left:5px solid black;
    transition: 0.2s
}
@media screen and (max-width: 1000px){
    #search-by-all .nav-row{
        width:100%;
    }
}
@media screen and (max-width:700px){
    #search-by-all .type-selector{
        width:140px;
    }
    #search-by-all ul{
        width:130px;
    }
    #search-by-all ul li{
        font-size: 12px;
    }
    #search-by-all ul li a{
        height:20px;
        line-height: 20px;
    }
}
</style>
