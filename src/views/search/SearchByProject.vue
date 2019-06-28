<template>
    <div id="search-by-project">
        <div class="nav-row">
            <div class="project-selector-layout">
                <div class="page-left">
                    <div class="project-list">
                        <List :neadAdd="false" :list="projectList" @showContent="clickListItem($event)" :selectItemId="currentItem.itemId" @refresh="loadItems()" titleName="项目列表"></List>
                        <Loading v-show="isLoading"></Loading>
                    </div>
                </div>
                <div class="device-list">
                    <DeviceList category="project" :id="projectInfo.pId"></DeviceList>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import List from '@/components/List.vue'
import DeviceList from '@/views/search/DeviceLists.vue'
import Loading from '@/components/Loading1.vue'
export default {
    name:"SearchByProject",
    components: {
        List,
        DeviceList,
        Loading
    },
    data () {
        return {
            tempList:[],
            projectList:[],//项目列表
            currentItem:{},//当前选择的列表选项
            projectInfo:{},
            isLoading:false,
        }
    },
    mounted(){
        this.loadItems();
    },
    methods: {
        clickListItem(item){
            this.currentItem=item;
            this.projectInfo.pId=item.itemId;
        },
        loadItems(){
            this.isLoading=true;
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
                this.isLoading=false;
            }).catch(error=>{
                alert(error);
                this.projectList=[];
                this.isLoading=false;
            })
        },
        reWriteProjectList(){
            this.projectList=[];
            for(let item of this.tempList){
                this.projectList.push({itemId:item.pId,itemName:item.pName});
            }
        },
    }
}
</script>
<style>
#search-by-project .project-selector-layout{
    display: table;
    width:100%;
}
#search-by-project .page-left{
    display: table-cell;
    width:20%;
    vertical-align: top
}
#search-by-project .project-list{
    height: 30em;
    width:100%;
    margin-top:10px;
    border:1px solid lightgray;
    position: relative;
}

#search-by-project .device-list{
    display: table-cell;
    vertical-align: top;
}
@media screen and (max-width:800px){
    #search-by-project .nav-row{
        width:100%;
    }
    #search-by-project .page-left{
        width:100px;
        text-overflow: ellipsis;
    }
}
</style>
