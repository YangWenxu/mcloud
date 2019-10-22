<template>
    <div class="main">
        <!-- <form action="#" method="post">
             <router-link :to="{ path: 'login' }">用户登录</router-link>
             <router-link :to="{ path: 'admin' }">管理员登录</router-link>
            <p>用户: <input type="text" v-model = "name" id="name" required="required" maxlength="10" /> </p><br>
            <p>密码: <input type="password" v-model = "pwd" id="pwd" required="required" maxlength="11" /> </p> <br>
            <input type="button" value="登录" @click = 'loginHandle'/>
        </form> -->
            <form class="login-form" method="post" action="#" >
                <div class="nav">
                  <router-link :to="{ path: 'login' }" class="zz">用户登录</router-link>
                  <router-link :to="{ path: 'admin' }" class="zz">管理员登录</router-link>
                </div>
                <div class="input-content">
                    <div>
                        <input type="text" autocomplete="off"
                               placeholder="adminId" v-model="name" id="name" required="required" maxlength="10"/>
                    </div>

                    <div style="margin-top: 16px">
                        <input type="password"
                               autocomplete="off" placeholder="登录密码" v-model="pwd" id="pwd" required="required" maxlength="32"/>
                    </div>
                </div>

                <div style="text-align: center">
  <!--                <input class="enter-btn" type="button" value="登录" @click = 'loginHandle'/> -->
                    <button type="submit" class="enter-btn" @click = 'loginHandle'>登录</button>
                </div>

            </form>
    </div>
</template>

<script>
  // history.pushState(null, null, document.URL);
  // window.addEventListener('popstate', function() {
  //   history.pushState(null, null, document.URL);
  // });

export default {

    data () {
        return {
            name: "",
            pwd: "",
        }

    },
    methods: {
        check() {

        },

        loginHandle() {
            // this.$http.post('http://localhost:8080/#/login', {
            //     Rname: '',
            //     Rpwd: '',
            // }).then(res => {
            //     Rname = res.data.name;
            //     Rpwd = res.data.pwd;
            // })
            
            localStorage.setItem('user',{name: this.name, pwd: this.pwd});

            var userName = document.getElementById("name");
            var userPwd = document.getElementById("pwd");
            if(userName.value=="") {
                alert("没有输入用户名！");
                return false;
            } else if(userPwd.value=="") {
                alert("没有输入密码！");
                return false;
            } else if(userName.value == 123456 && userPwd.value == 123456) {
                alert("登录成功！")
                this.$router.push({name: 'machineList',})
            } else {
                alert("你还不是管理员");
                return false;
            }
             
           
        }
    },
};



</script>
<style lang="css" scoped>
    body{
        background: #353f42;
    }

    *{
        padding: 0;
        margin: 0;
    }

    .main {
        margin: 0 auto;
        padding-left: 25px;
        padding-right: 25px;
        padding-top: 15px;
        width: 350px;
        height: 350px;
        background: #FFFFFF;
        /*以下css用于让登录表单垂直居中在界面,可删除*/
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -175px;
        margin-left: -175px;
    }

    .nav {
      margin-bottom: 30px;
    }

    .zz {
      text-decoration: none;
      color: #0bc5de;
      /* margin-bottom: 20px; */
    }

    .input-content {
        width: 100%;
        height: 120px;
    }

    .input-content input {
        width: 330px;
        height: 40px;
        border: 1px solid #dad9d6;
        background: #ffffff;
        padding-left: 10px;
        padding-right: 10px;
    }

    .enter-btn {
        width: 350px;
        height: 40px;
        color: #fff;
        background: #0bc5de;
        line-height: 40px;
        text-align: center;
        border: 0px;
    }

/*
    .enter-btn:hover {
        cursor:pointer;
        background: #1db5c9;
    } */

</style>
