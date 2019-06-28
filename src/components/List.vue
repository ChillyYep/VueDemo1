<template>
    <div id="list">
        <div class="list-title">
            <span>{{titleName}}</span>
        </div>        
        <div class="list-tool">
            <!-- 刷新 -->
            <button class="btn" @click="$emit('refresh')">
                <font-awesome-icon icon="retweet"/>
            </button>
            <!-- 筛选 -->
            <button class="btn" @click="$emit('filter')">
                <font-awesome-icon icon="filter"/>
            </button>
            <button v-if="neadAdd" class="btn" @click="$emit('add')">
                <font-awesome-icon icon="plus"/>
            </button>
        </div>
        <div class="list-body">
            <ul>
                <li v-for="item of list" :key="item.itemId" :class="{active:selectItemId===item.itemId}" @click="$emit('showContent',item);selectItemId=item.itemId">{{item.itemName}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:"List",
    props:{
        list:Array,
        selectItemId:String,
        neadAdd:Boolean,
        titleName:String
    },
    data () {
        return {
        }
    }
}
</script>

<style>
#list{
    height: 95%;
    width: 100%;
    background: inherit;
}
#list .list-title{
    font-size: 14px;
    color: inherit;
}
#list .list-tool{
    height:30px;
    line-height: 20px;
    text-align: center;
    /* border-bottom: 1px solid lightgray */
}
#list .list-tool .btn{
    outline: none;
    /* border:1px solid lightgray; */
    border: none;
    border-radius: 2px;
    color:inherit;
    background: transparent;
    cursor: pointer;
    height:30px;
    width:30px;
    font-size: 16px;
    line-height: 30px;
}
#list .list-tool .btn:first-child{
    float:left;
}
#list .list-tool .btn:nth-child(2){
    float:right;
}
#list .list-tool .btn:nth-child(3):hover{
    transform: rotate(90deg);
    transition: all .5s ease
}
#list .list-body{
    overflow: hidden;
    height:95%;
}
#list .list-body:hover{
    overflow-y: scroll;
}
#list .list-body::-webkit-scrollbar{
    width: 2px;
    /* height:10px; */
}
#list .list-body::-webkit-scrollbar-thumb{
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
}
/* #list .list-body::-webkit-scrollbar-track{
    background-color: rgba(0, 0, 0, 0.2);
} */
#list .list-body ul{
    height:100%;
    margin:0;
    padding: 0;
    list-style-type: none;
}
#list .list-body ul li{
    height:30px;
    line-height: 30px;
    border-top:1px solid lightgray;
    color:inherit
}
#list .list-body ul li:hover{
    background: lightgray;
    cursor: pointer;
}
#list .list-body ul li.active{
    background: #e6053d;
    color: white
}
</style>

