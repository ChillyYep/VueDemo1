<template>
    <div id="project-info">
        <div class="info-view">
            <InfoView :name="name" :pairs="projectInfoPairs" :confirmBtnName="btnName" @submit="submitChange($event)" :selectState="[projectInfo.pState]"></InfoView>
        </div>
        <div :class="['list-area',{'list-area2':showListArea==true}]">
            <List @showContent="clickListItem($event)" :list="projectList" :selectItemId="currentItem.itemId" :neadAdd="true" @refresh="loadItems()" @add="add()" titleName="项目列表"></List>
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
    name:"ProjectInfo",
    data () {
        return {
            projectList:[],//项目列表
            tempList:[],//设备基础信息列表
            currentItem:{},//当前选择的列表选项            
            name:"项目基础信息",
            btnName:"确认修改",
            projectInfo:{},
            projectInfoPairs:new Map(),
            showListArea:false,
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
            this.loadProjectInfo();
            this.btnName="确认修改";
            this.showListArea=false;
        },
        change2InfoPairs(projectInfo){
            let pairs=[]
            pairs.push(["项目名",{value:projectInfo.pName,isEditable:true,type:"text"}]);
            if(projectInfo.pId!=-1){
                pairs.push(["项目编号",{value:projectInfo.pId,isEditable:false,type:"text"}]);    
            }
            pairs.push(["项目状态",{value:projectInfo.pState,isEditable:true,type:"select",options:["正常","暂停","完成"]}]);
            pairs.push(["负责人编号",{value:projectInfo.uId,isEditable:true,type:"text"}]);            
            this.projectInfoPairs=new Map(pairs);
        },
        loadItems(){
            this.axios({
                method:"get",
                url:"/search/projectList",
                params:{
                    // way:"all",
                    // data:"",
                    uIdentity:this.$root.getIdentity()
                },
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                }
            }).then(res=>{
                this.tempList=res.data.list;
                this.reWriteProjectList();
                this.currentItem=this.projectList[0];
                this.projectInfo=this.tempList[0];
                this.change2InfoPairs(this.projectInfo);
                this.btnName="确认修改";
            }).catch(error=>{
                alert(error)
                this.projectList=[]
            })
        },
        reWriteProjectList(){
            this.projectList=[]
            for(let item of this.tempList){
                this.projectList.push({itemId:item.pId,itemName:item.pName});
            }
        },
       loadProjectInfo(){
            let itemId=this.currentItem.itemId;
            for(let item of this.tempList){
                if(item.pId===itemId){
                    this.projectInfo=item;
                    break;
                }
            }
            this.change2InfoPairs(this.projectInfo);
        },
        submitChange(projectInfoPairs){
            this.projectInfoPairs=projectInfoPairs;
            let projectInfo={};
            this.change2InfoObject(projectInfo)
            this.axios({
                method:"post",
                url:"/management/project",
                data:JSON.stringify(projectInfo),
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                }
            }).then(res => {
                if(res.data.code==0){//修改成功
                    if(this.btnName==="确认修改"){
                        this.change2InfoObject(this.projectInfo);
                        alert("修改成功");
                    }else{
                        this.loadItems();
                        alert("已生成新的项目");
                    }
                }
            }).catch(err => {
                alert(err);
            });
        },
        change2InfoObject(projectInfo){
            if(this.btnName==="确认修改"){
                projectInfo.pId=this.projectInfoPairs.get("项目编号").value;
            }
            else{
                projectInfo.pId=-1;
            }
            // projectInfo.pId=this.projectInfoPairs.get("项目编号").value;
            projectInfo.pName=this.projectInfoPairs.get("项目名").value;
            projectInfo.pState=this.projectInfoPairs.get("项目状态").value;
            // console.log('equipmentInfo.eState:', equipmentInfo.eState==0);

            let uId=this.projectInfoPairs.get("负责人编号").value;
            console.log('uId:', typeof(uId));
            if(typeof(uId)=="string"){
                projectInfo.uId=parseInt(uId);
            }else if(typeof(uId)=="number"){
                projectInfo.uId=uId;
            }
        },
        add(){
            this.currentItem={itemId:-1,itemName:""}
            let projectInfo={
                pName:"",
                pId:-1,
                pState:0,
                uId:""
            };
            this.btnName="确认生成";
            this.change2InfoPairs(projectInfo);
        }
    }
}
</script>
<style>
#project-info{
    width:100%;
    height: 100%;
    position: relative;
}
#project-info .list-area{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 80%;
    right:0;
    border:1px solid lightgray;
    transition: all 0.5s ease;
}
#project-info .info-view{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right:20%;
    border:1px solid lightgray;
    margin:0 5px;
    transition: all 0.5s ease;
}
#project-info .list-area .show-list-area{
    display: none
}
@media screen and (max-width: 600px){
    #project-info .info-view{
        right:0;
    }
    #project-info .list-area{
        position: fixed;
        width:200px;
        top: 0;
        bottom: 0;
        left:100%;
        background: #1e272e;
        color:white;
    }
    #project-info .list-area2{
        transform: translateX(-100%);
    }
    #project-info .list-area .show-list-area{
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