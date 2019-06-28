<template>
    <div id="toast" v-if="isShow">
        <div class="message-box">
            <span>{{message}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"Toast",
    props: {
        message:String,
        isShow:Boolean
    }
}
</script>

<style>
#toast{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display:flex;
    z-index: 40;
}
#toast .message-box{
    background: rgba(0,0,0,0.8);
    margin:auto;
    color:white;
    padding: 10px;
    border-radius: 5px;
}
</style>
