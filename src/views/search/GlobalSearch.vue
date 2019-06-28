<template>
    <div id="global-search">
        <div class="nav-row">
            <div class="device-list">
                <DeviceList category="keyword" :keyword="keyword"></DeviceList>
            </div>
        </div>
    </div>
</template>
<script>
import DeviceList from '@/views/search/DeviceLists.vue'
export default {
    name:"GlobalSearch",
    props: {
        keyword:String
    },
    // computed: {
    //     keywordCopy(){
    //         return typeof(this.keyword)=="undefined"?"":this.keyword;
    //     }
    // },
    components:{
        DeviceList
    }
}
</script>

<style>
#global-search .device-list{
    width:100%;
    height:fit-content
}
</style>
