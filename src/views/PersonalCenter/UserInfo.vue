<template>
    <div id="user-info">
        <div class="info-view2">
            <InfoView :name="name" :pairs="userInfoPairs" confirmBtnName="确认修改" @submit="submitChange($event)" :selectState="[userInfo.uSex,uIdentityFormatChange(userInfo.uIdentity)]">
                <button @click="logOut">退出登录</button>
            </InfoView>
        </div>
    </div>
</template>

<script>
import InfoView from '@/components/InfoView.vue'
export default {
    name:"UserInfo",
    data () {
        return {
            name:"用户信息",
            userInfo:{},
            userInfoPairs:new Map()            
        }
    },
    components: {
        InfoView
    },
    mounted(){
        this.loadItems();
    },
    methods: {
        logOut(){
            sessionStorage.clear();
            this.$root.state.loginState=false;
            this.$router.push({name:"home"});
        },
        loadItems(){
            this.axios({
                method:"get",
                url:"/user/user",
                params:{
                    // way:"all",
                    // data:"",
                    uId:this.$root.getUId()
                    // uIdentity:this.getIdentity()
                },
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                }
            }).then(res=>{
                this.userInfo=res.data.obj;
                this.change2InfoPairs(this.userInfo);
            }).catch(error=>{
                alert(error)
            })
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
                    // this.change2InfoObject(this.userInfo);
                    alert("修改成功");
                }
            }).catch(err => {
                alert(err);
            });
        },
        change2InfoPairs(userInfo){
            let pairs=[]
            pairs.push(["用户名",{value:userInfo.uName,isEditable:true,type:"text"}]);
            pairs.push(["用户编号",{value:userInfo.uId,isEditable:false,type:"text"}]);
            pairs.push(["信用点数",{value:userInfo.uCredit,isEditable:false,type:"text"}]);
            pairs.push(["手机号码",{value:userInfo.uPhone,isEditable:true,type:"number"}]);            
            pairs.push(["所在科室",{value:userInfo.uDepartment,isEditable:true,type:"text"}]);            
            pairs.push(["性别",{value:userInfo.uSex,isEditable:true,type:"select",options:["男","女","中性"]}]);            
            pairs.push(["职称",{value:userInfo.uTitle,isEditable:true,type:"text"}]);
            let value=this.uIdentityFormatChange(userInfo.uIdentity);        
            pairs.push(["身份权限",{value:value,isEditable:false,type:"select",options:["普通用户","管理员","系统管理员"]}]);            
            pairs.push(["密码",{value:userInfo.uPassword,isEditable:true,type:"text"}]);  
            if(value==2) {
                pairs.push(["密码2",{value:userInfo.uPassword2,isEditable:true,type:"text"}]);//如果uPassword2为""，隐藏该项                        
            }         
            this.userInfoPairs=new Map(pairs);
        },
        change2InfoObject(userInfo){
            userInfo.uId=this.userInfoPairs.get("用户编号").value;
            userInfo.uName=this.userInfoPairs.get("用户名").value;
            userInfo.uCredit=this.userInfoPairs.get("信用点数").value;
            // console.log('equipmentInfo.eState:', equipmentInfo.eState==0);
            userInfo.uPhone=this.userInfoPairs.get("手机号码").value;
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
        }
    }
}
</script>
<style>
#user-info{
    width:96%;
    margin:0 auto;
    margin-top:20px;
}
#user-info .info-view2{
    border:1px solid lightgray;
    border-bottom: none;
    width:100%;
}
</style>
