<template>
    <div id="info-view">
        <div class="title">
            <p>{{name}}</p>
        </div>
        <div class="body">
            <div class="main">
                <table>
                    <tr v-for="[key,value] of infoPairs" :key="key" class="form-row">
                        <td>
                            <span>{{key}}:</span>
                        </td>
                        <td>
                            <div class="input-area">
                                <template v-if="value.type==='checkbox'">
                                    <OnOrOff :value="value" :id="key" @getCheckState="getCheckState($event,value)" @getValue="getValue($event,value)"></OnOrOff>
                                </template>
                                <template v-else-if="value.type==='select'">
                                    <select id="stateSelector" class="stateSelector" v-model="value.value" >
                                        <option v-for="(option,index) of value.options" :key="index" :value="index">{{option}}</option>
                                    </select>
                                </template>
                                <template v-else-if="value.type==='number'">
                                    <input type="text" v-model.number="value.value" :id="key" :disabled="!value.isEditable">
                                </template>
                                <template v-else>
                                    <input :type="value.type" v-model="value.value" :id="key" :disabled="!value.isEditable">
                                </template>
                            </div>                       
                        </td>
                    </tr>
                </table>
                <!-- <div v-for="[key,value] of testPairs" :key="key" class="form-row">
                    
                    <div :class="'input-area'">
                        <template v-if="value.type==='checkbox'">
                            <OnOrOff :value="value" :id="key" @getCheckState="getCheckState($event,value)" @getValue="getValue($event,value)"></OnOrOff>
                        </template>
                        <template v-else-if="value.type==='select'">
                            <select id="stateSelector" class="stateSelector" v-model="value.value" >
                                <option v-for="(option,index) of value.options" :key="index" :value="index">{{option}}</option>
                            </select>
                        </template>
                        <template v-else-if="value.type==='number'">
                            <input type="text" v-model.number="value.value" :id="key" :disabled="!value.isEditable">
                        </template>
                        <template v-else>
                            <input :type="value.type" v-model="value.value" :id="key" :disabled="!value.isEditable">
                        </template>
                    </div>
                </div> -->
            </div>
            <div class="endline"></div>
            <div class="confirm-change">
                <button @click="$emit('submit',infoPairs)">{{confirmBtnName}}</button>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import OnOrOff from '@/components/OnOrOff.vue'
export default {
    name:"InfoView",
    props:{
        pairs:Map,
        name:String,
        confirmBtnName:String,
        selectState:Array
    },
    components: {
        OnOrOff
    },
    data(){
        return{
            infoPairs:{},
            // testPairs:new Map([["用户名",{value:"userInfo.uName",isEditable:true,type:"text"}],["用户编号",{value:"userInfo.uId",isEditable:false,type:"text"}],
            //     ["信用点数",{value:"2555",isEditable:false,type:"text"}],["手机号码",{value:"111111",isEditable:true,type:"number"}],
            //     ["所在科室",{value:"userInfo.uDepartment",isEditable:true,type:"text"}],["性别",{value:0,isEditable:true,type:"select",options:["男","女","中性"]}],
            //     ["职称",{value:"userInfo.uTitle",isEditable:true,type:"text"}],["身份权限",{value:0,isEditable:false,type:"select",options:["普通用户","管理员","系统管理员"]}],
            //     ["密码",{value:"userInfo.uPassword",isEditable:true,type:"text"}],["密码2",{value:"userInfo.uPassword2",isEditable:true,type:"text"}],
            //     ["是否启用",{value:0,isEditable:true,type:"checkbox"}]]),
                
            state:this.selectState,
            index:0
        }
    },
    watch: {
        pairs:function(val){
            this.infoPairs=null;
            this.infoPairs=val;
        },
        selectState:function(val){
            this.state=val;
        }
    },
    methods: {
        clickMe(value){
            console.log('value:'+value)
            console.log('value:'+typeof(value))
        },
        getCheckState(checkState,value){
            value.value=checkState?0:-1;
        },
        getValue(selectOption,value){
            value.value=selectOption;
        }
    }
}
</script>
<style>
#info-view{
    height:90%;    
}
#info-view .title{
    border-bottom: 1px solid lightgray;
    padding: 10px;
}
#info-view .title p{
    margin:0;
    margin-left: 10px;
    text-align: start;
    border-left:5px solid black;
    padding-left:5px 
}
#info-view .body{
    overflow-y: auto;
    overflow-x: auto;
    height:100%;
}
#info-view .main{
    margin:50px 0;
    text-align: center
}
#info-view .main table{
    width:100%;
}
#info-view .form-row{
    height: 40px;
    margin-top:10px;
}
#info-view .form-row td:first-child{
    text-align: end;
    width:40%;
    min-width:80px;
    padding: 10px;
    padding-right:20px;
    color:gray
}
#info-view .form-row td{
    height:100%;
    margin-top:10px;
}
#info-view .input-area{
    text-align: start;
}
#info-view .form-row input[type=text]{
    width: 50%;
    min-width:120px;
    height:30px;
    font-size:16px;
    border:1px solid lightgray;
    padding-left:5px; 
    outline: none;
}
#info-view .form-row input[type=text]:focus{
    outline:#ff4757 solid 2px;
}
#info-view .endline{
    margin:0 20px;
    border-top: 1px solid lightgray
}
#info-view .confirm-change{
    margin-top:20px;
}
#info-view .confirm-change button{
    padding: 10px;
    font-size: 16px;
    outline: none;
    border: none;
    background: rgb(206, 7, 7);
    color:white;
    cursor: pointer;
    margin:0 20px 10px 20px;
}
#info-view .stateSelector{
    width: 50%;
    min-width:120px;
    height:100%;
    font-size:15px;
    margin-top:5px
}
#info-view .stateSelector:focus{
    outline:#ff4757 solid 2px;
}
</style>

