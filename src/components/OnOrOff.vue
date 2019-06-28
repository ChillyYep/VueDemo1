<template>
    <div id="on-or-off">
        <div class="for-checkbox">
            <div class="check-block">
                <input type="checkbox" :id="id" v-model="isChosen" @change="selectOption=isChosen?0:1;$emit('getCheckState',isChosen)">
                <label :for="id"></label>
            </div>
        </div>
        <div class="for-select">
            <select id="choose" v-model="selectOption" :disabled="isChosen">
                <option v-for="option of options" :key="option.value" :value="option.value" :disabled="option.value==0">{{option.name}}</option>
            </select>
        </div>
    </div> 
</template>
<script>
export default {
    name:"OnOrOff",
    props:{
        value:Object,
        id:String
    },
    data () {
        return {
            isChosen:this.value.value==0,
            options:[
                {value:0,name:""},
                {value:1,name:"停用"},
                {value:2,name:"报废"}
            ],
            selectOption:this.value.value
        }
    },
    watch:{
        value:function(val){
            this.isChosen=(val.value==0);
            this.selectOption=val.value;
        },
        selectOption(){
            this.$emit('getValue',this.selectOption)
        }
    },
    // computed:{
    //     selectOptionCache(){
    //         return this.value.value;
    //     },
    //     isChosenCache(){
    //         return this.value.value==0;
    //     }
    // },
    methods: {
        
    }
}
</script>
<style>
#on-or-off{
    width:50%;
    min-width:120px;
    height:40px;
}
#on-or-off::before,#on-or-off::after{
    content: "";
    display: table
}
#on-or-off::after{
    clear: both;
}
#on-or-off .for-checkbox{
    float: left;
    /* position: relative; */
    display: flex;
    height: 100%;    
    width:50%;
    align-items: center;
    justify-content: center
}
#on-or-off .for-select{
    float: left;
    width: 50%;
    height: 100%;
}
#on-or-off .for-select select{
    width:100%;
    height:60%;
    margin:9px 0;
    font-size: 15px;
}
#on-or-off .for-checkbox .check-block{
    width:60px;
    height: 10px;
    background-color: #555;
    border-radius:5px;
    position: relative;
}
#on-or-off .check-block input[type=checkbox]{
    position: absolute;    
    visibility: hidden
}
#on-or-off .check-block label{
    display: block;
    position: absolute;
    top:-3px;
    left:-3px;
    width:16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    border:1px solid lightgray;
    cursor: pointer;
    transition: all .5s ease;
}
#on-or-off .check-block input[type=checkbox]:checked+label{
    left:47px;
}
@media screen and (max-width:800px){
    #info-view .for-checkbox .check-block{
        width:50px;
    }
    #on-or-off .check-block input[type=checkbox]:checked+label{
        left:37px;
    }
    #on-or-off .for-checkbox{
        justify-content: start
    }
}
</style>
