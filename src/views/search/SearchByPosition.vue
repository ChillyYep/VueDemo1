<template>
    <div id="search-by-position">
        <div class="nav-row">
            <div class="position-selector-layout">
                <div class="sidebar">
                    <div class="title">
                        <div class="line"></div>
                        <span>请选择目标城市</span>
                    </div>                    
                <div class="body">
                        <table>
                            <tr v-for="(address,index1) of addresses" :key="index1">
                                <td v-for="(position,index2) of address" :key="index2">
                                    <!-- <router-link :to="{path:`/search/byPosition/${postion.postion}`}">{{postion.name}}</router-link> -->
                                    <div :class="{active:selectedAddress===position}" @click="selectedAddress=position">{{position}}</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="device-list">
                    <!-- <router-view></router-view> -->
                    <DeviceList category="position" :address="selectedAddress"></DeviceList>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DeviceList from '@/views/search/DeviceLists.vue'
export default {
    name:"SearchByPosition",
    data(){
        return{
            addresses:[
                ["杭州","宁波"],
                ["上海","苏州"],
                ["南京","无锡"],
                ["北京","天津"],
                ["重庆","成都"],
                ["长沙","呼和浩特"]
            ],
            selectedAddress:""
        }
    },
    mounted(){
        this.selectedAddress="杭州";
    },
    components: {
        DeviceList
    }
}
</script>
<style>
#search-by-position .position-selector-layout{
    display: table;
    width:100%;
}
#search-by-position .sidebar{
    display: table-cell;
    vertical-align: top;
    width:20%;
    border-left:1px solid lightgray;
    border-right:1px solid lightgray;
}
#search-by-position  .title{
    text-align: start;
    color: gray;
    margin:20px 10px;
    font-size:13px;
    margin-bottom: 10px; 
    position: relative;
}
#search-by-position  .title .line{
    border-bottom: 1px solid rgb(116, 114, 114);
    width:100%;
}
#search-by-position  .title span{
    position: absolute;
    /* display: block; */
    background: white;
    top:-10px;
    left:20px;
}
#search-by-position .body{
    max-height:600px;
    overflow-y: auto;
    overflow-x: hidden;
}
#search-by-position .body table{
    width:100%;
    height:fit-content;
}
#search-by-position .body tr{
    width:100%;
    height:30px;
}
#search-by-position .body td{
    width:50%;
    height:100%;
}
#search-by-position .body td div{
    color:black;
    font-size: 15px;
    margin-left:10px;
    padding:5px;
    cursor: pointer;
}
#search-by-position .body td div:hover{
    background-color: lightgray
}
#search-by-position .body td div.active{
    background: rgb(206, 7, 7);
    color:white
}
#search-by-position .device-list{
    display: table-cell;
    vertical-align: top;
}
@media screen and (max-width: 1000px){
    #search-by-position .nav-row{
        width:100%;
    }
}
@media screen and (max-width: 800px){
    #search-by-position .position-selector-layout .sidebar{
        width:150px;
    }
}
</style>
