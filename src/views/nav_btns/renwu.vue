<template>
  <div id="renwu">
    <h1>管理员任务页面</h1>
<template>
  <el-table
    :data="listData"
    style="width: 100%;margin:100px auto;">
     <el-table-column
      label="ID"
      prop="id">
    </el-table-column>
    
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
    <!-- 添加 -->
    <el-table-column align="right">
       <template slot="header" slot-scope="scope">
        <el-button size="mini" @click="jiaren">新增工作</el-button>
        <el-dialog
        :append-to-body="true"
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  >
<div > <p>负责人:</p>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in selet"
      :key="item.id"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
  </div>

 <div>  <p>情况:</p> <el-select v-model="val" placeholder="请选择">
    <el-option
      v-for="k in set"
      :key="k.id"
      :label="k.name"
      :value="k.name">
    </el-option>
  </el-select> </div>


 <div>  <p>分配内容:</p><el-input v-model="content" id="ip"></el-input> </div>


<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="jiaque">确 定</el-button>
  </span>
</el-dialog>
      </template>
       <!-- 查看 -->
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="cha(scope.$index, scope.row)"
          >查看</el-button>

<el-dialog
  title="任务 详情"
  :visible.sync="dialogVisi"
  width="60%"
  append-to-body
  
  >
  <h3>{{ig.type}}</h3>
  <ul>
    <li v-html="ig.content"></li>
    <li>{{ig.status}}</li>
  </ul>

<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisi = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisi = false">确 定</el-button>
  </span>
</el-dialog>





      <!-- 分配 -->
     
        <el-button
          size="mini"
          @click="fen(scope.$index, scope.row)"
          style="margin-right:10px;"
          >分配</el-button>
          <!-- 删除 -->

<el-popconfirm
  title="这是一段内容确定删除吗？"
   @confirm="dele(scope.$index, scope.row)"
>
  <el-button
        slot="reference"
          size="mini"
          type="danger"
          
         >删除</el-button>
</el-popconfirm>
  
        
      </template>
    </el-table-column>
  </el-table>
</template>


</div>
</template>

<script>
export default {
name:'renwu',
data() {
    return {
        listData:[],
          dialogVisible: false,
          username:'',
          content:'',
          tid:0,
          selet:[],
          value:'',
          label:'',
          usname:'',//添加
          set:[{
            id:1,name:'紧急'
          },
          {id:2,name:'常规'},
          {id:3,name:'长期'}],
            val:'',
         
     dialogVisi:  false,
        ig:[],
    };
},
mounted(){
    this.alltask()
},
methods:{
 
    // 所有任务
  async alltask(){
    const axios = require('axios');
    await axios.get('workdesk/alltask').then(res=>{this.listData=res.data.data;})
  },
//   删除任务
 async dele(index,row){
 const axios = require('axios');
 const tkid = sessionStorage.getItem('token')
    await axios.post('workdesk/poptask',{tid:row.id,uid:tkid}).then(res=>{this.$message.success(res.data.msg)})
    this.timer()
  },
// 添加任务
jiaren(){
    this.dialogVisible=true;
        const axios = require('axios');
         axios.get('user/processUser').then(res=>{this.selet=res.data.data;})
   
},
// 确定添加任务
async jiaque(){
     this.dialogVisible=false;
     const axios = require('axios');
    await axios.post('workdesk/addtask',{username:this.value,type:this.val,content:this.content}).then(res=>{this.$message.success(res.data.msg);})
    this.timer()
},

// 分配任务
async fen(index,row){
     const axios = require('axios');
     const tkna = sessionStorage.getItem('token_name')
    await axios.post('workdesk/assign',{tid:row.id,username:row.username}).then(res=>{this.$message.success(res.data.msg);})
   
},
// 查看任务
async cha(index,row){
 this.dialogVisi = true
    const axios = require('axios');
    await axios.post('workdesk/viewWork',{id:row.id}).then(res=>{this.ig=res.data.data[0]})

     
},

// 延迟刷新 
timer(){
  setTimeout(()=>{location.reload()},600)
}

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