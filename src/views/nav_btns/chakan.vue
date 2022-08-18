<template>
  <div id="all">
    <h1>管理员用户页面 </h1>
    <div id="xz">
     <el-button plain @click="register">注册用户</el-button>
     </div>
    <el-col :span="8" v-for="item in list" :key="item.id">
    <el-card shadow="hover">
        <ul>
            <li> 名称:{{item.name}}</li>
            <li> ID:{{item.id}}</li>
            <li> <el-button type="text"></el-button> </li>
            <li>
<el-popconfirm
  title="确定删除该用户吗？"
  @confirm="dele(item)"
>
  <el-button slot="reference">删除</el-button>
</el-popconfirm>
</li>
        </ul>
      
    </el-card>
  </el-col>
  
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
 
 <!-- 表单 -->
<el-input v-model="na" placeholder="请输入用户名"></el-input> 
<el-input v-model="pw" show-password placeholder="请输入密码"></el-input> 

 <el-select v-model="value" placeholder="请选择">
    <el-option
    
      v-for="item in selet"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="que">确 定</el-button>
  </span>
</el-dialog>


  </div>
</template>

<script>
export default {
    name:'chakan',
    data() {
        return {
            list:[],
            selet:[],
             dialogVisible:false,
            username:'',
            password:'',
           
        value: '',
        na:'',
        pw:'',
        };
    },
    mounted(){
        
        this.processUser()
    },
methods:{
    // 除管理员外所有角色GET请求
    role(){
        const axios = require('axios');
         axios.get('user/role').then(res=>{this.selet=res.data.data;})
    },


    // 查看所有角色,除管理员外GET请求  可以分配的人员 
   processUser(){
        const axios = require('axios');
         axios.get('user/processUser').then(res=>{this.list=res.data.data;})
         
    },

    //  删除用户
async dele(item){
      const axios =require('axios');
        await axios.post('user/deleteuser',{uid:item.id}).then(res=>{this.$message.success(res.data.msg);})
        this.timer()
},

//  新增用户弹窗
register(){
    this.dialogVisible = true;
    this.role()
},
// 注册用户接口
 async user(){
    const axios = require('axios');
    await axios.post('user/register',{username:this.na,password:this.pw,rid:this.value}).then(res=>{this.$message.success(res.data.message);})
},
// 账号密码验证
que(){
this.dialogVisible = false;
if(this.na !== '' && this.pw!==''){
    this.user()
    this.timer()
}else{
    this.$message.error('请输入用户名和密码')
}
},




 handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    
// 延迟刷新 
timer(){
  setTimeout(()=>{location.reload()},600)
}



}
}
</script>

<style scoped>
#xz{
    width: 100%;
    text-align: center;
}
.el-card{
    margin: 50px 0 0 50px;
}
.el-card ul{
    display: flex;
    justify-content:space-around;
    list-style: none;
}
.el-dialog .el-input{
    margin-bottom:10px;
}
</style>