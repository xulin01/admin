<template>
  <div id="jk">
    <h1>技术/客服任务页面</h1>
    <template>
  <el-table
    :data="list"
    style="width: 75%;margin:100px auto;">
     <el-table-column
      label="ID"
      prop="id">
    </el-table-column>
    <!-- <el-table-column
      label="任务内容"
      prop="content">
    </el-table-column> -->
    <el-table-column
      label="开始时间"
      prop="createtime">
    </el-table-column>
    <el-table-column
      label="结束时间"
      prop="endTime">
    </el-table-column>
    <el-table-column
      label="负责人"
      prop="username">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status">
    </el-table-column>


     


<!-- 操作  -->
 <el-table-column label="操作">
  <!-- 查看 -->
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="cha(scope.$index, scope.row)"
          >查看</el-button>


    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="60%"
 >
  <h3>{{ig.type}}</h3>
  <ul>
    <li v-html="ig.content"></li>
    <li>{{ig.status}}</li>
  </ul>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>


        <el-button
          size="mini"
          @click="wancheng(scope.$index, scope.row)">完成</el-button>
        
      </template>
    </el-table-column>



    
    </el-table>
    </template>
  </div>
</template>

<script>

import {viewtask}from '@/api/request'
export default {
name:'jk',
data() {
    return {
        list:[],
         dialogVisible: false,
         ig:[]
    };
},
mounted(){
  this.getviewtask()
},
methods:{
 async getviewtask(){
  let uid=sessionStorage.getItem('token_uid')
 const {data:res} = await viewtask({uid:uid})
 if(res.code===200){
  this.list=res.data
 }
 },
    wancheng(index,row){
      const axios = require('axios');
    axios.post('workdesk/finish',{tid:row.id})
    .then(res=>{
      this.getviewtask()
      this.$message.success(res.data.msg)})
    setTimeout(function(){
        location.reload()
    },600)
},

// 查看任务
async cha(index,row){
  // this.dialogVi=true;
    const axios = require('axios');
    await axios.post('workdesk/viewWork',{id:row.id}).then(res=>{this.ig=res.data.data[0]})

     this.dialogVisible = true
},

}
}
</script>

<style scoped>
.el-dialog h3{
  width: 100%;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  margin-bottom:30px;
}
.el-dialog ul{
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-around;
}
.el-dialog ul li{
  width: 500px;

}
/deep/.el-dialog ul li img{
  width: 500px;
}
</style>