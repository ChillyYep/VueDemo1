<template>
    <div id="data-analysis">
        <div class="echarts-main">
           <EchartsArea :percentData="percentData"></EchartsArea>
        </div>
        <div class="selectWays">
            <button :class="[{active:selectWay==0},'all-device']" @click="selectWay=0;getTotalData()">所有设备</button>
            <button :class="{active:selectWay==1}" @click="selectWay=1">项目维度</button>
            <button :class="{active:selectWay==2}" @click="selectWay=2">人员维度</button>
            <button :class="[{active:selectWay==4},'all-device']" @click="selectWay=4;showTable=true">生成报表</button>
        </div>
        <div class="select-time">
            <DataAnalysisTimeSelector @getTime="getTime($event)"></DataAnalysisTimeSelector>
        </div>
        <div :class="['list-area',{'list-area2':showListArea==true}]">
            <List @showContent="clickListItem($event)" :list="deviceList" :selectItemId="currentItem.itemId" :neadAdd="false" titleName="设备列表"></List>
            <div class="show-list-area" @click="showListArea=!showListArea">
                <span>设备列表</span>
                <span v-if="showListArea">&gt;</span>
                <span v-else>&lt;</span>
            </div>
        </div>
        <DataTable :showTable="showTable" @close="showTable=false"></DataTable>
    </div>
</template>
<script>
import List from '@/components/List.vue'
import EchartsArea from '@/components/EchartsArea.vue'
import DataAnalysisTimeSelector from '@/components/DataAnalysisTimeSelector.vue'
import DataTable from '@/components/DataTable.vue'
export default {
    name:"DataAnalysis",
    data(){
        return {
            deviceList:[],//设备列表
            tempList:[],//临时列表
            ways:["所有设备","项目维度","人员维度"],//数据分析方法
            selectWay:0,//选择的方法
            percentData:{name:"所有设备",data:0,total:100},//数据百分比
            currentItem:{},//当前选择的列表选项
            selectedTime:{year:0,month:0},
            showTable:false,
            showListArea:false,
        }
    },
    components: {
        List,
        EchartsArea,
        DataAnalysisTimeSelector,
        DataTable
    },
    mounted(){
        this.loadItems();
        this.getTotalData();
    },
    watch: {
        selectWay(){
            if(this.selectWay==1||this.selectWay==2){
                this.getData(this.currentItem);
            }
        },
        selectedTime(){
            if(this.selectWay==1||this.selectWay==2){
                this.getData(this.currentItem);
            }
            else if(this.selectWay==0){
                this.getTotalData();
            }
        }
    },
    methods: {
        clickListItem(item){
            this.currentItem=item;
            if(0==this.selectWay){
                this.selectWay=1;
            }
            else{
                this.getData(item);
            }
            this.showListArea=false;
        },
        getData(item){
            this.axios({
                method:"get",
                url:"/management/dataAnalysis",
                params:{
                    eId:item.itemId,
                    way:this.selectWay,
                    year:this.selectedTime.year,
                    month:this.selectedTime.month
                },
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                }
            }).then(res => {
                let list=res.data.list;
                let tempData={};
                if(this.selectWay==0){
                    tempData={name:this.ways[this.selectWay],data:list[0],total:list[1]};
                }
                else{
                    tempData={name:this.currentItem.itemName,data:list[0],total:list[1]};
                }
                this.percentData=tempData;
                console.log("getData:"+list[0]+" "+list[1]);
            }).catch((err) => {
                alert(err);
            });
        },
        getTotalData(){
            let item={itemId:""};
            this.getData(item);
        },
        loadItems(){
            this.axios({
                method:"get",
                url:"/search/deviceList",
                params:{
                    way:"all",
                    data:"",
                    uIdentity:this.$root.getIdentity(),
                    code:-1
                },
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                }
            }).then(res=>{
                this.tempList=res.data.list;
                this.reWriteDeviceList();
                this.currentItem=this.deviceList[0];
            }).catch(error=>{
                alert(error)
                this.deviceList=[]
            })
        },
        reWriteDeviceList(){
            for(let item of this.tempList){
                this.deviceList.push({itemId:item.eId,itemName:item.eName});
            }
        },
        getTime(time){
            let selectedTime={year:time.year,month:time.month};
            this.selectedTime=selectedTime;
            console.log('getTime:'+time.year+" "+time.month);
        }
    }

}
</script>

<style>
#data-analysis{
    width:100%;
    height: 100%;
    position: relative;
    z-index: 0
}
#data-analysis .echarts-main{
    position: absolute;
    top: 10%;
    bottom: 20%;
    left: 5%;
    right:20%;
    display: flex;
    transition: all 0.5s ease;
}
#data-analysis .select-time{
    position: absolute;
    top: 80%;
    bottom: 3%;
    left: 0;
    right:20%;
    transition: all 0.5s ease;
}
#data-analysis .list-area{
    position: absolute;
    top: 0;
    bottom: 0;
    width:20%;
    right:0;
    border:1px solid lightgray;
    transition: all 0.5s ease;
}
#data-analysis .selectWays{
    position: absolute;
    top: 0;
    bottom: 90%;
    left: 0;
    right:20%;
    text-align: start;
    margin-top:10px;
    transition: all 0.5s ease;
}
#data-analysis .selectWays::before,.selectWays::after{
    content: "";
    display: table
}
#data-analysis .selectWays::after{
    clear: both;
}
#data-analysis .selectWays button{
    font-size: 10px;
    float: left;
    outline: none;
    background: transparent;
    margin-left:10px;
    border:1px solid lightgray;
    color:gray;
    padding-top:5px;
    padding-bottom:5px;
    border-radius: 3px;
    cursor: pointer;
    margin-top:10px;
}
#data-analysis .selectWays button.active{
    background: gray;
    color:white;
}
#data-analysis .selectWays button.all-device{
    float: right;
    margin-right: 10px;
}
#data-analysis .list-area .show-list-area{
    display: none;
}
@media screen and (max-width: 600px){
    #data-analysis .list-area{
        position: fixed;
        width:200px;
        top: 0;
        bottom: 0;
        left:100%;
        background: #1e272e;
        color:white;
    }
    #data-analysis .info-view{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    #data-analysis .list-area2{
        transform: translateX(-100%);
    }
    #data-analysis .list-area .show-list-area{
        position: absolute;
        bottom: 50%;
        transform: translateY(50%);
        width: 20px;
        padding:10px 1px 10px 3px;
        height:100px;
        left:-25px;
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
        line-height: 20px;
        border:1px solid lightgray;
        border-right:none;
        color:white;
        background-color: #1e272e;
        z-index: 20;
        display: block
    }
    #data-analysis .echarts-main{
        right: 0;
    }
    #data-analysis .select-time{
        right: 0;
    }
    #data-analysis .selectWays{
        right:0
    }
}
</style>
