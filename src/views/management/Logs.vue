<template>
    <div id="logs">
        <div class="title">
            <span>日志</span>
        </div>
        <div class="body">
            <div class="table">
                <!-- <table>
                    <tr>
                        <th>日志编号</th>
                        <th>操作人</th>
                        <th>操作时间</th>
                        <th>操作名</th>
                    </tr>
                </table> -->
                <div class="table-body">
                    <table>
                        <tr>
                            <th>日志编号</th>
                            <th>操作人</th>
                            <th>操作时间</th>
                            <th>操作名</th>
                        </tr>
                        <tr v-for="log of totalLogList" :key="log.lId" class="table-row" >
                            <td>{{log.lId}}</td>
                            <td>{{log.uId}}</td>
                            <td>{{log.lTime}}</td>
                            <td>{{log.lOperate}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Logs",
    data () {
        return {
            totalLogList:[],
            // testLogList:[
            //     {lId:201904071004,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071005,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071006,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071007,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071008,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071009,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071010,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071011,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071012,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071013,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071014,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071015,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071016,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071017,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071018,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071019,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071020,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071021,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071022,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071023,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"},
            //     {lId:201904071024,uId:201626811406,lTime:"2019/4/7 10:04",lOperate:"登录"}
            // ],
            lastLId:201904071024,
            maxLength:100,
        }
    },
    mounted(){
        this.loadItem(this.maxLength);
    },
    methods: {
        loadItem(dataAmount){
            this.axios({
                method:"get",
                url:"/management/logs",
                params:{
                    length:dataAmount,
                },
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                }
            }).then((result) => {
                if(0==result.data.code){
                    let list=result.data.list;
                    this.totalLogList=list;
                }
            }).catch((err) => {
                alert(err);
            });
        }
    }
}
</script>
<style>
#logs{
    width:90%;
    height:100%;
    margin:0 auto;
    border:1px solid lightgray
}
#logs .title{
    padding: 10px;
    border-bottom: 1px solid lightgray;
    text-align: start
}
#logs .title span{
    display: block;
    border-left:5px solid black;
    padding-left: 10px;
}
#logs .body{
    height:90%;
    width:95%;
    border-left:1px solid lightgray;
    border-right:1px solid lightgray;
    margin:0 auto;
}
#logs .table{
    width:100%;
    height:100%;
}
#logs .table table{
    width:100%;
    margin:0 auto;
}
#logs .table table th{
    border-left:1px solid lightgray;
    color:black;
    width:25%;
}
#logs .table table th:first-child{
    border-left:none
}
#logs .table .table-body{
    height:100%;
    width:100%;
    overflow-y: auto;
    overflow-x:auto;
}
#logs .table table td{
    width:25%;
    background: #2d3436
}
#logs .table table .table-row{
    color:white;
    margin-top:5px;
}
@media screen and (max-width: 450px){
    #logs .table table{
        width:450px;
        margin:0 auto;
    }
}
</style>
