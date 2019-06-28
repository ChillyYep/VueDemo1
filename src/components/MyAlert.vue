<template>
    <div id="my-alert">
        <div :class="[klass,alertContent]">
            <div class="title">
                <slot name="alert-title"></slot>
            </div>
            <div class="body">
                <slot name="alert-body"></slot>
            </div>
            <div class="close" @click="$emit('closeAction')">
                <font-awesome-icon icon="window-close"/>                
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:"MyAlert",
        props:{
            klass:String
        },
        data(){
            return{
                alertContent:"alert-content"
            }
        },
        methods: {
            goback(){
                this.$router.push({name:"home"});
            }
        }
    }
</script>
<style>
#my-alert{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index:20;
    display:flex
}
#my-alert .alert-content{
    -ms-flex-item-align:center; 
    -moz-height:fit-content;
    -webkit-height:fit-content;
    height: fit-content;
    background: white;
    /* border-top-left-radius: 10px;
    border-top-right-radius: 10px; */
    /* border-radius: 10px; */
    margin:auto;
    position: relative;
}
.alert-content .close{
    display: block;
    position: absolute;;
    right:-10px;
    top:-10px;
    width: 30px;
    height:30px;
    font-size:30px;
    color:rgb(206, 7, 7);;
    /* background: rgba(0, 0, 0, 0.5); */
    cursor: pointer;
}
</style>

