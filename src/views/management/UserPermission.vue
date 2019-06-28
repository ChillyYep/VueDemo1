<template>
    <div id="user-permission">
        <div class="info-view">
            <InfoView :pairs="userInfoPairs" :name="name" :confirmBtnName="btnName" @submit="submitChange($event)" :selectState="[userInfo.uSex,uIdentityFormatChange(userInfo.uIdentity)]"></InfoView>
        </div>
        <div :class="['list-area',{'list-area2':showListArea==true}]">
            <List @showContent="clickListItem($event)" :list="userList" :selectItemId="currentItem.itemId" :neadAdd="true" @refresh="loadItems()" @add="add()" titleName="用户列表"></List>
            <div class="show-list-area" @click="showListArea=!showListArea">
                <span>用户列表</span>
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
    name:"UserPermission",
    data () {
        return {
            userList:[],//项目列表
            tempList:[],//设备基础信息列表
            currentItem:{},//当前选择的列表选项            
            name:"用户基础信息",
            btnName:"确认修改",
            userInfo:{},
            userInfoPairs:new Map(),
            showListArea:false,
        }
    },
    components: {
        InfoView,
        List
    },
    mounted(){
        this.loadItems();
    },
    methods: {
        clickListItem(item){
            this.currentItem=item;
            this.loadUserInfo();
            this.btnName="确认修改";
            this.showListArea=false;
        },
        change2InfoPairs(userInfo){
            let pairs=[]
            pairs.push(["用户名",{value:userInfo.uName,isEditable:true,type:"text"}]);
            if(userInfo.uId!=-1){
                pairs.push(["用户编号",{value:userInfo.uId,isEditable:false,type:"text"}]);
                pairs.push(["信用点数",{value:userInfo.uCredit,isEditable:false,type:"text"}]);
            }
            pairs.push(["手机号码",{value:userInfo.uPhone,isEditable:true,type:"number"}]);            
            pairs.push(["所在科室",{value:userInfo.uDepartment,isEditable:true,type:"text"}]);            
            pairs.push(["性别",{value:userInfo.uSex,isEditable:true,type:"select",options:["男","女","中性"]}]);            
            pairs.push(["职称",{value:userInfo.uTitle,isEditable:true,type:"text"}]);
            let value=this.uIdentityFormatChange(userInfo.uIdentity);         
            pairs.push(["身份权限",{value:value,isEditable:true,type:"select",options:["普通用户","管理员","系统管理员"]}]);            
            pairs.push(["密码",{value:userInfo.uPassword,isEditable:true,type:"text"}]);
            //在修改页面将身份权限修改为系统管理员后，无法将密码2输入框呈现出来，后期优化内容
            if(value==2){
                pairs.push(["密码2",{value:userInfo.uPassword2,isEditable:true,type:"text"}]);//如果uPassword2为""，隐藏该项                       
            }            
            this.userInfoPairs=new Map(pairs);
        },
        loadItems(){
            this.axios({
                method:"get",
                url:"/search/userList",
                params:{
                    // way:"all",
                    // data:"",
                    uIdentity:"systemAdmin"
                },
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                }
            }).then(res=>{
                this.tempList=res.data.list;
                this.reWriteUserList();
                this.currentItem=this.userList[0];
                this.userInfo=this.tempList[0];
                this.change2InfoPairs(this.userInfo);
                this.btnName="确认修改";
            }).catch(error=>{
                alert(error)
                this.userList=[]
            })
        },
        reWriteUserList(){
            this.userList=[]
            for(let item of this.tempList){
                this.userList.push({itemId:item.uId,itemName:item.uName});
            }
        },
       loadUserInfo(){
            let itemId=this.currentItem.itemId;
            for(let item of this.tempList){
                if(item.uId===itemId){
                    this.userInfo=item;
                    break;
                }
            }
            this.change2InfoPairs(this.userInfo);
        },
        submitChange(userInfoPairs){
            this.userInfoPairs=userInfoPairs;
            let userInfo={};
            this.change2InfoObject(userInfo)
            this.axios({
                method:"post",
                url:"/management/user",
                data:JSON.stringify(userInfo),
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                }
            }).then(res => {
                if(res.data.code==0){//修改成功
                    if(this.btnName==="确认修改"){
                        this.change2InfoObject(this.userInfo);
                        alert("修改成功");
                    }else{
                        this.loadItems();
                        alert("已生成新用户");
                    }
                }
            }).catch(err => {
                alert(err);
            });
        },
        change2InfoObject(userInfo){
            if(this.btnName==="确认修改"){
                userInfo.uId=this.userInfoPairs.get("用户编号").value;            
                userInfo.uCredit=this.userInfoPairs.get("信用点数").value;
            }else{
                userInfo.uId=-1;
            }
            userInfo.uName=this.userInfoPairs.get("用户名").value;
            // console.log('equipmentInfo.eState:', equipmentInfo.eState==0);
            let uPhone=this.userInfoPairs.get("手机号码").value;
            if(typeof(uPhone)==="string"){
                userInfo.uPhone=parseInt(uPhone);
            }else if(typeof(uPhone)==="number"){
                userInfo.uPhone=uPhone;
            }
            userInfo.uDepartment=this.userInfoPairs.get("所在科室").value;
            userInfo.uSex=this.userInfoPairs.get("性别").value;
            userInfo.uTitle=this.userInfoPairs.get("职称").value;
            const value=this.userInfoPairs.get("身份权限").value;
            switch(value){
                case 0:userInfo.uIdentity="user";break;
                case 1:userInfo.uIdentity="admin";break;
                case 2:userInfo.uIdentity="systemAdmin";break;
                default:break;
            }
            userInfo.uPassword=this.userInfoPairs.get("密码").value;
            if(value==2){
                userInfo.uPassword2=this.userInfoPairs.get("密码2").value;
            }
        },
        uIdentityFormatChange(uIdentity){
            let value=0;
            switch(uIdentity){
                case "user":value=0;break;
                case "admin":value=1;break;
                case "systemAdmin":value=2;break;
                default:break;
            } 
            return value;
        },
        add(){
            this.currentItem={itemId:-1,itemName:""}
            let userInfo={
                uName:"",
                uId:-1,
                uCredit:10,
                pState:0,
                uPhone:"",
                uDepartment:"",
                uSex:0,
                uTitle:"",
                uIdentity:"user",
                uPassword:"88888888",
                uPassword2:"88888888"
            };
            this.btnName="确认生成";
            this.change2InfoPairs(userInfo);
        }
    }
}
</script>
<style>
#user-permission{
    width:100%;
    height: 100%;
    position: relative;
}
#user-permission .list-area{
    position: absolute;
    top: 0;
    bottom: 0;
    width:20%;
    right:0;
    border:1px solid lightgray;
    transition: all 0.5s ease
}
#user-permission .info-view{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right:20%;
    border:1px solid lightgray;
    margin:0 5px;
    transition: all 0.5s ease
}
#user-permission .list-area .show-list-area{
    display: none
}
@media screen and (max-width: 600px){
    #user-permission .list-area{
        position: fixed;
        width:200px;
        top: 0;
        bottom: 0;
        left:100%;
        background: #1e272e;
        color:white;
    }
    #user-permission .info-view{
        right: 0;
    }
    #user-permission .list-area2{
        transform: translateX(-100%);
    }
    #user-permission .list-area .show-list-area{
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
        z-index: 20;
        display: block
    }
}
</style>

