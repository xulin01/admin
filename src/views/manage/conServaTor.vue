<template>
  <div class="box">
    <div class="inmarg">

  <!-- 搜索组件 -->
 <Input @fun="searchData" :listData="listData" ></Input>
    </div>
  
    <!-- 项目列表 -->
    <el-table :data="list" border @row-click="row_click" style="width:100%"
     :row-class-name="tableRowClassName">
     <el-table-column prop="tradceing" label="单号" width="180">
     </el-table-column>
      <el-table-column label="开始日期" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.startTime">{{ scope.row.startTime }} </span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="结束日期" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.endTime">{{ scope.row.endTime }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名" width="150">
      </el-table-column>
      <el-table-column prop="classify" label="分类" width="150">
      </el-table-column>

       <el-table-column  label="客户分层" width="150">    
        <template slot-scope="scope">
         <el-select v-model="scope.row.degree" placeholder="请选择" @change="change(scope.row)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </template>
      </el-table-column>

      <el-table-column prop="username" label="负责人" width="150">
      </el-table-column>
      <el-table-column prop="company" label="公司名称" width="150">
      </el-table-column>
      <el-table-column prop="status" label="当前状态" width="150">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column prop="count" label="操作" width="500">
        <template slot-scope="scope">
          <div  id="btn_box">
            <el-button type="text" @click="popButton($event, scope.row)">工单添加</el-button>
            <el-button type="text" @click="distribution($event, scope.$index)">分配项目</el-button>
            <el-button type="text" @click="getSucceesd($event, scope.row)">完成项目</el-button>
            <el-button type="text" @click="getReject($event, scope.row)"> 驳回</el-button>
            <el-button style="position:relative" type="text" @click="btn1($event, scope.row)">
              <span v-show="scope.row.count" id="icon_num">{{ scope.row.count }}</span>
              反馈
            </el-button>
            <el-button type="text" ref="asd" @click="suspend($event, scope.row,scope.$index,)">{{testData[scope.$index]}}</el-button>
            
          </div>
        </template>
      </el-table-column>
    
    </el-table>
   
    <!-- 查看弹出 -->
    <!-- <el-dialog title="项目信息" :visible.sync="isPopBox" :append-to-body="true" center :fullscreen="true">
      <span>
        <p>项目进度</p>
        <div class="block">
          <el-timeline>
            <el-timeline-item v-for="(item, i) in popData" :key="i" :timestamp="item.createtime" placement="top">
              <el-card>
                <h4>{{ item.content }}</h4>
                <p>提交于{{ item.createtime }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isPop"> 确 定</el-button>
      </span>
    </el-dialog> -->
      <!-- 分配弹出   -->
      <el-dialog title="提示" :visible.sync="centerDialogVisible1" width="分配项目" :append-to-body="true" center>
        <span>
          <p>负责人：</p>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in nameData" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="affirm"> 确 定</el-button>
        </span>
      </el-dialog>
    <!-- 驳回弹出 -->
    <el-dialog title="提示" :visible.sync="isrejectShow" width="30%" center>
      <span>是否将当前项目驳回</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isrejectShow = false">取 消</el-button>
        <el-button type="primary" @click="rejectBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 反馈弹出 -->
    <el-dialog title="反馈" :visible.sync="centerDialogVisible" fullscreen center>
      <span>
        <el-col :span="24" body-style="{margin:'0 20px'}">
          <el-card shadow="always" v-for="(item, index) in feedbackList" :key="index">
            <div>
              <div>
                <p>时间 ：{{ item.createtime }}</p>
                <p>负责人：{{ item.accepter }}</p>
              </div>
              <div>
                内容： {{ item.content }}
              </div>
            </div>
          </el-card>
        </el-col>
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容"
          v-model="feedbackData.content">
        </el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="centerDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="affirm2">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 添加工单弹出 -->
    <el-dialog title="工单添加" :visible.sync="isWorkOrderShow" :append-to-body="true" :fullscreen="true" center>
      <span>
        <div class="inputBox">
          <el-input v-model="input" placeholder="请输入项目标题" style="width:200px"></el-input>
        </div>
        <tinymce v-model="temp.context" :height="400" @fun='getUrl' />
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isWorkOrderShow = false">关 闭</el-button>
        <el-button type="primary" @click="addWorkOrder">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  setData,
  getAddData,
  getItemData,
  getNameData,
  getAllClassify,
  getReject,
  getSucceed,
  viewProcess,
  addWorkOrder,
  Pause,
  Restart,
  updateDegree,
  matterproject
} from "@/api/request.js";
import { addfeedback, viewfeedback } from "@/api/detAils";
import addData from "@/components/addData.vue";

import Tic from "@/components/Tick/Tickets.vue";
import Input from '@/components/inputBox.vue'
import tinymce from '@/components/TinymceShop'
export default {
  name: "listDate",
  components: {
    addData, 
     Tic,
    Input,
    tinymce
  },
  data() {
    return {
      value: "",
      inputText:'',
      centerDialogVisible1: false,
      // isPopBox: false,//日志弹出
      centerDialogVisible: false,//反馈弹出
      isWorkOrderShow:false,//添加工单弹出
      popData: [], //项目进度
      postData: {
        //分配项目所需数据
        pid: "",
        username: "",
      },
      listData: [], //数据信息
      list:[],
      nameData: [], //负责人信息
      AllClassify: [], //分类状态信息
      isrejectShow: false,
      reject: { //  驳回id
        pid: "",
      },
      input:'',
       WorkOrderData: {//添加工单所需数据
        // tradceing: "", //项目单号
        title: "", //工单标题
        content: "", //工单内容
        company: "", //公司名
        creator:'',// 创建工单的人名
        // file: "", //上传的文件
      },
      feedbackList: [],//反馈列表
      feedbackData: {//反馈添加数据
        project_id: '',//项目id
        accepter: '',//项目负责人
        content: '',//反馈内容
        senter: ''//登录用户名
      },
      temp: {//富文本数据
        context: ''
      },
         options: [{
          value: 'A',
          label: 'A'
        }, {
          value: 'B',
          label: 'B'
        }, {
          value: 'C',
          label: 'C'
        }],
        testData:[]
    };
  },
  mounted() {
    this.getList();
    // 获取列表信息
    let id = sessionStorage.getItem('userId')
    //  获取负责人信息
    this.getName();
    // 获取所有分类
    this.getStor();
      history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        })
  },
  methods: {
    // 分层
    change(row){
    
     this.getupdateDegree({pid:row.id,degree:row.degree})
   
    },
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
    // 获取列表信息
    async getList() {
      const { data: res } = await getItemData({ uid: sessionStorage.getItem('token_uid') });
      if (res.code === 200) {
        this.listData = res.data;
        this.list=res.data
        this.testData=[]
        res.data.forEach(e => {
        this.testData.push(e.status)
        });
      }
      this.testData.forEach((e,i)=>{
        // debugger
          if(e =="暂停中" ){
            this.testData.splice(i,1,'重开项目')
          }else{
             this.testData.splice(i,1,'暂停项目')
          }
        })
    },
    // 问题项目
    async getmatterproject(){
      let uid=sessionStorage.getItem('token_uid')
  const {data:res}=await matterproject({uid:uid})
      console.log(res);
      if(res.code===200){
        this.list=res.data
      }
    },
    //  获取负责人信息
    async getName() {
      const { data: res } = await getNameData();
      if (res.code === 200) {
        this.nameData = res.data;
      }
    },
    // 获取所有分类
    async getStor() {
      const { data: res } = await getAllClassify();
      if (res.code === 200) {
        this.AllClassify = res.data;
      }
    },
    //  查看进度
    async getViewProcess(name, feedbackData, data) {
      const { data: res } = await viewProcess(data)
      if (res.code === 200) {
        this.proGressList = res.data
        this.$router.push({
          name: 'det1',
          query: {
            name: name,
            feedbackData: feedbackData
          }
        })
      } else {
        this.$message.error(res.msg)
      }
    },
      // 暂停项目
    async getPause(data){
      const {data:res}=await Pause(data)
        if(res.code===200){
           this.$message.success(res.msg)
      this.getList()
     }else{
       this.$message.error(res.msg)
     }
    },
    // 重启项目
    async getRestart(data){
     const {data:res}=await Restart(data)
     if(res.code===200){
       this.$message.success(res.msg)
      this.getList()
     }else{
       this.$message.error(res.msg)
     }
    },
     // 客户分层
    async getupdateDegree(data){
    const {data:res} = await updateDegree(data)

    if (res.code===200) {
       this.$message.success(res.msg)
    }else{
       this.$message.error(res.msg)
     }
    },
    //  储存驳回id
    getReject(e, row) {
      e.stopPropagation()
      this.isrejectShow = true;
      this.reject.pid = row.id;
    },
    // 确认发送驳回请求
    async rejectBtn() {
      const res = await getReject(this.reject);
      if (res.data.code === 200) {
        this.isrejectShow = false;
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.getList()
      } else {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      }
    },

    // 项目完成请求
    async getSucceesd(e, row) {
      e.stopPropagation()
      let data = { pid: row.id };
      const { data: res } = await getSucceed(data);
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: res.msg,
        });
        this.getList();
      } else {
        this.$message({
          type: "error",
          message: res.msg,
        });
      }
    },
    // 储存分配项目所需id
    distribution(e, i) {
      e.stopPropagation()
      this.centerDialogVisible1 = true;
      this.postData.pid = this.listData[i].id + "";
    },
    // 分配项目
    async affirm() {
      this.centerDialogVisible1 = false;
      this.postData.username = this.value;
      const { data: res } = await setData(this.postData)
      if (res.code === 200) {
        this.getList();
        this.$message({
          message: res.msg,
          type: 'success'
        });
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    // 查看反馈
    async getViewfeedback(data) {
      const { data: res } = await viewfeedback(data)
      if (res.code === 200) {
       
        this.feedbackList = res.data
      }
    },

    // 反馈添加
    async getAddfeedback(data) {
      const { data: res } = await addfeedback(data)
     
      if (res.code === 200) {
        this.getViewfeedback({
          project_id: this.feedbackData.project_id,
          rid: JSON.parse(sessionStorage.getItem('token'))
        })
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    // 添加项目
    async getAddData(data) {
      const { data: res } = await getAddData(data)
      if (res.code === 200) {
        this.getList();
        this.$message({
          message: res.msg,
          type: 'success'
        })
      } else {
        this.$message.error(res.msg)
      }
    },
    // 添加工单功能
    popButton(e, i) {
      e.stopPropagation()
       this.isWorkOrderShow = true
      this.WorkOrderData.company = i.company
      this.WorkOrderData.creator =sessionStorage.getItem('token_name')
    },
    isPop() {
      this.isPopBox = false;
    },
     // 确认添加工单
    addWorkOrder() {
      this.isWorkOrderShow = false
      this.WorkOrderData.content = this.temp.context
      this.WorkOrderData.title = this.input
      
      this.getAddWorkOrder(this.WorkOrderData)
    },
    // 添加工单
    async getAddWorkOrder(data) {
      const { data: res } = await addWorkOrder(data)
      if(res.code===200){
        this.$message.success(res.msg)
      }else{
         this.$message.error(res.msg)
      }
    },
    btn1(e, row) {
      e.stopPropagation()
      this.centerDialogVisible = true
      row.count = 0
      this.feedbackData.accepter = row.username
      this.feedbackData.project_id = row.id
      this.feedbackData.senter = sessionStorage.getItem('token_name')
      this.getViewfeedback({
        project_id: this.feedbackData.project_id,
        username: sessionStorage.getItem('token_name')
      })
    },
    // 添加反馈
    affirm2() {
      if (this.feedbackData.content == '') {
        this.$message.error('内容不能为空')
      } else {
       
        this.getAddfeedback(this.feedbackData)
      }
    },
    // 过滤
    searchData(data){
      if(data){
         this.list=data  
      }else{
          this.list=this.listData
      }
    },
    // 暂停
    suspend(e,row,i){
     e.stopPropagation()
      if(row.status ==='暂停中'){
        this.getRestart({pid:row.id})
       
      }else{
         this.getPause({pid:row.id})
      }
     
    },
     // 自定义事件接受参数
    getUrl(imgUrl) {
    },
    // original(){
    //   this.list=this.listData
    // }
  },
};
</script> 

<style   lang="scss">


 .el-table__header-wrapper table,.el-table__body-wrapper table{
    width: 100% !important;
  }

.el-table__body, .el-table__footer, .el-table__header{
    table-layout: auto;
  }


.popup-box {
  display: inline-block;
  margin: 0 10px;
}

// .el-table-column .cell {
//   overflow: none !important;
// }

#icon_num {
  position: absolute;
  top: -3px;
  right: -14px;
  background-color: #f56c6c;
  padding: 0 5px;
  height: 17px;
  border-radius: 15px;
  text-align: center;
  z-index: 10;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 17px;
}
#btn_box {
  position: absolute;
  bottom: 0;
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