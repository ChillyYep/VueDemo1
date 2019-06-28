<template>
  <div id="order">
    <!-- <h1>{{deviceInfo}}</h1> -->
    <div class="basic-info nav-row">
      <div class="img-info">
        <img :src="deviceInfo.eImage" alt="devicePhoto" height="100%" width="100%">
      </div>
      <div class="text-info">
        <table>
          <tr>
            <td>设备名称：{{deviceInfo.eName}}</td>
            <td>设备编号：{{deviceInfo.eId}}</td>
          </tr>
          <tr>
            <td>设备品牌：{{deviceInfo.eBrand}}</td>
            <td>设备型号：{{deviceInfo.eModel}}</td>
          </tr>
          <tr>
            <td>设备地址：{{deviceInfo.eAddress}}</td>
            <td>设备状态：{{deviceInfo.eState}}</td>
          </tr>
          <tr>
            <td>设备类型：{{deviceInfo.eType}}</td>
          </tr>
        </table>
      </div>
    </div>
    <TimeSelector :deviceInfo="deviceInfo"></TimeSelector>
  </div>
</template>

<script>
import TimeSelector from '@/components/TimeSelector.vue'
export default {
  name:"Order",
  props:{
    deviceInfo:Object
  },
  components:{
    TimeSelector
  }
}
</script>

<style>
#order{
  margin-top:5px;
}
#order .basic-info{
  height:150px;
  border:1px solid lightgray;
}
#order .img-info,#order .text-info{
  float:left;
  height: 100%;
}
#order .img-info{
  width:15vw;
  height:15vw;
  max-width: 150px;
  max-height: 150px;
  /* border: 1px solid black; */
}
#order .img-info img{
  width: 100%;
  height: 100%;
}
#order .text-info{
  width:80%;
  text-align: start;
  padding-left:10px;
}
table{
  width:100%;
  height:100%;
}
td{
  width:50%;
}
tr{
  height:25%;
}
@media screen and (max-width:1000px){
  #order .nav-row{
    width:100%;
  }
}

</style>
