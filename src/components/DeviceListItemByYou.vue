<template>
    <div id="device-list-item-by-you">
        <table>
            <tr>
                <td>设备名：</td>
                <td>{{info.eName}}</td>
                <td><button @click="alertName=alertNames[0]">报修</button></td>
            </tr>
            <tr>
                <td>设备编号：</td>
                <td>{{info.eId}}</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>预约时间：</td>
                <td>{{info.time}}</td>
                <td><button @click="alertName=alertNames[1]">修改</button></td>
            </tr>
            <tr>
                <td>预约人：</td>
                <td>{{info.uName}}</td>
                <td><button @click="alertName=alertNames[2]">转让</button></td>
            </tr>
            <!-- <tr>
                <td>预约人编号：</td>
                <td>{{info.uId}}</td>
                <td>&nbsp;</td>
            </tr> -->
        </table>
        <MyAlert @closeAction="alertName=''" v-if="alertName!=''" klass="window-size">
            <template v-slot:alert-title>
                {{alertName}}
            </template>
            <template v-slot:alert-body>
                <div v-if="alertName==alertNames[0]" class="text-area">
                    <p>设备报修描述：</p>
                    <textarea></textarea>
                </div>
                <div v-else-if="alertName==alertNames[1]" class="text-area">
                    
                </div>
                <div v-else-if="alertName==alertNames[2]" class="input-area">
                    <span>转让人编号：</span>
                    <input type="text">
                </div>                
                <div class="btn-area">
                    <button>提交</button>
                    <button @click="alertName=''">取消</button>
                </div>
            </template>
        </MyAlert>
    </div>
</template>
<script>
import MyAlert from '@/components/MyAlert.vue'
export default {
    name:"DeviceListItemByYou",
    props:{
        OrderInfo:Object
    },
    data () {
        return {
            info:this.OrderInfo,
            alertNames:["报修","修改","转让"],
            alertName:""
        }
    },
    watch:{
        OrderInfo(val){
            this.info=val;
        }
    },
    components:{
        MyAlert
    },
    methods: {
    }
}
</script>
<style>
#device-list-item-by-you{
    width:98%;
    height: 100%;
    margin:0 auto;
    border:1px solid lightgray;
    background: white;
    transition: all 0.5s ease;
}
#device-list-item-by-you:hover{
    box-shadow: 0px 0px 3px 2px lightgray 
}
#device-list-item-by-you table{
    width:100%;
    height:80%;
    margin:10px 0;
}
#device-list-item-by-you td{
    padding:5px;
}
#device-list-item-by-you td:first-child{
    width:30%;
    min-width:80px;
    text-align: end
}
#device-list-item-by-you td:nth-child(2){
    width:50%;
    text-align: start
}
#device-list-item-by-you td:nth-child(3){
    width:20%;
    padding:auto 0;
    min-width:50px;
}
#device-list-item-by-you td button{
    width:100%;
    border: none;
    outline: none;
    background:transparent;
    color:#e84393;
    cursor: pointer;
}
#device-list-item-by-you td button:hover{
    color:rgb(206, 7, 7)
}
/* #device-list-item-by-you .window-size{
    width:19%;
} */
#device-list-item-by-you .window-size .title{
    text-align: center;
    height:30px;
    line-height:30px;
    margin:0 auto;
    border-bottom: 1px solid lightgray
}
#device-list-item-by-you .window-size .text-area{
    width:90%;
    margin:0 auto;
}
#device-list-item-by-you .window-size .input-area{
    width:300px;
    padding:10px 0;
}
#device-list-item-by-you .window-size .input-area span{
    font-size: 14px;
    color: gray;
    padding:10px
}
/* #device-list-item-by-you .window-size .text-area input[type=text]{
    
    margin:0 auto;
} */
#device-list-item-by-you .window-size p{
    padding: 5px 0;
    font-size:14px;
    color:gray;
    margin:0;
}
#device-list-item-by-you .window-size textarea{
    margin:0;
    width:100%;
    height:100px;
    outline:none;
}
#device-list-item-by-you .window-size .body{
    padding: 10px;
    text-align: start;
}
#device-list-item-by-you .window-size .btn-area{
    text-align:center;
    margin:5px 0;
}
#device-list-item-by-you .window-size .btn-area button{
    padding: 10px 20px;
    outline: none;
    border:none;
    background:rgb(206, 7, 7);
    color:white;
    margin:0 20px;
    cursor: pointer;
}
@media screen and (max-width: 450px){
    #device-list-item-by-you td:nth-child(2){
        width:40%;
        text-align: start
    }
}
</style>
