<template>
    <div id="message-center">
        <div class="title">
            <div class="line"></div>
            <span>消息列表</span>
        </div>
        <div class="message-list">
            <MessageListItem :obj="obj1"></MessageListItem>
            <MessageListItem :obj="obj2"></MessageListItem>

        </div>
    </div>
</template>
<script>
import MessageListItem from '@/components/MessageListItem.vue'
export default {
    name:"MessageCenter",
    data () {
        return {
            showMessageContent:false,
            obj1:{senderName:"管理员A",message:"欢迎来到设备预约管理系统!"},
            obj2:{senderName:"管理员B",message:"您预订的设备因为故障而被取消预约了。\n望请见谅!"}
        }
    },
    components: {
        MessageListItem
    }
}
</script>
<style>
#message-center .title{
    text-align: start;
    color: gray;
    font-size:13px;
    width:100%; 
    position: relative;
    margin:20px 0;
}
#message-center .title .line{
    border-bottom: 1px solid rgb(116, 114, 114);
    margin:0 10px;
    /* width:100%; */
}
#message-center .title span{
    position: absolute;
    background: white;
    top:-10px;
    left:40px;
}
#message-center .message-list{
    width:100%;
}

</style>

