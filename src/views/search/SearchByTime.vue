<template>
    <div id="search-by-time">
        <div class="nav-row">
            <div class="time-selector-layout">
                <div class="time-selector">
                    <div class="year">
                        <div class="show-box">
                            <div v-for="(year,index) of years" :key="index" :class="[{'current-year':selectedYear===year},{'pre-year':selectedYear!=year&&atLeft==true},{'next-year':selectedYear!=year&&atRight==true}]" @click="selectedYear=year">
                                {{year}}
                            </div>
                        </div>
                        <div class="go-left" v-show="atLeft" @click="atLeft=false;atRight=true;selectedYear=years[0]">&lt;</div>
                        <div class="go-right" v-show="atRight" @click="atLeft=true;atRight=false;selectedYear=years[1]">&gt;</div>
                    </div>
                    <div class="month">
                        <MonthSelector :selectedMonth="currentDay.month" @getSelectedMonth="selectedMonth=$event"></MonthSelector>
                        <!-- <div v-for="(month,index) of months" :key="index" @click="selectedMonth=index">{{month}}</div> -->
                    </div>
                    <div class="day">
                        <table>
                            <tr v-for="(weeks,index1) of getTotalDays" :key="index1">
                                <td v-for="(day,index2) of weeks" :key="index2" @click="selectedDay=day" :class="{active:selectedDay==day}">{{day}}</td>
                            </tr>
                        </table>
                        <!-- <div v-for="(day,index) of getTotalDays(selectedYear,selectedMonth)" :key="index" @click="selectedDay=index">{{day}}</div> -->
                    </div>
                    <div class="time">
                        <table>
                            <tr v-for="(doubleTime,index1) of times" :key="index1">
                                <td v-for="time of doubleTime" :key="time.value" :class="{active:selectedTime==time.value}" @click="selectedTime=time.value">
                                    {{time.time}}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="ways">
                        <table>
                            <tr>
                                <td v-for="(way,index) of ways" :key="index" :class="{active:selectedWay==index}" @click="selectedWay=index">{{way}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="search-btn">
                        <button @click="updateTimeStr()">查找</button>
                    </div>
                </div>
                <div class="device-list">
                    <DeviceList :timeAndWay="timeAndWay" category="time"></DeviceList>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import MonthSelector from '@/components/MonthSelector.vue'
import DeviceList from '@/views/search/DeviceLists.vue'
export default {
    name:"SearchByTime",
    data () {
        return {
            currentDate:new Date(),
            selectedYear:0,
            selectedMonth:0,
            selectedDay:0,
            selectedTime:0,
            maxDays:100,
            currentDay:{year:0,month:0,day:0},
            years:[],
            atLeft:false,
            atRight:false,
            // months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
            times:[
                [{time:"0:00-2:00",value:0},{time:"2:00-4:00",value:1}],
                [{time:"4:00-6:00",value:2},{time:"6:00-8:00",value:3}],
                [{time:"8:00-10:00",value:4},{time:"10:00-12:00",value:5}],
                [{time:"12:00-14:00",value:6},{time:"14:00-16:00",value:7}],
                [{time:"16:00-18:00",value:8},{time:"18:00-20:00",value:9}],
                [{time:"20:00-22:00",value:10},{time:"22:00-24:00",value:11}]
            ],
            ways:["未预约","已预约"],
            timeAndWay:{timeStr:"",selectedWay:0},
            selectedWay:0,
            // timeStr:""
        }
    },
    components:{
        MonthSelector,
        DeviceList
    },
    mounted(){
        this.currentDate=new Date();
    },
    watch:{
        currentDate(date){
            this.selectedYear=date.getFullYear();
            this.selectedMonth=date.getMonth();
            this.selectedDay=date.getDate();
            console.log('currentDay:'+this.selectedYear+" "+this.selectedMonth+" "+this.selectedDay);
            let day={year:this.selectedYear,month:this.selectedMonth,day:this.selectedDay};
            this.currentDay=day;
            this.years=[this.selectedYear];
            if(this.selectedYear!=this.daysLaterYear){
                this.years.push(this.daysLaterYear);
                this.atRight=true;
                this.atLeft=false;
            }
            this.updateTimeStr();
        }
    },
    computed:{
        daysLaterYear(){
            let date=this.currentDate;
            date.setDate(date.getDate()+this.maxDays);
            return date.getFullYear();
        },
        getTotalDays(){//获取某年某月的总天数
            let dayAmount=new Date(this.selectedYear,this.selectedMonth+1,0).getDate();
            let days=[];
            let weeks=[];
            let i=1;
            for(i;i<=dayAmount;i++){
                days.push(i);
                if(i%7==0){
                    weeks.push(days);
                    days=[];
                }
            }
            if(i%7!=0){
                weeks.push(days);
            }
            return weeks;
        },
    },
    methods: {
        updateTimeStr(){
            let time="";
            switch(this.selectedTime){
                case 0:time="0:00:00";break;
                case 1:time="2:00:00";break;
                case 2:time="4:00:00";break;
                case 3:time="6:00:00";break;
                case 4:time="8:00:00";break;
                case 5:time="10:00:00";break;
                case 6:time="12:00:00";break;
                case 7:time="14:00:00";break;
                case 8:time="16:00:00";break;
                case 9:time="18:00:00";break;
                case 10:time="20:00:00";break;
                case 11:time="22:00:00";break;
                default:break;
            }
            let timeStr=this.selectedYear.toString()+"/"+(this.selectedMonth+1).toString()+"/"+this.selectedDay.toString()+" "+time;
            let timeAndWay={timeStr:timeStr,selectedWay:this.selectedWay};
            this.timeAndWay=timeAndWay;
            console.log('getTimeStr:', this.timeAndWay.timeStr);
        }
    }
}
</script>
<style>
#search-by-time .time-selector-layout{
    display: table;
    width:100%;
}
#search-by-time .time-selector{
    width:20%;
    display: table-cell;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
}
#search-by-time .device-list{
    display: table-cell;
    vertical-align: top;
}
#search-by-time .year{
    height:30px;
    line-height:30px;
    position: relative;
}
#search-by-time .year .go-left,#search-by-time .year .go-right{
    position: absolute;
    width:25px;
    height:25px;
    line-height: 25px;
    top:1px;
    border-radius: 50%;
    border:1px solid transparent;
    cursor: pointer;
}
#search-by-time .year .go-left:hover,#search-by-time .year .go-right:hover{
    border:1px solid lightgray;
}
#search-by-time .year .go-left{
    left:0;
}
#search-by-time .year .go-right{
    right:0;
}
#search-by-time .day,#search-by-time .time,#search-by-time .ways{
    border-bottom: 1px solid lightgray;
    padding-bottom: 5px;
}
#search-by-time .time-selector table{
    width:100%;
    margin-top:5px;
}
#search-by-time .time-selector .day td{
    width:14.2%;
    height:20px;
    line-height:20px;
}
#search-by-time .time-selector td:hover{
    background: lightgray;
    cursor: pointer;
}
#search-by-time .time-selector td.active{
    background: #c0392b;
    color:white;
}
#search-by-time .show-box{
    height:100%;
    width:30%;
    overflow: hidden;
    margin:0 auto;
    position: relative;
}
#search-by-time .current-year,#search-by-time .next-year,#search-by-time .pre-year{
    display: inline-block;
    width:100%;
    height:80%;
    position: absolute;
    transition: all .5s ease;
    /* margin-top:5px; */
}
#search-by-time .current-year{
    top:0;
    left:0;
}
#search-by-time .next-year{
    top:0;
    left:100%;
}
#search-by-time .pre-year{
    top:0;
    left:-100%;
}
#search-by-time .time-selector .time td{
    height:30px;
    line-height: 30px;
}
#search-by-time .search-btn button{
    margin-top:10px;
    padding:10px 20px;
    outline: none;
    border: none;
    background: rgb(206, 7, 7);
    color:white;
    cursor: pointer;
    border-radius:5px;
}
#search-by-time .search-btn button:hover{
    background: #ff4757;
}
@media screen and (max-width:1150px){
    #search-by-time .nav-row{
        width:100%;
    }
}
@media screen and (max-width:925px){
    #search-by-time .time-selector{
        width:200px;
    }
}
@media screen and (max-width:550px){
    #search-by-time .time-selector{
        display: block;
        width:100%;
    }
    #search-by-time .device-list{
        display: block;
    }
    #search-by-time .time-selector .day td{
        height:40px;
        line-height:40px;
    }
}
</style>
