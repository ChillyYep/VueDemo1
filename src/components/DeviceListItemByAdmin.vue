<template>
    <div id="device-list-item-by-admin">
        <table>
            <tr>
                <td>设备名：</td>
                <td>{{info.eName}}</td>
                <!-- <td>{{RequestInfo.eName}}</td> -->
            </tr>
            <tr>
                <td>设备编号：</td>
                <td>{{info.eId}}</td>
                <!-- <td>{{RequestInfo.eId}}</td> -->
            </tr>
            <tr>
                <td>报告人：</td>
                <td>{{info.uName}}</td>
                <!-- <td>{{RequestInfo.eName}}</td> -->
            </tr>
            <tr>
                <td>报告人编号：</td>
                <td>{{info.uId}}</td>
                <!-- <td>{{RequestInfo.eName}}</td> -->
            </tr>
            <tr>
                <td class="text-area-header">故障描述：</td>
                <td><textarea readonly="readonly" rows="5" v-model="info.description"></textarea></td>
                <!-- <td>{{RequestInfo.eName}}</td> -->
            </tr>
            <tr>
                <td colspan="2" class="center"><button>停用设备</button></td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name:"DeviceListItemByAdmin",
    props:{
        RequestInfo:Object
    },
    data () {
        return {
            info:this.RequestInfo
        }
    }
}
</script>
<style>
#device-list-item-by-admin{
    width:90%;
    height: 100%;
    margin-left:20px;
    border:1px solid lightgray;
    background: white;
    transition: all 0.5s ease;
}
#device-list-item-by-admin:hover{
    box-shadow: 0px 0px 3px 2px lightgray 
}
#device-list-item-by-admin table{
    width:100%;
    height:80%;
    margin:10px 0;
}
#device-list-item-by-admin td{
    padding:5px;
}
#device-list-item-by-admin td:first-child{
    width:30%;
    text-align: end
}
#device-list-item-by-admin td:nth-child(2){
    width:70%;
    text-align: start;
    padding-left:5px;
}
#device-list-item-by-admin td button{
    border: none;
    background:transparent;
    color:#e84393;
    cursor: pointer;
}
#device-list-item-by-admin td button:hover{
    color:rgb(206, 7, 7)
}
#device-list-item-by-admin td.center{
    text-align: center
}
#device-list-item-by-admin td.text-area-header{
    vertical-align: top;
}
#device-list-item-by-admin td textarea{
    width:80%;
}
</style>
