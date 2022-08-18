<template>
    <div id="back">
        <el-row class="block-col-2">
            <el-col :span="10">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">

                        <div>
                            <!-- <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"> -->
                              
                            <!-- </el-avatar> -->
                            <img :src="require('@/assets/' + htp)" alt="">
                        </div>
                    </span>
                    <p>{{ username }}</p>
                   
                    <el-dropdown-menu slot="dropdown">
                     
                        <span @click="xiu" id="sp">
                           <el-dropdown-item icon="el-icon-s-promotion"> <el-button @click="dialogVisible = true">修改密码</el-button> </el-dropdown-item>

                        </span>

                           <span @click="tt"  >
                            <el-dropdown-item icon="el-icon-s-promotion"> 退出登录 </el-dropdown-item>
                        </span>


                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
<!-- 修改密码 -->
<el-dialog
:append-to-body="true"
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-input v-model="input" placeholder="请输入新密码 "></el-input>


  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="queding">确 定</el-button>
  </span>
</el-dialog>


    </div>
</template>

<script>

export default {
    data() {
        return {
            username: '',
           htp:'guanli.png',
           psw:'',
          dialogVisible: false,
          input:'',
        }
    },
    methods: {
        // 修改密码
       async gai(){
            const axios = require('axios');
            const tuid=sessionStorage.getItem('token_uid')
           await axios.post('user/changepassword ',{uid:tuid,password:this.input}).then(res=>{this.$message.success(res.data.msg);console.log(res.data);})
        },
        tt() {
            sessionStorage.clear();
            this.$router.replace('/')
        },
        xiu(){
          
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      queding(){
        this.dialogVisible = false;
        this.gai();
      }
    
    
    },

    mounted() {
         const tk = sessionStorage.getItem('token')
         const tkna=sessionStorage.getItem('token_name')
         this.username = tkna
        if(tk == 1){
            this.htp = 'guanli.png'
        }else if(tk ==2){
             this.htp = 'jishu.png'
        }else{
             this.htp = 'kefu.png'
        }

    }

}
</script>

<style scoped>
#back {
    width: 50px;
    position: fixed;
    top: 16px;
    right: 122px;
   z-index:999;
}
 img{
        width: 30px;
        height: 30px;
        cursor:pointer;

    }

p {
    text-align: center;
}
#sp .el-button{
    color:#606266 ;
    border:0;
    background: none;
    width: 10px;
    padding:0;
}
/deep/ .el-dialog{
    z-index:99999;
}

</style>