<template>
    <div id="search-by-person">
        <div class="nav-row">
            <div class="person-selector-layout">
                <div class="page-left">
                    <div class="user-list">
                        <List :neadAdd="false" :list="userList" @showContent="clickListItem($event)" :selectItemId="currentItem.itemId" @refresh="loadItems()" titleName="人员列表"></List>
                        <Loading v-show="isLoading"></Loading>
                    </div>
                </div>
                <div class="device-list">
                    <DeviceList category="person" :id="userInfo.uId"></DeviceList>
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
    name:"SearchByPerson",
    components: {
        List,
        DeviceList,
        Loading
    },
    data () {
        return {
            tempList:[],
            userList:[],//项目列表
            currentItem:{},//当前选择的列表选项
            userInfo:{},
            isLoading:false,
        }
    },
    mounted(){
        this.loadItems();
    },
    methods: {
        clickListItem(item){
            this.currentItem=item;
            this.userInfo.uId=item.itemId;
        },
        loadItems(){
            this.isLoading=true;
            this.axios({
                method:"get",
                url:"/search/userList",
                params:{
                    uIdentity:this.$root.getIdentity()
                },
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                }
            }).then(res=>{
                this.tempList=res.data.list;
                this.reWriteUserList();
                this.currentItem=this.userList[0];
                this.userInfo=this.tempList[0];
                this.isLoading=false;
            }).catch(error=>{
                alert(error);
                this.userList=[];
                this.isLoading=false;
            })
        },
        reWriteUserList(){
            this.userList=[];
            for(let item of this.tempList){
                this.userList.push({itemId:item.uId,itemName:item.uName});
            }
        },
    }
}
</script>
<style>
#search-by-person .person-selector-layout{
    display: table;
    width:100%;
}
#search-by-person .page-left{
    display: table-cell;
    width:20%;
    vertical-align:top
}
#search-by-person .user-list{
    height: 30em;
    width:100%;
    margin-top:10px;
    border:1px solid lightgray;
    position: relative;
}
#search-by-person .device-list{
    /* height:fit-content; */
    display: table-cell;
    vertical-align: top;
}
@media screen and (max-width:800px){
    #search-by-person .nav-row{
        width:100%;
    }
    #search-by-person .page-left{
        width:100px;
        text-overflow: ellipsis;
    }
}
</style>