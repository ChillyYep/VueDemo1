<template>
    <div id="confirm-order">
        <my-alert @closeAction="$emit('goback')" v-if="!isHide" klass="box-style">
            <template v-slot:alert-title>
                <p class="title">预约确认</p>
            </template>
            <template v-slot:alert-body>
                <div class="options">
                    <span>选择项目：</span>
                    <select id="ProjectsSelection" v-model="selectedProject" @change="$emit('change',selectedProject)">
                        <option v-for="project of projects" :key="project.pId" :value="project.pId">{{project.pName}}</option>
                    </select>
                </div>
                <div class="btn-area">
                    <button @click="$emit('confirmOrder')">确认预约</button>
                    <button @click="$emit('goback')">取消</button>
                </div>
            </template>
        </my-alert>
    </div>
</template>

<script>
import MyAlert from '@/components/MyAlert.vue'
export default {
    name:"ConfirmOrder",
    props:{
        isHide:Boolean,
        projects:Array,
        selectedProject:String
    },
    components: {
        MyAlert
    },
}
</script>

<style>

#confirm-order .box-style{
    width:250px;
    height:160px;
}
#confirm-order .title{
    font-size: 14px;
    height:15px;
    line-height: 15px;
    margin:10px;
    font-weight: 600
}
#confirm-order .options{
    /* border:1px solid black; */
    width:100%;
    height:75px;
    display: flex;
}
#confirm-order .options span{
    font-size:12px;
    margin:auto;
    margin-right:0

}
#confirm-order .options select{
    width:65%;
    margin:auto;
    margin-left:0

}
#confirm-order .btn-area{
    /* border:1px solid black; */
    height:65px;
}
#confirm-order .btn-area button{
    padding: 10px;
    width:30%;
    height:42px;
    outline: none;
    border:none;
    color:white;
    display: inline-block;
    cursor: pointer;
    margin:0 10px;
    background: rgb(206, 7, 7);
}
#confirm-order .btn-area button:hover{
    background: #ff6b81;
}
/* #confirm-order .btn-area button:first-child{
    border-bottom-left-radius: 10px;
    margin-right:4px;
}
#confirm-order .btn-area button:nth-child(2){
    border-bottom-right-radius: 10px;
    border-left:1px solid white;
} */
</style>

