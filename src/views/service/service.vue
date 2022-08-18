<template>
  <div class="box">
     <div class="inmarg">
  <!-- 搜索组件 -->
      <Input @fun="searchData" :listData="listData" ></Input>
     </div>
    <!-- 项目列表 -->
    <el-table :data="list" border style="width:100%"  
    :row-class-name="tableRowClassName" fit @row-click="row_click">
    <el-table-column prop="tradceing" label="单号" width="180"  :resizable="false">
     </el-table-column>
      <el-table-column label="开始日期" width="180" :resizable="false">
        <template slot-scope="scope">
          <span v-if="scope.row.startTime">{{ scope.row.startTime }} </span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="结束日期" width="180":resizable="false">
        <template slot-scope="scope">
          <span v-if="scope.row.endTime">{{ scope.row.endTime }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名" width="160" :resizable="false">
      </el-table-column>
      <el-table-column prop="classify" label="分类" width="160" :resizable="false">
      </el-table-column>
       <el-table-column  label="客户分层" width="180" :resizable="false">    
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
      <el-table-column prop="username" label="负责人" width="160" :resizable="false">
      </el-table-column>
      <el-table-column prop="company" label="公司名称" width="160" :resizable="false">
      </el-table-column>
      <el-table-column prop="status" label="当前状态" width="160" :resizable="false">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="400" :resizable="false">
        <template slot-scope="scope">
          <div id="btn_box">
             <el-button type="text" @click="getReject($event, scope.row)"> 开始项目</el-button>
            <el-button type="text" @click="getWorkOrder($event,scope.row)">添加工单</el-button>
            <!-- <el-button type="text" @click="popButton($event,scope.row)">查看日志</el-button> -->
            <el-button style="position:relative" type="text" @click="btn1($event, scope.row)">
              <span v-show="scope.row.count" id="icon_num">{{ scope.row.count }}</span>
              反馈
            </el-button>
              <el-button type="text" ref="asd" @click="suspend($event, scope.row,scope.$index,)">{{testData[scope.$index]}}</el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>
    <!-- 日志弹出 -->
    <!-- <el-dialog title="项目信息" :visible.sync="isPopBox" :append-to-body="true" center :fullscreen="true" @close="close">
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
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="isPopBox = false">关闭</el-button>
      </span>
    </el-dialog> -->
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
    <!-- 开始项目 -->
    <el-dialog title="项目开始" :visible.sync="isrejectShow" width="30%" center>
      <span>是否开始当前项目</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isrejectShow=false">取 消</el-button>
        <el-button type="primary" @click="rejectBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getPop,
  getItemData,
  getTechSuccess,
  AddProjectLog,
  addWorkOrder,
  viewProcess,
    Pause,
  Restart,
  updateDegree,
   matterproject
} from "@/api/request.js";
import { addfeedback, viewfeedback } from "@/api/detAils";
import tinymce from '@/components/TinymceShop'
import Dong from "@/components/Tick/dong.vue";
import Input from '@/components/inputBox.vue'
import addData from "@/components/addData.vue";
// import Tic from "@/components/Tick/dong.vue";
export default {
  name: "listDate",
  components: { tinymce, Dong,Input,addData},
  data() {
    return {
      isPopBox: false, //日志弹出
      isWorkOrderShow: false,//工单弹出
      centerDialogVisible: false,//反馈弹出
      isrejectShow:false,//完成项目 
      popData: [], //项目进度
      listData: [], //数据信息
      list:[],
      reject: {
        //  开始id
        pid: "",
      },
      successData: {
        pid: "",
      },
      temp: {//富文本数据
        context: ''
      },
      input: '',
      WorkOrderData: {//添加工单所需数据
        // tradceing: "", //项目单号
        title: "", //工单标题
        content: "", //工单内容
        company: "", //公司名
        // file: "", //上传的文件
      },
      feedbackList: [],//反馈列表
      feedbackData: {//反馈添加数据
        project_id: '',//项目id
        accepter: '',//项目负责人
        content: '',//反馈内容
        creator:'',// 创建工单的人名
        senter: ''//登录用户名
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
  computed: {},
  watch: {},
  beforeMount() {
    // 获取列表信息
    this.getList();
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
    // 日志页面关闭回调
    close() {
      this.textarea = "";
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
      if(res.code===200){
        this.list=res.data
      }
    },
    //  储存开始项目id
    getReject(e, row) {
      e.stopPropagation()
      this.isrejectShow = true;
      this.reject.pid = row.id;
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
    //  日志请求
    async getqwe(id) {
      const { data: res } = await getPop(id);
      if (res.code === 200) {
      
        this.popData = res.data;
      }
    },
    async postLogData(data) {
      const { data: res } = await AddProjectLog(data);
     
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: res.msg,
        });
        
        this.getqwe({ pid: this.logData.pid });
      } else {
        this.$message.error(res.msg);
      }
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
    //  查看进度
    async getViewProcess(name, feedbackData, data) {
      const { data: res } = await viewProcess(data)
     
      if (res.code === 200) {
        this.proGressList = res.data
        this.$router.push({
          name: 'det2',
          query: {
            name: name,
            feedbackData: feedbackData
          }
        })
      } else {
        this.$message.error(res.msg)
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
    // //  储存开始项目id
    // getReject(row) {
    //   this.isrejectShow = true;
    //   this.reject.pid = row.id;
    // },
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
    // 查看项目日志
    popButton(e,row) {
      e.stopPropagation()
      this.isPopBox = true;
      let id = { pid: row.id };
      this.getqwe(id);
    },
    isPop() {
      this.logData.content = this.textarea;
      this.postLogData(this.logData);
    },
    // 添加工单按钮
    getWorkOrder(e,row) {
      e.stopPropagation()
      // this.WorkOrderData.tradceing = row.tradceing
      this.WorkOrderData.company = row.company
      this.WorkOrderData.creator =sessionStorage.getItem('token_name')
      this.isWorkOrderShow = true
    },
    // 确认添加
    addWorkOrder() {
      this.isWorkOrderShow = false
     
      this.WorkOrderData.content = this.temp.context
      this.WorkOrderData.title = this.input
      this.getAddWorkOrder(this.WorkOrderData)
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
    // 自定义事件接受参数
    getUrl(imgUrl) {
     
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
    searchData(data){
      if(data){
       
         this.list=data  
      }else{
      
          this.list=this.listData
      }
    },
  },
  created() { },
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
  margin-bottom: 20px;
}

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