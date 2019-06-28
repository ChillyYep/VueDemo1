<template>
    <div id="device-lists">
        <Loading v-show="isLoading"></Loading>
        <div class="page-title">
            <div class="line"></div>
            <span>查询结果</span>
        </div>
        <div class="list-body">
            <div class="list-item" v-for="item in itemLists" :key="item.eId">
                <div class="item-layout">
                    <div class="photo-area">
                        <img :src="item.eImage" alt="devicePhoto">
                    </div>
                    <div class="text-area">
                        <div class="content">
                            <!-- <div class="text-area"> -->
                                <div class="text-title">
                                    <p>名称：{{item.eName}}</p>
                                </div>
                                <div class="text-body">
                                    <p>品牌：{{item.eBrand}}</p>
                                    <p>型号：{{item.eModel}}</p>
                                    <p>状态：{{item.eState}}</p>                            
                                </div>
                            <!-- </div> -->
                        </div>
                    </div>
                    <div class="btn-area">
                        <button @click="gotoOrder(item)">开始预约</button>
                    </div>                  
                </div>
            </div>
        </div>
        
        <Toast message="该设备已经没有库存了" :isShow="isEmpty"></Toast> 
        <div class="endline"><span>所有设备都已经在这了</span></div>
    </div>
</template>
<script>
import Toast from '@/components/Toast.vue'
import Loading from '@/components/Loading1.vue'
export default {
    name:"DeviceLists",
    props: {
        category:String,
        id:Number,
        address:String,
        timeAndWay:Object,
        keyword:String
    },
    data(){
        return {
            itemLists:[],
            isEmpty:false,
            timer:null,
            way:"",
            isLoading:false,
            // testList:[{eId:"1",eName:"原料药设备机械",eBrand:"龙岩",eModel:"25-MH54",eAddress:"台州",eState:"可用",eType:"ss",eImage:""},
            // {eId:"2",eName:"制剂机械",eBrand:"z",eModel:"z",eAddress:"z",eState:"可用",eType:"ss",eImage:""},
            // {eId:"3",eName:"药用粉碎机械r",eBrand:"zz",eModel:"zz",eAddress:"zz",eState:"可用",eType:"ss",eImage:""}]
        }
    },
    components: {
        Toast,
        Loading
    },
    //加载数据
    watch:{
        category(){
            this.getWay();
            this.reLoad();
        },
        keyword(){
            this.getWay();
            this.reLoad();
        },
        id(){
            this.getWay();
            this.reLoad();
        },
        address(){
            this.getWay();
            this.reLoad();
        },
        timeAndWay(val){
            if(val.timeStr!=""){
                this.getWay();
                this.reLoad();
                console.log('timeStr:', val.timeStr);
            }
        }
    },
    mounted(){
        this.getWay();
        if(typeof(this.category)!="undefined"&&(this.way=="all"||this.way=="type"||this.way=="keyword")){
            this.loadItems();
        }
    },
    methods: {
        loadItems(){
            this.isLoading=true;
            this.axios({
                method:"get",
                url:"/search/deviceList",
                params:{
                    way:this.way,
                    data:this.getData(),
                    uIdentity:this.$root.getIdentity(),
                    code:this.getCode()
                },
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                }
            }).then(res=>{
                this.itemLists=res.data.list;
                this.isLoading=false;
                this.isEmpty=(this.itemLists.length==0);
                this.setLocalTimer();                        
            }).catch(error=>{
                alert(error);
                this.itemLists=[];
                this.isLoading=false;
            })
        },
        gotoOrder(item){
            this.$router.push({name:"order",params:{deviceInfo:item}});
        },
        getWay(){
            switch(this.category){
                case "all":this.way="all";break;
                case "project":this.way="pid";break;
                case "person":this.way="uid";break;
                case "position":this.way="address";break;
                case "time":this.way="time";break;
                case "keyword":this.way="keyword";break;
                default:this.way="type";break;
            }
        },
        getData(){
            switch(this.way){
                case "type":return this.category;
                case "all":return "all";
                case "pid":
                case "uid":return typeof(this.id)=="undefined"?"":this.id;
                case "address":return this.address;
                case "time":return this.timeAndWay.timeStr;
                case "keyword":return this.keyword;
                default:break;

            }
        },
        getCode(){
            return (typeof(this.timeAndWay)=="undefined")?-1:this.timeAndWay.selectedWay;
        },
        setLocalTimer(){
            if(this.isEmpty==true){
                if(this.timer!=null){
                    clearTimeout(this.timer);
                    this.timer=null;
                }
                this.timer=setTimeout(()=>{
                    this.isEmpty=false;
                    console.log('setTimeout');
                },3000)
            }else{
                if(this.timer!=null){
                    clearTimeout(this.timer);
                    this.timer=null;
                }
            }
        },
        reLoad(){
            this.loadItems();
        }
    }
}
</script>
<style>
#device-lists{
    width:100%;
    position: relative;
}
#device-lists p{
    text-overflow: ellipsis
}
#device-lists .page-title{
    text-align: start;
    color: gray;
    font-size:13px;
    width:100%; 
    position: relative;
    margin:20px 0;
}
#device-lists .page-title .line{
    border-bottom: 1px solid rgb(116, 114, 114);
    margin:0 10px;
    /* width:100%; */
}
#device-lists .page-title span{
    position: absolute;
    background: white;
    top:-10px;
    left:40px;
}
#device-lists .list-item{
    width:95%;
    border: 1px solid lightgray;
    margin:5px 4px;
    transition: 0.5s
}
#device-lists .list-item:hover{
    box-shadow: 0 0 3px 1px rgba(200, 200, 200, 0.815);
}
#device-lists .endline{
    width:95%;
    color: gray;
    margin:0 auto;
    border-top:1px solid gray;
    margin-top:20px;
    padding-top:5px;
}
#device-lists .item-layout{
    display: table;
    width:100%;
}
#device-lists .item-layout .photo-area{
    display: table-cell;
    width:180px;
    vertical-align: middle;
    text-align: center;
}
#device-lists .item-layout .photo-area img{
    width:95%;
    height: 95%;
}
#device-lists .item-layout .text-area{
    display: table-cell;
    width:40%;
    text-align: start;
    padding-left:10px;
}
#device-lists .item-layout .text-area .content{
    text-overflow: ellipsis;
}
#device-lists .item-layout .btn-area{
    display: table-cell;
    vertical-align: middle;
}
#device-lists .item-layout .btn-area button{
    background: rgb(206, 7, 7);
    color: white;
    border:none;
    outline: none;
    cursor: pointer;
    font-size: 15px;
    padding: 10px;
    border-radius:5px;
}
@media screen and (max-width:600px){
    #device-lists .list-item{
        float: left;
        width: 45%;
    }
    #device-lists .item-layout{
        display:block;
    }
    #device-lists .item-layout .photo-area{
        display:block;
        width:auto;
        height:120px;
    }
    #device-lists .item-layout .text-area{
        display:block;
        width:auto;
        margin-left:10px;
    }
    #device-lists .item-layout .text-area .content{ 
        width:max-content;
        margin:0 auto;
    }
    #device-lists .item-layout .text-area p{
        margin:5px 0;
        font-size:12px;
        width:max-content;
    }
    #device-lists .item-layout .btn-area{
        display:block;
        margin:10px 0;
    }
    #device-lists .list-body::after,#device-lists .list-body::before{
        content: "";
        display: table;
    }
    #device-lists .list-body::after{
        clear: both;
    }
    #device-lists .item-layout .btn-area button{
        padding:5px;
        font-size:12px;
    }
}
@media screen and (max-width:400px){
    #device-lists .list-item{
        /* min-width:100px; */
        width: 96%;
    }
    #device-lists .item-layout .text-area{
        margin:0 auto;
    }
    /* #device-lists .item-layout .text-area .content{
        width:70%;
        margin:0 auto
    } */
}
</style>
