<template>
    <div id="search-header">
        <div class="search-row">
            <div class="nav-row">
                <!-- <div class="search-box-row"> -->
                    <div class="search-third">
                        <div class="search-box">
                            <input type="text" name="keyword" v-model="keyword" class="search-text" onfocus="this.placeholder='输入关键词搜索'" onblur="this.placeholder=''">
                            <button class="search-btn" @click="gotoGlobalSearch()">
                                <font-awesome-icon icon="search"/>
                            </button>
                        </div>
                    </div>
                <!-- </div> -->
                <div class="search-second">
                    <router-link v-for="(searchWay,index) in searchWays" :key="index" :to="searchWay.route">{{searchWay.name}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"SearchHeader",
    data(){
        return{
            searchWays:[
                {name:"全部设备",route:"/search/byCategory"},
                {name:"按位置查询",route:"/search/byPosition"},
                {name:"按项目查询",route:"/search/byproject"},
                {name:"按人员查询",route:"/search/byPerson"},
                {name:"按时间查询",route:"/search/byTime"}
            ],
            keyword:""
        }
    },
    methods: {
        gotoGlobalSearch(){
            if(this.keyword!=""){
                this.$router.push({path:`/search/globalSearch/${this.keyword}`});
            }
        }
    }
}
</script>
<style>
#search-header{
    margin-top:10px;
}
#search-header .search-row{
    background:rgb(49, 46, 46)
}
#search-header .search-second{
    float: left;
    width:60%;
    min-width: 600px;
}
#search-header .search-second::after,#search-header .search-second::before{
    content: "";
    display: table
}
#search-header .search-second::after{
    clear: both;
}
#search-header .search-second a{
    display:block;
    text-decoration-line: none;
    color:white;
    width:120px;
    height:60px;
    line-height: 60px;
    float:left;
}
#search-header .search-second a.router-link-active{
    background: black;
}
#search-header .search-third{
    display: flex;
    height: 60px;
    float: right;
    width:300px;
    justify-content: center;
    align-items: center
}
#search-header .search-box{
    border-radius: 30px;
    height: 40px;
    line-height: 40px;
    background: white;
    width:fit-content;
    display: flex;
}
#search-header .search-box:hover > .search-text,#search-header .search-text:focus{
    width:180px;
    padding: 0 10px;
}
#search-header .search-text{
    outline: none;
    background: none;
    border:none;
    color: black;
    font-size:14px;
    width: 0;
    margin:auto;
    transition: 0.5s;
    height: 40px;
    line-height: 40px;
}
#search-header .search-btn{
    /* float:right; */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size:18px;
    background:white;
    color:black;
    margin:auto;
    border:none;
    cursor: pointer;
    outline: none;
}
@media screen and (max-width: 1250px){
    #search-header .nav-row{
        width:100%;
    }
    /* #search-header .search-second{
        width:100%;
    } */
}
@media screen and (max-width:900px){
    #search-header .search-third{
        width:100%;
    }
    #search-header .search-second{
        min-width:0;
        width:100%;
    }
}
@media screen and (max-width:760px){
    #search-header .search-second a{
        width:20%;
    }
}
@media screen and (max-width:560px){
    #search-header .search-second a{
        width:33.3%;
    }
}
</style>

