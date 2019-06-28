<template>
  <div class="login">
    <my-alert klass="alert-width" @closeAction="goback">
      <template v-slot:alert-title>
        <div class="select-identity">
          <ul>
            <li v-for="option in options" :class="{actived:loginData.selected==option.value}" :key="option.value" v-on:click="loginData.selected=option.value">{{option.text}}</li>
          </ul>
        </div>
      </template>
      <template v-slot:alert-body>
        <form class="login-form">
          <div class="yellow">欢迎使用预约系统登录</div>
          <div v-show="loginError" class="warn">登录失败</div>
          <!-- 用户名 -->
          <div class="text-and-input">
            <span class="item-name">用户名：</span>
            <input type="text" v-model.trim="loginData.userName" placeholder="请输入用户名">
            <span :class="{warn:!isUserNameCorrect,correct:isUserNameCorrect}">{{validateUserName}}</span>
          </div>
          <!-- 密码 -->
          <div class="text-and-input">
            <span class="item-name">密码：</span>
            <input type="password" v-model.trim="loginData.password_1" placeholder="请输入密码">
            <span :class="{warn:!isPassword1Correct,correct:isUserNameCorrect}">{{validatePassword1}}</span>
          </div>
          <!-- 双密码 -->
          <div class="text-and-input" v-if="loginData.selected=='systemAdmin'">
            <span class="item-name">密码2：</span>
            <input type="password" v-model.trim="loginData.password_2" placeholder="请输入密码2">
            <span :class="{warn:!isPassword2Correct,correct:isUserNameCorrect}">{{validatePassword2}}</span>
          </div>
          <!-- 验证码 -->
          <div class="text-and-input">
            <span class="item-name">验证码：</span>
            <div class="validation">
              <input type="text" placeholder="请输入验证码">
              <span class="validation-image">1678</span>
            </div>
          </div>
          <div class="btn-area">
            <div class="inline-block">
              <input type="button" value="登录" @click="sendLoginRequire">
              <input type="button" value="注册" @click="gotoRegister">
            </div>
          </div>
        </form>
      </template>
    </my-alert>
  </div>
</template>

<script>
  import MyAlert from '@/components/MyAlert.vue'
  export default{
    name:"Login",
    data(){
      return{
        options:[
          {text:"用户登录",value:"user"},
          {text:"管理员登录",value:"admin"},
          {text:"系统管理员登录",value:"systemAdmin"}
          ],
        loginData:{
          selected:"user",
          password_1:"",
          userName:"",
          password_2:"",
        },
        isUserNameCorrect:true,
        isPassword1Correct:true,
        isPassword2Correct:true,
        selectidentity:'select-identity',
        loginError:false
      }
    },
    components:{
      MyAlert
    },
    computed:{
      validateUserName(){
        // var regex=new RegExp("[^[0-9][a-z][A-Z]]");
        // // var regex=new RegExp("([0-9]|[a-z]|[A-Z])+");
        // var str="";
        // if(this.userName!=""){
        //   if(!this.userName.match(/[^[0-9][a-z][A-Z]]/)){
        //     if(this.userName.length==16){
        //       str="格式正确";
        //       this.isUserNameCorrect=true;
        //     }
        //     else{
        //       str="需是16位用户名";
        //       this.isUserNameCorrect=false;
        //     }
        //   }
        //   else{
        //     str="存在非法字符";
        //     this.isUserNameCorrect=false;
        //   }
        // }
        // return str;
        return "Hello"
      },
      validatePassword1(){
        return "Hello"
      },
      validatePassword2(){
        return "Hello"
      }
    },
    methods:{
      sendLoginRequire(){
        // e.stopPropagation();
        this.axios({
          method:"post",
          url:"/user/login",
          // contentType:"application/json;charset=UTF-8",
          // dataType:"json",
          data:JSON.stringify({
            uIdentity:this.loginData.selected,
            uId:this.loginData.userName,
            uPassword:this.loginData.password_1,
            uPassword2:this.loginData.password_2
          }),
          headers:{
            "Content-Type":"application/json;charset=UTF-8"
          }
        }).then(res=>{
          // alert(res.data.msg)
          if(0==res.data.code){//登录失败
            this.loginError=true
          }
          else{//登录成功
            this.loginError=false
            this.loginAndSaveState(res.data.list)
            this.$router.go(-1);
            // this.$root.state.loginState=true
          }
        }).catch(error=>{
          alert(error)
          // this.loginError=true
          // this.$router.push({name:"user"});
        })
      },
      gotoRegister(){
        this.$router.push({name:"register"});
      },
      loginAndSaveState(projects){
        this.$root.state.loginState=true;
        //把与用户相关的信息保存起来
        sessionStorage.setItem("uIdentity",this.loginData.selected);
        sessionStorage.setItem("uId",this.loginData.userName);
        sessionStorage.setItem("uPassword",this.loginData.password_1);
        sessionStorage.setItem("uPassword2",this.loginData.password_2);
        //项目信息
        if(typeof(projects)!="undefined"){
          sessionStorage.setItem("projects",JSON.stringify(projects));
          console.log('projects:',JSON.stringify(projects))
        }
        sessionStorage.setItem("isLogin",this.$root.state.loginState);
      },
      goback(){
        this.$router.push({name:"home"});
      }
    }
  }
</script>
<style>
.alert-width{
  width:600px;
}
.select-identity{
  height:48px;
}
.select-identity ul{
  height:100%;
  padding: 0;
  display: block;
  margin:auto;
  list-style-type: none;
  background: #f7f7f7;
  color:#ababab;
  border-top-left-radius:10px; 
  border-top-right-radius: 10px;
}
.select-identity ul li{
  float: left;
  width: 33.33%;
  display: block;
  text-align: center;
  cursor: pointer;
  margin:auto;
  height:100%;
  line-height: 48px;
  border-top-left-radius:10px; 
  border-top-right-radius: 10px;
}
.select-identity ul li.actived{
  background: white;
  color:#666;
}
.select-identity::before,.select-identity::after{
  content: " ";
  display: table;
}
.select-identity::after{
  clear: both;
}
.login{
  margin:0;
  text-align: left;
}
.login-form{
  display: table;
  vertical-align:middle;
  /* width:fit-content; */
  margin:0 auto;
  padding: 20px;
}
.correct{
  color:greenyellow;
}
.warn{
  color:red;
}
.text-and-input{
  margin-bottom: 10px;
  font-size: 14px;
}
.text-and-input span.item-name{
  display:inline-block;
  width:80px;
}
.text-and-input .validation{
  display: inline-block;
  width:254px;
  height:36px;
  line-height: 30px;
  margin-right:10px;
}

.text-and-input input{
  width:250px;
  height:30px;
  line-height: 30px;
  margin-right:10px;
}
.text-and-input .validation input{
  width: 70%;
  margin:0;
}
.text-and-input .validation span.validation-image{
  width:25%;
  border:1px solid black;
  margin-left:10px;
  padding: 8px;
}
.btn-area{
  display: flex;
}
.btn-area input{
  margin:0 20px;
  border:0;
  border-radius: 5px;
  width:108px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  color:white;
  background: rgb(206, 7, 7);
  cursor: pointer;
}
.btn-area .inline-block{
  display: inline-block;
  margin: 0 auto
}
.yellow{
  color:orange;
  text-align: center;
  padding-bottom:20px;
  font-size:15px; 
}
</style>
