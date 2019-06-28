<template>
    <div id="echarts-area"></div>
</template>
<script>
import echarts from 'echarts'
export default {
    name:"EchartsArea",
    props:{
        percentData:Object
    },
    watch: {
        percentData(){
            this.updatePie(this.echartsArea);
            console.log('EchartsArea:'+this.percentData.data+" "+this.percentData.total);
        }
    },
    data(){
        return {
            echartsArea:{},
            // temp:{name:"所有设备",data:20,total:100},//数据百分比
        }
    },
    mounted(){
        this.echartsArea=echarts.init(document.getElementById('echarts-area'));
        // this.updatePie(this.echartsArea);
    },
    methods: {
        updatePie(element){
            element.setOption({
            title:{
                text:this.percentData.name+"使用率",
                textStyle:{
                    fontSize:18,
                },
                textAlign:"auto"
            },
            series: {
                type: 'pie',
                data: [
                    {name: this.percentData.name, value: this.percentData.data},
                    {
                        name: '', 
                        value: this.percentData.total-this.percentData.data,
                        label:{
                            show:false,
                            position:"inner",
                        }
                    }
                ],
                clockwise:false,
                minAngle:5,
                startAngle:60,
                label:{
                    show:true,
                    position:"inner",
                    formatter:"{b} :   {d}%",
                    align:"center"
                },
                radius:[0,"60%"]
            }
        });
        }
    }
}
</script>
<style>
#echarts-area{
    width:80%;
    height:80%;
    margin:auto
}
/* @media screen and (max-width: 600px){
    #echarts-area{
        width:50%;
        height:50%;
    }
} */
</style>
