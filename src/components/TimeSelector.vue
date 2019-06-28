<template>
    <div class="nav-row">
        <div id="time-selector">
            <div class="title">
                <div class="line"></div>
                <span>请选择时间段</span>
            </div>
            <div class="layout">
                <div class="selector-left">
                    <Calendar class="calendar" @choseDay="clickDay" :agoDayHide="agoDayHidden" :futureDayHide="futureDayHidden"></Calendar>
                    <div class="selector-container">
                        <table>
                            <tr>
                                <td class="header">
                                    <span>{{currentDate}}</span>
                                </td>
                                <td class="body">
                                    <table>
                                        <tr>
                                            <td v-for="time in times.slice(0,6)" :class="[{selected:time.selected==1},{unselected:time.selected==0},box,{immutable:time.selected==2}]" :key="time.value" @click="selectTimeFunc(time)" @mouseenter="onMouseEnter(time)" @mouseleave="hoverItem=-1">
                                                <span>{{time.time}}</span>
                                                <transition name="fade">
                                                    <div v-show="time.selected==2 && hoverItem==time.value" class="hang-box">
                                                        <p><span>预约人:</span>{{orderPersonInfo[0]}}</p>
                                                        <p><span>联系方式:</span>{{orderPersonInfo[1]}}</p>
                                                        <p><span>项目名:</span>{{orderPersonInfo[2]}}</p>
                                                    </div>
                                                </transition>
                                            </td>                            
                                        </tr>
                                        <tr>
                                            <td v-for="time in times.slice(6)" :class="[{selected:time.selected==1},{unselected:time.selected==0},box,{immutable:time.selected==2}]" :key="time.value" @click="selectTimeFunc(time)" @mouseenter="onMouseEnter(time)" @mouseleave="hoverItem=-1">
                                                <span>{{time.time}}</span>
                                                <transition name="fade">
                                                    <div v-show="time.selected==2 && hoverItem==time.value" class="hang-box">
                                                        <p><span>预约人:</span>{{orderPersonInfo[0]}}</p>
                                                        <p><span>联系方式:</span>{{orderPersonInfo[1]}}</p>
                                                        <p><span>项目名:</span>{{orderPersonInfo[2]}}</p>
                                                    </div>
                                                </transition>
                                            </td>                            
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>   
                <div class="selector-right">
                    <div class="tag-container">
                        <div class="container-title">
                            已选时间段
                        </div>
                        <div class="container-body">
                            <ul>
                                <li v-for="(selectTime,index) of selectedTimes.keys()" :key="index">{{selectTime.date+" "+times[selectTime.value].time}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="btn-area">
                        <button @click="isHide=false" class="order-btn">确认预约</button>
                    </div>
                </div>
            </div>
        </div>
        <confirm-order @confirmOrder="confirmOrder" :isHide="isHide" @goback="goback" :selectedProject="selectedProject" :projects="projects" @change="selectedProject=$event"></confirm-order>
    </div>
</template>

<script>
import Calendar from './vue-calendar-component/index'
import ConfirmOrder from '@/components/confirmOrder.vue'
// import Calendar from 'vue-calendar-component'
export default {
    name:"TimeSelector",
    props:{
        deviceInfo:Object
    },
    data(){
        return{
            times:[
                
                    {value:0,time:"0:00-2:00",selected:0},
                    {value:1,time:"2:00-4:00",selected:0},
                    {value:2,time:"4:00-6:00",selected:0},
                    {value:3,time:"6:00-8:00",selected:0},
                    {value:4,time:"8:00-10:00",selected:0},
                    {value:5,time:"10:00-12:00",selected:0}
                ,
                    {value:6,time:"12:00-14:00",selected:0},
                    {value:7,time:"14:00-16:00",selected:0},
                    {value:8,time:"16:00-18:00",selected:0},
                    {value:9,time:"18:00-20:00",selected:0},
                    {value:10,time:"20:00-22:00",selected:0},
                    {value:11,time:"22:00-24:00",selected:0}
            ],
            selectedTimes:new Set(),//已经选择的时间段序列
            currentDate:"",//当前日历选择的日期
            box:"box",//box样式
            agoDayHidden:"",//隐藏某天前的日期
            futureDayHidden:"",//隐藏某天后的日期
            selectedProject:"",//默认选择的项目
            projects:[],//项目列表
            isHide:true,//控制弹出框显示与否
            hoverItem:-1,//鼠标悬浮时间段的value
            orderPersonInfo:[]
            // testProjects:[{pId:"00001",pName:"xx项目"},{pId:"00002",pName:"yy项目"}]
        }
    },
    components:{
        Calendar,
        ConfirmOrder
    },
    mounted () {
        const date=new Date();
        this.currentDate=date.getFullYear()+'/'
                        +(date.getMonth()+1)+'/'
                        +date.getDate();
        //当天起一个月内设备可借
        this.agoDayHidden=(Date.parse(this.currentDate)/1000).toString();
        this.futureDayHidden=(Date.parse(this.currentDate)/1000+30*86400).toString();
        this.getPIds();
    },
    watch:{
        currentDate(){
            console.log('currentDate:'+this.currentDate)
            for(let time of this.times){
                time.selected=0
            }
            this.getRemoteTimeTable();
            this.getLocalTimeTable()
        },
        // selectedProject(){
        //     console.log('selectedProject:'+this.selectedProject)
        // }
    },
    methods: {
        selectTimeFunc(time){
            //选择或取消选择时间段
            const specificTime=new this.SpecificTime(this.currentDate,time.value)
            if(0==time.selected){
                time.selected=1;
                this.selectedTimes.add(specificTime)
                console.log(this.selectedTimes)
            }
            else if(1==time.selected){
                time.selected=0;
                for(let element of this.selectedTimes.keys()){
                    if(element.isEqual(specificTime)){
                        this.selectedTimes.delete(element)
                        break
                    }
                }
                
            } 
        },
        clickDay(date){
            console.log("clickDay:"+date);
            this.currentDate=date;
        },
        getRemoteTimeTable(){
            //获取已选时间段
            this.axios({
                method:"post",
                url:"/search/timeTable",
                data:JSON.stringify({
                    eId:typeof(this.deviceInfo)=="undefined"?"":this.deviceInfo.eId,
                    date:this.currentDate
                }),
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                }
            }).then(res=>{
                //更新时间表
                for(let time of this.times){
                    time.selected=(res.data.list[time.value]==2)?2:time.selected;
                }
            }).catch(error=>{
                alert(error);
            })
        },
        getLocalTimeTable(){
            let time=""
            for(let key of this.selectedTimes.keys()){
                time=key.date;
                if(time==this.currentDate){
                    this.times[key.value].selected=1
                }
            }
        },
        confirmOrder(){
            let datesTemp=[]
            let timesTemp=[]
            datesTemp=this.getDateAndTime().dates;
            timesTemp=this.getDateAndTime().times;
            this.axios({
                method:"post",
                url:"/search/confirmOrder",
                data:JSON.stringify({
                    dates:datesTemp,
                    times:timesTemp,
                    eId:typeof(this.deviceInfo)=="undefined"?"":this.deviceInfo.eId,
                    uId:this.getId(),
                    pId:this.selectedProject
                })
                ,headers:{
                    "Content-Type":"application/json;charset=UTF-8"                    
                }
            }).then(res=>{
                this.isHide=true;
                if(res.data.code==0){
                    //后台预订成功，更新当前时间列表
                    for(let time of this.times){
                        if(time.selected==1){
                            time.selected=2
                        }
                        this.selectedTimes.clear()
                    }
                    alert("预约成功")
                }
                else{
                    alert("预约失败，您预订的时间段可能已被人抢先预约！")
                }
            }).catch(error=>{
                this.isHide=true;
                alert(error)
            })
        },
        getId(){
            const uId=sessionStorage.getItem("uId");
            if(uId===null) return "";
            else return uId;
        },
        getPIds(){
            const projects=JSON.parse(sessionStorage.getItem("projects"))
            if(projects!=null){
                this.projects=projects;
                this.selectedProject=projects[0].pId;
            }
        },
        goback(){
            this.isHide=true;
        },
        SpecificTime(date,value){
            this.date=date;
            this.value=value;
            this.isEqual=function(arg){
                return (this.date===arg.date) && (this.value===arg.value)
            }
            
        },
        getDateAndTime(){
            let datesTemp=[];
            let timesTemp=[];
            this.selectedTimes.forEach(element=>{
                datesTemp.push(element.date);
                timesTemp.push(element.value);
            });
            return {
                dates:datesTemp,
                times:timesTemp
            }
        },
        onMouseEnter(time){
            if(time.selected==2){
                this.loadOrderPersonInfo(time);
            }
        },
        loadOrderPersonInfo(time){
            this.hoverItem=time.value
            this.axios({
                method:"post",
                url:"/search/orderPersonInfo",
                data:JSON.stringify({
                    requestDate:this.currentDate,
                    value:time.value,
                    eId:typeof(this.deviceInfo)=="undefined"?"":this.deviceInfo.eId
                }),
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                }
            }).then(res=>{
                this.orderPersonInfo=res.data.list;
            }).catch(error=>{
            });
        }
    }
}
</script>

<style>
#time-selector{
    width:100%;
    margin-top:20px;
    /* border:1px solid lightgray; */
}
#time-selector .layout{
    width:100%;
    display:table
}
#time-selector .title{
    text-align: start;
    color: gray;
    margin:20px 10px;
    width:100%;
    font-size:13px;
    position: relative;
}
#time-selector .title .line{
    border-bottom: 1px solid rgb(116, 114, 114);
    width:100%;
}
#time-selector .title span{
    position: absolute;
    background: white;
    top:-10px;
    left:20px;
}
#time-selector .selector-left{
    width:60%;
    margin-left:0px;
    display: table-cell
}
#time-selector .selector-right{
    width:40%;
    /* height:0; */
    display: table-cell;
    border:1px solid lightgray;
    position: relative
}
#time-selector .selector-container{
    display:table;
    color:white;
    background: black;
    height:100%;
    width:100%;
    line-height: 30px;
}
#time-selector .box{
    display: table-cell;
    width:12.5%;
    line-height:30px;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    background: white;
    color:black;
    position: relative;
}
#time-selector .header{
    background: rgb(206, 7, 7);
    width:15%;
    height:100%;
    text-align: center;
    font-size: 16px;
    vertical-align: middle;
    display: table-cell;
}
#time-selector .body table{
    width:100%;
}
#time-selector .body table td{
    height:50%;
}
#time-selector .hang-box{
    position: absolute;
    left: 50%;
    bottom: 50%;
    height:fit-content;
    width:200px;
    background:white;
    z-index: 20;
}
#time-selector .hang-box p{
    display: block;
    text-align:left;
    line-height:20px;
    word-wrap: break-word;
    word-break: break-all;
    margin-left:5px;
    width:100%;
}
#time-selector .hang-box p span{
    width:65px;
    display: inline-block;
}
#time-selector .fade-enter{
    opacity: 0;
}
#time-selector .fade-enter-active{
    transition: opacity 0.5s;
}
#time-selector .unselected:hover{
    background: rgb(224, 51, 89);
    color:white;
}
#time-selector .selected{
    background: rgb(206, 7, 7);
    color:white;
}
#time-selector .immutable{
    background:black;
    color: #666565;
}
#time-selector .tag-container{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom: 20%;
}
#time-selector .container-title{
    height:50px;
    line-height: 50px;
}
#time-selector .container-body{
    overflow-y: scroll;
    height:80%;
    width:100%;
}
#time-selector .container-body ul{
    list-style-type: none;
    padding-left:10px; 
}
#time-selector .container-body li{
    height:40px;
    line-height: 40px;
}
#time-selector .container-body li:hover{
    background: rgba(0,100, 200, 0.5)
}
#time-selector .btn-area{
    position: absolute;
    top:80%;
    left:0;
    right:0;
    bottom: 0;
}
#time-selector .order-btn{
    background: rgb(206, 7, 7);
    color:white;
    width:100%;
    height: 100%;
    font-size: 15px;
    border:0;
    cursor: pointer;
}

@media screen and (max-width:550px){
    #time-selector .selector-left{
        width:100%;
        display: block;
    }
    #time-selector .selector-right{
        margin-top:20px;
        width:100%;
        display: block;
        height:400px;
    }
}
</style>


