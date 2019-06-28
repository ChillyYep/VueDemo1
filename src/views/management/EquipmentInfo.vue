<template>
    <div id="equipment-info">
        <div class="info-view">
            <InfoView :pairs="equipmentInfoPairs" :name="name" :confirmBtnName="btnName" @submit="submitChange($event)"></InfoView>
        </div>
        <div :class="['list-area',{'list-area2':showListArea==true}]">
            <List @showContent="clickListItem($event)" :list="deviceList" :selectItemId="currentItem.itemId" :neadAdd="true" @refresh="loadItems()" @add="add()" titleName="设备列表"></List>
            <div class="show-list-area" @click="showListArea=!showListArea">
                <span>设备列表</span>
                <span v-if="showListArea">&gt;</span>
                <span v-else>&lt;</span>
            </div>
        </div>
    </div>
</template>
<script>
import List from '@/components/List.vue'
import InfoView from '@/components/InfoView.vue'

export default {
    name:"EquipmentInfo",
    data () {
        return {
            deviceList:[],//设备简单信息列表
            tempList:[],//设备基础信息列表
            currentItem:{},//当前选择的列表选项
            name:"设备基础信息",
            equipmentInfo:{},
            btnName:"确认修改",
            // equipmentInfoPairs:new Map([["设备名",{value:"大哥",isEditable:true,type:"text"}],["设备Id",{value:"0001",isEditable:false,type:"text"}],["启用设备",{value:true,isEditable:true,type:"checkbox"}]]),
            equipmentInfoPairs:new Map(),
            showListArea:false            
        }
    },
    components: {
        List,
        InfoView
    },
    mounted(){
        this.loadItems();
    },
    methods: {
        clickListItem(item){
            this.currentItem=item;
            this.loadEquipmentInfo();
            this.btnName="确认修改";
            this.showListArea=false;
        },
        loadEquipmentInfo(){
            let itemId=this.currentItem.itemId;
            for(let item of this.tempList){
                if(item.eId===itemId){
                    this.equipmentInfo=item;
                    break;
                }
            }
            this.change2InfoPairs(this.equipmentInfo);
        },
        change2InfoPairs(equipmentInfo){
            let pairs=[]
            pairs.push(["设备名",{value:equipmentInfo.eName,isEditable:true,type:"text"}]);
            if(equipmentInfo.eId!=-1){
                pairs.push(["设备编号",{value:equipmentInfo.eId,isEditable:false,type:"text"}]);
            }
            pairs.push(["设备品牌",{value:equipmentInfo.eBrand,isEditable:true,type:"text"}]);
            pairs.push(["设备型号",{value:equipmentInfo.eModel,isEditable:true,type:"text"}]);
            pairs.push(["使用地址",{value:equipmentInfo.eAddress,isEditable:true,type:"text"}]);
            pairs.push(["是否启用",{value:equipmentInfo.eState,isEditable:true,type:"checkbox"}]);
            // console.log('equipmentInfo.eState:',equipmentInfo.eState==0);
            pairs.push(["设备类型",{value:equipmentInfo.eType,isEditable:true,type:"text"}]);            
            this.equipmentInfoPairs=new Map(pairs);
        },
        loadItems(){
            this.axios({
                method:"get",
                url:"/search/deviceList",
                params:{
                    way:"all",
                    data:"",
                    uIdentity:this.$root.getIdentity(),
                    code:-1
                },
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                }
            }).then(res=>{
                this.tempList=res.data.list;
                this.reWriteDeviceList();
                this.currentItem=this.deviceList[0];
                this.change2InfoPairs(this.tempList[0]);
                this.btnName="确认修改";
            }).catch(error=>{
                alert(error)
                this.deviceList=[]
            })
        },
        reWriteDeviceList(){
            this.deviceList=[];
            for(let item of this.tempList){
                this.deviceList.push({itemId:item.eId,itemName:item.eName});
            }
        },
        submitChange(equipmentInfoPairs){
            this.equipmentInfoPairs=equipmentInfoPairs;
            let equipmentInfo={};
            this.change2InfoObject(equipmentInfo)
            this.axios({
                method:"post",
                url:"/management/equipment",
                data:JSON.stringify(equipmentInfo),
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                }
            }).then(res => {
                if(res.data.code==0){//修改成功
                    if(this.btnName==="确认修改"){
                        this.change2InfoObject(this.equipmentInfo);
                        alert("修改成功");
                    }else{
                        this.loadItems();
                        alert("已生成新的设备");
                    }
                }
            }).catch(err => {
                alert(err);
            });
        },
        change2InfoObject(equipmentInfo){
            if(this.btnName==="确认修改"){
                equipmentInfo.eId=this.equipmentInfoPairs.get("设备编号").value;
            }
            else{
                equipmentInfo.eId=-1;
            }
            equipmentInfo.eName=this.equipmentInfoPairs.get("设备名").value;
            equipmentInfo.eBrand=this.equipmentInfoPairs.get("设备品牌").value;
            equipmentInfo.eModel=this.equipmentInfoPairs.get("设备型号").value;
            equipmentInfo.eAddress=this.equipmentInfoPairs.get("使用地址").value;
            equipmentInfo.eState=this.equipmentInfoPairs.get("是否启用").value;
            // console.log('equipmentInfo.eState:', equipmentInfo.eState==0);
            equipmentInfo.eType=this.equipmentInfoPairs.get("设备类型").value;
        },
        add(){
            this.currentItem={itemId:-1,itemName:""}
            let equipmentInfo={
                eName:"",
                eId:-1,
                eBrand:"",
                eModel:"",
                eAddress:"",
                eState:1,
                eType:""
            };
            this.btnName="确认生成";
            this.change2InfoPairs(equipmentInfo);
        }
    }
}
</script>
<style>
#equipment-info{
    width:100%;
    height: 100%;
    position: relative;
}
#equipment-info .list-area{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 80%;
    right:0;
    border:1px solid lightgray;
    transition: all 0.5s ease;
    background-color: white;
}
#equipment-info .info-view{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right:20%;
    border:1px solid lightgray;
    margin:0 5px;
    transition: all 0.5s ease
}
#equipment-info .list-area .show-list-area{
    display: none;
}
@media screen and (max-width: 600px){
    #equipment-info .info-view{
        right: 0
    }
    #equipment-info .list-area{
        position: fixed;
        width:200px;
        top: 0;
        bottom: 0;
        left:100%;
        background: #1e272e;
        color:white;
    }
    #equipment-info .list-area2{
        transform: translateX(-100%);
    }
    #equipment-info .list-area .show-list-area{
        position: absolute;
        bottom: 50%;
        transform: translateY(50%);
        width: 20px;
        padding:10px 1px 10px 3px;
        height:100px;
        left:-25px;
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
        line-height: 20px;
        border:1px solid lightgray;
        border-right:none;
        color:white;
        background-color: #1e272e;
        display: block;
        z-index: 20
    }
}
</style>
