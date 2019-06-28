<template>
    <div id="loading1">
        <div class="box">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Loading1"
}
</script>
<style>
#loading1{
    position: absolute;
    top:-10px;
    bottom: 0;
    left: 0;
    right:0;
    min-height: 300px;
    background-color: white;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index: 10;
}
#loading1 .box{
    background: transparent;
    width:80%;
    min-width:120px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}
#loading1 .circle{
    /* max-width:60px;
    max-height: 60px; */
    width:10vw;
    height: 10vw;
    margin:auto 2vw;
    border-radius:50%;
    background: #353b48;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(0.3,0.3);
}
#loading1 .box div:first-child{
    animation: firstDot 1s infinite ease-in-out;
}
#loading1 .box div:nth-child(2){
    animation: firstDot 1s infinite ease-in-out;
    animation-delay: 0.3s;
}
#loading1 .box div:nth-child(3){
    animation: firstDot 1s infinite ease-in-out;
    animation-delay: 0.6s;
}
@keyframes firstDot{
    0%{transform: scale(0.3,0.3);}
    50%{transform: scale(0.6,0.6);}
    100%{transform: scale(0.3,0.3);}
}
</style>
