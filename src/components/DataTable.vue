<template>
    <div id="data-table" v-show="showTable">
        <div class="table-box">
            <div class="title">
                <button @click="refresh()">刷新</button>
                <button @click="$emit('close')" class="close">关闭</button>
                <button>
                    <download-excel :data="list" :fields="headers" name="各设备利用率总表.xls">导出报表</download-excel>
                </button>
                <span style="font-size:14px;font-weight:bold">各设备利用率总表</span>
            </div>
            <div class="body">
                <table border="1" cellspacing="0">
                    <tr>
                        <th>设备名</th>
                        <th>设备编号</th>
                        <th>设备利用率</th>
                    </tr>
                    <tr v-for="item of list" :key="item.eId">
                        <!-- 设备编号，设备名，月设备利用率 -->
                        <td>{{item.eName}}</td>
                        <td>{{item.eId}}</td>
                        <td>{{item.eUtilization}}</td>
                    </tr>
                </table>
                <Loading v-show="showLoading"></Loading>
            </div>
        </div>
    </div>
</template>
<script>
import Loading from '@/components/Loading1.vue'
export default {
    name:"DataTable",
    props: {
        showTable:Boolean
    },
    data () {
        return {
            list:[
                {eId:"1",eName:"原料药设备机械",eUtilization:"20%"},{eId:"2",eName:"制剂机械",eUtilization:"36%"},{eId:"3",eName:"药用粉碎机械",eUtilization:"78%"},
                {eId:"4",eName:"制药用水设备",eUtilization:"48%"},{eId:"5",eName:"药品包装机械",eUtilization:"69%"},{eId:"6",eName:"药物检测设备",eUtilization:"50%"},
                {eId:"7",eName:"药用粉碎机械",eUtilization:"43%"},{eId:"8",eName:"干燥机械8",eUtilization:"45%"},{eId:"9",eName:"干燥机械",eUtilization:"50%"},
                {eId:"10",eName:"原料药设备及机械10",eUtilization:"72%"}
            ],
            headers:{
                '设备编号':'eId',
                '设备名':'eName',
                '设备利用率':'eUtilization'
            },
            showLoading:true
        }
    },
    mounted(){
        let tempList=this.list;
        this.list=[];
        setTimeout(()=>{
            this.showLoading=false;
            this.list=tempList;
        },3000);  
    },
    components:{
        Loading
    },
    methods:{
        refresh(){
            this.showLoading=true;
            let tempList=this.list;
            this.list=[];
            setTimeout(()=>{
                this.showLoading=false;
                this.list=tempList;
            },3000); 
        }
    }
}
</script>
<style>
#data-table{
    position:fixed;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    background:transparent;
    z-index: 30;
    display: flex;
    justify-content: center;
    align-items: center
}
#data-table .table-box{
    width:50%;
    height:50%;
    background: white;
    border:1px solid lightgray;
    box-shadow: 0 0 5px 1px lightgray;
    animation: showTable .5s ease
}
#data-table .table-box .title::after,#data-table .table-box .title::before{
    content: "";
    display: table
}
#data-table .table-box .title::after{
    clear: both;
}
#data-table .table-box .title{
    height:35px;
    line-height: 35px;
    text-align: center
}

#data-table .table-box .title button{
    background-color: transparent;
    outline:none;
    border:1px solid lightgray;
    border-radius:2px;
    color:gray;
    float:right;
    margin:5px;
    cursor: pointer;
}
#data-table .table-box .title button:hover{
    background-color: gray;
    color:white
}
#data-table .table-box .title button:first-child{
    float:left;
}
#data-table .table-box .title button.close{
    background: rgb(206, 7, 7);
    border:1px solid transparent;
    color:white
}
#data-table .table-box .body{
    height:88%;
    overflow-y: auto;
    position: relative;
}
#data-table .table-box .body table{
    width:99%;
    border-color: white;
    margin:0 auto;
}
#data-table .table-box .body td{
    width:33.3%
}
@keyframes showTable {
    0%{transform: rotateX(90deg)}
    100%{transform: rotateX(0deg)}
}
@media screen and (max-width: 600px){
    #data-table .table-box{
        width:90vw;
        height:50%;
        background: white;
        border:1px solid lightgray;
        box-shadow: 0 0 5px 1px lightgray;
        animation: showTable .5s ease
    }
}
</style>

