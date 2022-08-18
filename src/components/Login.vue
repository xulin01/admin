<template>
    <div id="login" @keydown="ky" @click.once="m">
    <video src="@/assets/jks.mp4" autoplay muted  loop ></video>
        <div id="logg">
            <el-input v-model.lazy="input" placeholder="请输入账号" ref="inp"></el-input>
            <el-input placeholder="请输入密码" v-model.lazy="psw" show-password></el-input>
           <div class="btn">
             <el-button type="success" plain @click="login">登录</el-button>
            <el-button plain @click="dle">重置</el-button>
           </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            input: '',
            psw: '',
            pid: 0,
            uname: '',
           
        }
    },
  
    mounted(){
          
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        })
    },
 
    methods: {
        m(){
            this.log()
        },
        login() {
            this.loin()
        },
        ky(e) {
            if (e.key == 'Enter') {
                this.login()
            }
        },
        log() {
            let le = document.querySelector('#logg')
            let a = 0;
            le.style.display = 'block';
            this.$refs.inp.focus()
            let set = setInterval(function () {
                a += 0.2
                le.style.opacity = a;
                if (a >= 1) {
                    a = 1;
                    clearInterval(set)

                }
            }, 100)
        },
        async loin() {
            const axios = require('axios');
            const { data: res } = await axios.post('http://8.144.8.236:8056/user/login',{ username: this.input, password: this.psw })
            if (res.code === 200) {
                 this.$message.success(res.message)
                this.pid = res.data[0].rid
                this.uname = res.data[0].username;
                const token = sessionStorage.setItem('token', this.pid)
                const token_name = sessionStorage.setItem('token_name', this.uname)
                const token_uid = sessionStorage.setItem('token_uid', res.data[0].id)
                if (res.data[0].rid == 1) {
                    this.$router.replace('/tic')
                } else if (res.data[0].rid == 2) {
                    this.$router.replace('/fan')
                } else if (res.data[0].rid == 3) {
                    this.$router.replace('/dong')
                } else {
                    this.$message.error('用户名或密码错误')
                }
            } else {
                this.$message.error(res.message)
                this.input = '';
                this.psw = ''
                this.$refs.inp.focus()
            }
        },
        dle(){
            this.input=''
            this.psw=''
        }
    }

}

</script>

<style  lang="less">

#login {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left:0;
    background-repeat: no-repeat;
    object-fit: cover;
    display: flex;
    justify-content: center;
    video{
        width: 100%;
        height: 100%;
       object-fit: cover;
    }
    #logg {
        width: 400px;
        position: absolute;
        top: 30%;
        opacity: 0;
        display:none;
        background-color: rgba(255,255,255,0.5);
        padding: 20px 10px;
        border-radius: 10px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

        .el-input {
          
            display: block;
            margin-top: 20px;
            outline:none;
            background-color: transparent;
        }
         .btn{
            display: flex;
            justify-content: center;
         }
        .el-button {
            margin-top: 30px;
            margin-right: 30px;
        }
    }
}
::-webkit-scrollbar{
  display: none;
}
</style>