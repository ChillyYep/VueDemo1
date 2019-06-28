<template>
  <div id="home">
    <search-header>

    </search-header>
    <div class="nav-row">
      <div class="main">
        <div class="sidebar">
            <ul>
                <li v-for="(deviceCategory,index) of deviceCategorys" :key="index">
                    <router-link :to="{path:`/search/byCategory/${deviceCategory.route}`}">{{deviceCategory.category}}</router-link>
                </li>
                <li></li>
            </ul>
        </div>
        <div class="photo">
          <img src="@/assets/img/homePhoto.png" alt="homePhoto" width="100%" height="100%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchHeader from '@/components/SearchHeader.vue'
export default {
  name: 'Home',
  data () {
    return {
            deviceCategorys:[
                {category:"全部设备",route:"all"},
                {category:"原料药设备及机械",route:"crudeDrug"},
                {category:"制剂机械",route:"pharmaceutical"},
                {category:"药用粉碎机械",route:"medicinalPulverizer"},
                {category:"饮片机械",route:"yinpian"},
                {category:"制药用水设备",route:"waterUsed"},
                {category:"药品包装机械",route:"packaging"},
                {category:"药物检测设备",route:"detection"},
                {category:"其他制药机械及设备",route:"others"},
            ],
    }
  },
  components: {
    SearchHeader,
  },
  methods: {
    
  }
}
</script>
<style>
#home .main{
  height:79.98vh;
}
#home .sidebar,#home .photo{
  border:1px solid lightgray;
  border-top:0;
}
#home .sidebar{
  float:left;
  width:20%;
  height:100%;
  border-right:none;
  background:rgb(49, 46, 46)
}
#home .photo{
  float:left;
  height:100%;
  width:79%;
}
#home .sidebar ul{
  list-style-type: none;
  text-align: start;
  width:100%;
  height:90%;
  margin-top:20px;
  padding: 0
}
#home .sidebar ul a{
  color:white;
  text-decoration-line: none;
  padding-left:10px;
  margin-left:10px;
  display: block;
  width:90%;
  height:100%;
  line-height: 40px;
}
#home .sidebar ul a:hover{
  background: rgb(22, 22, 22);

}
#home .sidebar ul li{
  height:10%;
  margin-top:5px;
}
#home .sidebar ul li:last-child{
  height:0;
}
@media screen and (max-width: 1000px){
  #home .main{
    height:fit-content;
  }
  #home .nav-row{
    width:100%;
  }
  #home .sidebar{
    display: none;
  }
  #home .photo{
    width:100%;
    height: 100vw;
  }
}
</style>