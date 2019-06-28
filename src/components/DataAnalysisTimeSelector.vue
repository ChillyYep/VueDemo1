<template>
    <div id="data-analysis-time-selector">
        <div class="title">
            <div class="line"></div>
            <span>请选择时间</span>
        </div>
        <ul class="selector-header">
            <li v-for="year of years" :key="year" :class="{active:currentTab===year}" @click="currentTab=year"><span>{{year}}</span></li>
        </ul>
        <ul class="selector-body">
            <li v-for="(month,index) of months" :key="index" :class="{active:selectedTime.month===index&&selectedTime.year===currentTab}" v-show="index<=totalMonths" @click="selectedTime.year=currentTab;selectedTime.month=index;$emit('getTime',selectedTime)">{{month}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"DataAnalysisTimeSelector",
    data () {
        return {
            currentDate:new Date(),
            currentTab:new Date().getYear()+1900,
            currentItem:new Date().getMonth(),
            selectedTime:{year:new Date().getYear()+1900,month:new Date().getMonth()},
            months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
        }
    },
    computed: {
        currentYear(){
            return this.currentDate.getYear()+1900;
        },
        currentMonth(){
            return this.currentDate.getMonth();
        },
        years(){
            return [this.currentYear-2,this.currentYear-1,this.currentYear];
        },
        totalMonths(){
            return this.currentTab==this.currentYear?this.currentMonth:11
        }
    },
    watch:{
        currentTab(val){
            if(val===this.selectedTime.year){
                this.currentItem=this.selectedTime.month;
            }
            else{
                this.currentItem=-1;
            }
        }
    }
}
</script>
<style>
#data-analysis-time-selector{
    height:100%;
    width:100%;
}
#data-analysis-time-selector .title{
    text-align: start;
    color: gray;
    margin-left:20px;
    font-size:13px;
    margin-bottom: 10px; 
    position: relative;
}
#data-analysis-time-selector .title .line{
    /* padding-top:5px; */
    border-bottom: 1px solid rgb(116, 114, 114);
    width:30%;
}
#data-analysis-time-selector .title span{
    position: absolute;
    /* display: block; */
    background: white;
    top:-10px;
    left:20px;
}
#data-analysis-time-selector .selector-header{
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-left:10px;
    border-bottom:1px solid lightgray;
    height:30%;
}
#data-analysis-time-selector .selector-header::before,#data-analysis-time-selector .selector-header::after{
    content: "";
    display: table;
}
#data-analysis-time-selector .selector-header::after{
    clear: both;
}
#data-analysis-time-selector .selector-header li{
    float:left;
    padding: 0 20px;
    cursor: pointer;
    border-left:1px solid lightgray;
    color:black;
    /* border-bottom: 0; */
    height:30px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px
    /* transition: all .5s ease; */
    /* display: flex; */
}
#data-analysis-time-selector .selector-header li:hover{
    background: lightgray
}
#data-analysis-time-selector .selector-header li:first-child{
    margin-left:10px;
}
/* #data-analysis-time-selector ul li.active{
} */
#data-analysis-time-selector .selector-header li.active > span{
    border-bottom: 5px solid black;
    line-height:25px;
    transition: all .2s ease;
}
#data-analysis-time-selector .selector-header li.active{
    background: lightgray
}
#data-analysis-time-selector .selector-header li span{
    display: block;
    line-height:30px;
    padding:0px;
    margin-bottom: 0;
}
.selector-body{
    list-style-type: none;
    padding: 0;
    margin: 5px 0 0 10px;
    /* margin-left:10px; */
    /* border-bottom:1px solid lightgray; */
    /* background: lightgray; */
    height:70%;
    overflow-y:scroll;
    overflow-x: hidden
}
.selector-body li{
    float:left;
    padding:5px 20px;
    cursor: pointer;
}
.selector-body li:hover,.selector-body li.active{
    background: lightgray
}
@media screen and (max-width:800px){
    #data-analysis-time-selector .title .line{
        /* padding-top:5px; */
        /* border-bottom: 1px solid rgb(116, 114, 114); */
        width:80%;
    }    
}
</style>

