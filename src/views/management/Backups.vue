<template>
    <div id="backups">
        <!-- <InfoView>
        </InfoView> -->
        <div class="middle-layer">
            <div class="title">
                <span>备份</span>
            </div>
            <div class="body">
                <div class="center">
                    <div class="form-row">
                        <span>备份频率：</span>
                        <input type="text" :value="frequency">
                        <span>天/次</span>
                    </div>
                    <div class="form-row">
                        <span>备份方法：</span>
                        <select id="backupsWays" v-model="currentWay">
                            <option v-for="(backupsWay,index) of backupsWays" :key="index" :value="index">{{backupsWay}}</option>
                        </select>
                    </div>
                    <div class="endline"></div>
                    <div class="btn-area">
                        <button @click="submitChange">确认修改</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import InfoView from '@/components/InfoView.vue'
export default {
    name:"backups",
    data () {
        return {
            backupsWays:["完全备份","增量备份"],
            currentWay:0,
            frequency:0
        }
    },
    mounted(){
        this.loadData();
    },
    methods: {
        loadData(){
            this.axios({
                method:"get",
                url:"/management/backups",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                }
            }).then(result => {
                this.frequency=result.data.frequency;
                this.currentWay=result.data.way;
            }).catch(err => {
                alert(err);
            });
        },
        submitChange(){
            this.axios({
                method:"post",
                url:"/management/backups",
                data:JSON.stringify({
                    frequency:this.frequency,
                    way:this.currentWay
                }),
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                }
            }).then(result => {
                if(result.data.code==0){
                    alert("修改成功！");
                }
            }).catch(err => {
                alert(err);                
            });
        }
    }
}
</script>
<style>
#backups{
    border:1px solid lightgray;
    border-bottom: none;
    height:95%;
    width:90%;
    margin:0 auto;
}
.middle-layer{
    height:300px;
}
#backups .title{
    padding: 10px;
    border-bottom: 1px solid lightgray;
    text-align: start
}
#backups .title span{
    display: block;
    border-left:5px solid black;
    padding-left: 10px;
}
#backups .body{
    display: flex;
    height:80%;
}
#backups .center{
    margin:auto;
    width:100%;
}
#backups .form-row{
    height:40px;
    width:300px;
    margin:0 auto
}
#backups .form-row::before,#backups .form-row::after{
    content: "";
    display: table;
}
#backups .form-row::after{
    clear: both;
}
#backups .form-row span,#backups .form-row input,#backups .form-row select{
    float:left;
    margin-left:5px;
}
#backups .form-row span:first-child{
    display: block;
    width:100px;
    text-align: end;
    color:gray
    /* margin-left:100px; */
}
#backups .form-row select,#backups .form-row input{
    width:100px;
}
#backups .form-row select:focus,#backups .form-row input:focus{
    outline:#ff4757 solid 2px;
}
#backups .endline{
    margin:10px auto;
    border-top: 1px solid lightgray;
    width:90%;
}
#backups .btn-area{
    margin-top:20px;
}
#backups .btn-area button{
    padding: 10px;
    font-size: 16px;
    outline: none;
    border: none;
    background: rgb(206, 7, 7);
    color:white;
    cursor: pointer;
    margin:0 auto;
}
</style>
