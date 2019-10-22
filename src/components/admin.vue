<template>
    <div>
        <form action="#" method="post">
             <router-link :to="{ path: 'login' }">用户登录</router-link>   
             <router-link :to="{ path: 'admin' }">管理员登录</router-link>
            <p>管理员: <input type="text" v-model = "name" id="name" required="required" maxlength="10" /> </p><br>
            <p>密码: <input type="password" v-model = "pwd" id="pwd" required="required" maxlength="11" /> </p> <br>
            <input type="button" value="登录" @click = 'loginHandle'/>
        </form>
    </div>
</template>
<script>

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