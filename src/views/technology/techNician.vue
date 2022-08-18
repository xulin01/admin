<template>
  <div class="box">
    <div class="inmarg">
      <!-- 搜索组件 -->
      <Input @fun="searchData" :listData="listData"></Input>
    </div>
    
    <!-- 项目列表 -->
    <el-table :data="list" border style="width:'1200px'"
    :row-class-name="tableRowClassName" @row-click="row_click">
      <el-table-column prop="tradceing" label="单号" width="120">
     </el-table-column>
      <el-table-column label="开始日期" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.startTime">{{ scope.row.startTime }} </span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="结束日期" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.endTime">{{ scope.row.endTime }}</span>
          <span v-else> --</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名" width="120">
      </el-table-column>
      <el-table-column prop="classify" label="分类" width="120">
      </el-table-column>
      <el-table-column  label="客户分层" width="120">    
        <template slot-scope="scope">
          <el-input v-model="scope.row.degree" disabled placeholder="请选择"></el-input>
         <!-- <el-select v-model="scope.row.degree" disabled placeholder="请选择"> -->
    <!-- <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option> -->
  <!-- </el-select> -->
        </template>
      </el-table-column>
      <el-table-column prop="username" label="负责人" width="120">
      </el-table-column>
      <el-table-column prop="company" label="公司名称" width="120">
      </el-table-column>
      <el-table-column prop="status" label="当前状态" width="120">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button type="text" @click="getReject($event, scope.row)"> 开始项目</el-button>
          <el-button type="text" @click="popButton($event, scope.row)">日志管理</el-button>
          <el-button type="text" @click="getSucceesd($event, scope.row)">完成项目</el-button>
        </template>
      </el-table-column>
      <!-- 完成弹出   -->
      <el-dialog title="开始项目" width="30%" :visible.sync="centerDialogVisible"  :append-to-body="true" center>
        <span>
          是否完成该项目
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="affirm"> 确 定</el-button>
        </span>
      </el-dialog>
    </el-table>
    <!-- 日志弹出 -->
    <el-dialog title="项目信息" :visible.sync="isPopBox" :append-to-body="true" center :fullscreen="true" @close="close">
      <span>
        <p>项目进度</p>
        <div class="block">
          <el-timeline v-for="(item, i) in popData" :key="i" placement="top">
            <el-timeline-item v-if="item.content">
              <el-card>
                <h4>{{ item.content }}</h4>
                <p>提交于{{ item.createtime }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
        <el-timeline>
          <div class="inputBox">
            <div style="margin: 20px 0;"></div>
            <el-input type="textarea" placeholder="请输入日志内容" v-model="textarea" maxlength="50" show-word-limit>
            </el-input>
          </div>
        </el-timeline>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isPop">提交</el-button>
        <el-button type="danger" @click="isPopBox = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 开始项目 -->
    <el-dialog title="项目开始" :visible.sync="isrejectShow" width="30%" center>
      <span>是否开始当前项目</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="callBtn">取 消</el-button>
        <el-button type="primary" @click="rejectBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getPop,
  getAddData,
  getItemData,
  getTechSuccess,
  judgeProject,
  AddProjectLog,
  viewProcess,
   matterproject
} from "@/api/request.js";

import Input from '@/components/inputBox.vue'
export default {
  name: "listDate",
  components: { Input },
  data() {
    return {
      value: "",//负责人数据
      textarea: "", //添加日志
      proGressList: [],//项目进度列表
      centerDialogVisible: false,
      isPopBox: false,
      isrejectShow: false,
      popData: [], //项目日志
      listData: [], //数据信息
      list:[],
      nameData: [], //负责人信息
      // AllClassify: [], //分类状态信息
      reject: { //  开始id
        pid: "",
      },
      logData: {//添加日志数据
        pid: '',
        content: ''
      },
      successData: {
        pid: ''
      }
    };
  },
  computed: {},
  watch: {},
  beforeMount() {
    // 获取列表信息
    this.getList();
  },
  methods: {
    // 超时显示
    tableRowClassName({row,rowIndex}){
      if(row.status=='超时'){
        return 'box-error'
      }else if(row.status=='暂停中'){
        return "box-info"
      }else{
        return 'black'
      }
    },
    // 点击跳转页面
    row_click(row) {
    
      const feedbackData = JSON.stringify({
        id: row.id,
        username: row.username
      })
      sessionStorage.setItem('id', JSON.stringify({ projectname: row.name }))
      this.getViewProcess(row.name, feedbackData, JSON.parse(sessionStorage.getItem('id')))
   
    },
    // 日志页面关闭回调
    close() {
      this.textarea = ''
    },
    // 获取列表信息
    async getList() {
      const { data: res } = await getItemData({ uid: sessionStorage.getItem('token_uid') });
      if (res.code === 200) {
        this.listData = res.data;
        this.list=res.data
      }
    },
     // 问题项目
    async getmatterproject(){
      let uid=sessionStorage.getItem('token_uid')
  const {data:res}=await matterproject({uid:uid})
      if(res.code===200){
        this.list=res.data
      }
    },
    //  日志请求
    async getqwe(id) {
      const { data: res } = await getPop(id)
      if (res.code === 200) {
        this.popData = res.data;
      }
    },
    async postLogData(data) {
      const { data: res } = await AddProjectLog(data)
      // 
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: res.msg
        })
        
        this.getqwe({ pid: this.logData.pid })
      } else {
        this.$message.error(res.msg)
      }
    },
    //  储存开始项目id
    getReject(e, row) {
      e.stopPropagation()
      this.isrejectShow = true;
      this.reject.pid = row.id;
    },
    // 确认发送开始项目请求
    async rejectBtn() {
      const res = await getTechSuccess(this.reject);
      if (res.data.code === 200) {
         
        this.isrejectShow = false;
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.getList();
      } else {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      }
    },
    // 项目完成请求，点开
    async getSucceesd(e, row) {
      e.stopPropagation()
      this.centerDialogVisible = true
     
      this.successData.pid = row.id
    },
    callBtn() {
      this.isrejectShow = false;
    },
    // 完成项目,确认
    async affirm() {
      this.centerDialogVisible = false;
       
      const { data: res } = await judgeProject(this.successData);
       
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: res.msg,
        });
         this.getList()
      } else {
        this.$message({
          type: "error",
          message: res.msg,
        });
      }
    },
    //  查看进度
    async getViewProcess(name, feedbackData, data) {
      const { data: res } = await viewProcess(data)
       
      if (res.code === 200) {
        this.proGressList = res.data
        this.$router.push({
          name: 'det',
          query: {
            name: name,
            feedbackData: feedbackData
          }
        })
      } else {
        this.$message.error(res.msg)
      }
    },
    // 查看项目日志
    popButton(e, row) {
      e.stopPropagation()
      this.isPopBox = true;
      let id = { pid: row.id + "" };
      this.logData.pid = row.id + ''
      this.getqwe(id)
    },
    isPop() {
      this.logData.content = this.textarea
      this.postLogData(this.logData)
    },
    // 添加项目
    async getAddData(data) {
      const { data: res } = await getAddData(data);
      if (res.code === 200) {
        this.getList();
        this.$message({
          message: res.msg,
          type: "success",
        });
      } else {
        this.$message.error(res.code);
      }
    },
    searchData(data){
      if(data){
         this.list=data  
      }else{
          this.list=this.listData
      }
    },
  },
  mounted() { 
    history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        })
  },
};
</script> 

<style  lang="scss">
// .box {
//   width: 1202px;
//   margin: 50px auto;
// }

.popup-box {
  display: inline-block;
  margin: 0 10px;
}

.inputBox {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-content: center;
}
.inmarg{
  margin: 20px 0;
}
  .el-table .box-error{
  // background:#F56C6C!important;
  color: #EE0000;
 }
  .el-table .box-info{
 color:#E6A23C;
 }
 .el-table .black{
  color:#303133;
 }
 ::-webkit-scrollbar{
  display: none;
}
</style>