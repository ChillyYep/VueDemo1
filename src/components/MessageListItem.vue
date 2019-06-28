<template>
    <div id="message-list-item">
        <div class="message-header">
            <div :class="['show-content',{'hide-content':showMessageContent}]" @click="showMessageContent=!showMessageContent">
                <span>&gt;</span>
                <!-- <font-awesome-icon icon="greater-than"/> -->
            </div>
            <div class="sender">
                <span>发送人：</span>
                <span>{{obj.senderName}}</span>
            </div>
        </div>
        <div class="message-content" v-show="showMessageContent">
            <div class="message-box">
                {{obj.message}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'MessageListItem',
    props:{
        obj:Object
    },
    data () {
        return {
            showMessageContent:false,
        }
    }
}
</script>
<style>
#message-list-item{
    width:90%;
    margin:0 auto;
    margin-bottom: 10px;
}
#message-list-item:hover > .message-header,
#message-list-item:hover > .message-content{
    box-shadow: 0 0 3px 1px lightgray;
}
#message-list-item .message-header{
    width:100%;
    border:1px solid lightgray;
    border-radius:5px;
}
#message-list-item .message-header::after,#message-list-item .message-header::before{
    content: "";
    display: table;
}
#message-list-item .message-header::after{
    clear: both;
}
#message-list-item .show-content{
    transform: rotateZ(90deg) scaleY(1.1);
    float:left;
    width:30px;
    height:30px;
    line-height: 30px;
    font-size:25px;
    margin-left:10px;
    cursor: pointer;
}
#message-list-item .hide-content{
    transform: rotate(-90deg) scaleY(1.1);
}
#message-list-item .sender{
    float:right;
    height:30px;
    line-height: 30px;
    margin-right:10px;
}
#message-list-item .message-content{
    width:95%;
    margin:0 auto;
    border:1px solid lightgray;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top:none;
}
#message-list-item .message-box{
    padding:10px;
    margin:0 20px;
    text-align:start;
    white-space:pre-line;
}
</style>
