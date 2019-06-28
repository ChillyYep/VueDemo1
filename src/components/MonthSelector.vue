<template>
    <div id="month-selector">
        <div class="go-left" @click="goLeft()"><span>&lt;</span></div>
        <!-- <div class="hide">{{months[index=(index+12)%12]}}</div>
        <div class="side">{{months[index]}}</div> -->
        <div class="watch-container">
            <div v-for="(month,index1) of months" :key="index1" :class="['translate-element',{main:month.state==3},{'left-side':month.state==-2},{'right-side':month.state==2},{none:month.state==0},{'left-hide':month.state==-1},{'right-hide':month.state==1}]">{{month.name}}</div>
        </div>
        <!-- <div class="side"></div>
        <div class="hide"></div> -->
        <div class="go-right" @click="goRight()"><span>&gt;</span></div>
    </div>
</template>
<script>
export default {
    name:"MonthSelector",
    props:{
        selectedMonth:Number
    },
    data () {
        return {
            // selectedMonth:0,
            months:[
                {name:"1月",state:0},
                {name:"2月",state:0},
                {name:"3月",state:0},
                {name:"4月",state:0},
                {name:"5月",state:0},
                {name:"6月",state:0},
                {name:"7月",state:0},
                {name:"8月",state:0},
                {name:"9月",state:0},
                {name:"10月",state:0},
                {name:"11月",state:0},
                {name:"12月",state:0}
            ],
            index:0,
            // currentMonth:0
        }
    },
    // mounted () {
    //     this.index=this.selectedMonth;
    // },
    watch: {
        selectedMonth(val){
            this.index=val;
        },
        index(val){
            for(let obj of this.months){
                obj.state=0;
            }
            // this.selectedMonth=val;
            this.months[val].state=3;//当前位置
            this.months[(val+11)%12].state=-2;//上一个位置
            this.months[(val+1)%12].state=2;//下一个位置
            this.months[(val+10)%12].state=-1;//上一个位置
            this.months[(val+2)%12].state=1;//下一个位置
            console.log('index:', val);
        },
    },
    methods:{
        goLeft(){
            this.index=(this.index+1)%12;
            this.getSelectedMonth();
        },
        goRight(){
            this.index=(this.index+11)%12;
            this.getSelectedMonth();
        },
        getSelectedMonth(){
            this.$emit('getSelectedMonth',this.index);
        }    
    }
}
</script>
<style>
#month-selector{
    width:100%;
    height:40px;
    border-top:1px solid lightgray;
    border-bottom:1px solid lightgray;
    /* padding-bottom:3px;  */
    position: relative;
}
#month-selector .go-left,#month-selector .go-right{
    position: absolute;
    width:30px;
    height:30px;
    line-height: 30px;
    top:5px;
    border-radius: 50%;
    border:1px solid transparent;
    cursor: pointer;
}
#month-selector .go-left:hover,#month-selector .go-right:hover{
    border:1px solid lightgray;
}
#month-selector .go-left{
    left:0;
}
#month-selector .go-right{
    right:0;
}
#month-selector .none{
    display: none
}
#month-selector .left-hide{
    left:-30%;
    bottom:0;
    /* height:70%; */
    line-height:30px;
    transform: scale(.5);
    display: block;
}
#month-selector .right-hide{
    left:100%;
    bottom:0;
    /* height:70%; */
    line-height:30px;
    transform: scale(.5);
    display: block;
}
#month-selector .watch-container{
    position: relative;
    width:70%;
    margin:0 auto;
    height: 100%;
    overflow: hidden;
    /* border:1px solid gray */
}
#month-selector .translate-element{
    width:32%;
    position: absolute;
    transition: all .5s ease-in-out;
}
#month-selector .main{
    height:100%;
    /* transform: translate(30%,0); */
    line-height: 40px;
    font-weight: 500;
    font-size: 18px;
    margin:0;
    bottom:0;
    left:35%;
    background:lightgray
}
#month-selector .left-side{
    height:90%;
    line-height:35px;
    transform: scale(.8);
    bottom:0;
    left:0;

}
#month-selector .right-side{
    height:90%;
    line-height:35px;
    transform: scale(.8);
    bottom:0;
    left:70%;
}
/* #month-selector .watch-container::before,.watch-container::after{
    content: "";
    display: table
}
#month-selector .watch-container::after{
    clear: both;
} */

</style>


