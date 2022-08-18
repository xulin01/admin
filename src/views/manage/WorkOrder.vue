<template>
  <div class="square">
   
<!-- 按钮组 -->
   <!-- <Tic @fun1="fun1" @fun2="fun2"></Tic> -->

<el-row :gutter="24">
  <el-col :span="4" :offset="4"><div class="grid-content bg-purple">
     <!-- 添加工单组件 -->
    <!-- <el-button type="primary" @click="popButton($event)">添加工单</el-button> -->
  </div></el-col>
  <!-- <el-col :span="16"><div class="grid-content bg-purple">
    <el-button-group>
  <el-button type="primary" @click="All">全部工单</el-button>
  <el-button type="primary" @click="waitFor">待处理工单</el-button>
</el-button-group>
     搜索组件 -->
      <!-- <Input @fun="searchData" :listWorkData="listData" :sum="0"></Input> -->
  <!-- </div></el-col> -->
</el-row>
  
    <el-button class="mal" type="text">
      <el-col :span="24">
        <el-card shadow="hover" :style=" {'color':item.status=='超时' ?'rgb(242, 5, 5)':''}" v-for="item in list" :key="item.id">
          <ul class="box" @click="rest(item.id, item.username)">
            <li>问题:&nbsp; {{ item.title }}</li>
            <li>开始时间：{{ item.createtime }}</li>
            <li>工单号：{{ item.tradceing }}</li>
            <li>公司名称：{{ item.company }}</li>
            <li>当前状态:{{ item.status }}</li>
            <el-button type="info" :plain="true" :disabled="item.status !=='未分配技术'" @click="open1($event, item)">分配</el-button>
            <el-button type="success" :plain="true" @click="open2($event, item)">完成</el-button>
            <el-button type="warning" :plain="true" @click="open3($event, item)">驳回</el-button>
            <el-button type="primary" :plain="true" @click="open4($event, item)">日志</el-button>
          </ul>
        </el-card>
      </el-col>
    </el-button>
    <!-- 查看工单弹出 -->
    <el-dialog title="查看工单" :visible.sync="dialogVi" width="30%">
      <li>ID : {{ workData.id }}</li>
      <li>负责人 : {{ workData.username }}</li>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVi = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配弹出 -->
    <el-dialog title="分配工单" :visible.sync="isOpen1" width="30%" center @close="close">
      <span>
        <el-select v-model="value" placeholder="请选择技术人员">
          <el-option v-for="item in nameList" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isOpen1 = false">取 消</el-button>
        <el-button type="primary" @click="affirm1">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 完成弹出 -->
    <el-dialog title="提示" :visible.sync="isOpen2" width="30%" center>
      <span>是否完成该工单:{{ tradceing }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isOpen2 = false">取 消</el-button>
        <el-button type="primary" @click="affirm2">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 驳回弹出 -->
    <el-dialog title="提示" :visible.sync="isOpen3" width="30%" center>
      <span>是否驳回该工单:{{ tradceing }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isOpen3 = false">取 消</el-button>
        <el-button type="primary" @click="affirm3">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 日志弹出 -->
    <el-dialog title="项目信息" :visible.sync="isOpen4" :append-to-body="true" center :fullscreen="true">
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
        <el-button type="primary" @click="affirm4"> 确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加工单弹出 -->
    <el-dialog title="工单添加" :visible.sync="isWorkOrderShow" :append-to-body="true" :fullscreen="true" center>
      <span>
        <el-row :gutter="20">
  <el-col :span="6" :offset="6"><div class="grid-content bg-purple">
    <el-input v-model="WorkOrderData.title" placeholder="请输入项目标题" ></el-input>
  </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
      <el-input v-model="WorkOrderData.company" placeholder="请输入公司名称" ></el-input>
  </div></el-col>
</el-row>
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
import { allworkorder, finishWork, rejectWorkOrder, assign, ViewWorkLog } from '@/api/workOrder'
import { getNameData, addWorkOrder,pendingWork} from '@/api/request'
// import { addfeedback, viewfeedback } from "@/api/detAils";

// import Tic from "@/components/Tick/Tickets.vue";
import tinymce from '@/components/TinymceShop'
import Input from '@/components/inputBox.vue'
export default {
  name: 'WorkOrder',
  components:{tinymce,Input},
  data() {
    return {
      radio1:'1',
      listData: [],//工单数据
      list:[],
      nameList: [],//技术人员数据
      popData: [], //日志数据
      value: '',
      dialogVi: false,//工单弹出
      isOpen1: false,//开始弹出
      isOpen2: false,//完成弹出
      isOpen3: false,//驳回弹出
      isOpen4: false,//日志弹出
      isWorkOrderShow:false,//添加项目
      workData: {//查看工单数据
        id: '',
        username: ''
      },
      tradceing: '',//工单提示
      postWorkData: {//完成id
        wid: ''
      },
      postStartWork: {//驳回id
        wid: ''
      },
      postAssign: {//分配传输数据 
        username: '',
        wid: ''
      },
      postViewWorkLog: {//查看日志id
        wid: ''
      },
       temp: {//富文本数据
        context: ''
      },
       WorkOrderData: {//添加工单所需数据
        // tradceing: "", //项目单号
        title:"", //工单标题
        content:"", //工单内容
        company:"", //公司名
        creator:"",//创建工单的人名
        // file: "", //上传的文件
      },
    }
  },
 
  methods: {
    // 请求数据
    async getAllworkorder() {
      const { data: res } = await allworkorder()
      if (res.code === 200) {
        this.listData = res.data
        this.list=res.data
      }
    },
    // 请求待处理数据
     async getpendingWork(){
     const {data:res}= await pendingWork({username:sessionStorage.getItem('token_name')})
     console.log(res);
     if(res.code===200){
      this.list=res.data
     }
     },
    async getNameData() {
      const { data: res } = await getNameData()
      if (res.code === 200) {
      
        this.nameList = res.data
      }
    },

    // 完成工单
    async getJudgeWorkOrder(data) {
      const { data: res } = await finishWork(data)

      if (res.code === 200) {
        this.getAllworkorder()
        this.$message({
          type: 'success',
          message: res.msg
        })
      } else {
        this.$message.error(res.msg)
      }
    },
    // 驳回工单
    async getStartWork(data) {
      const { data: res } = await rejectWorkOrder(data)
      if (res.code === 200) {
        this.getAllworkorder()
        this.$message({
          type: 'success',
          message: res.msg
        })
      } else {
        this.$message.error(res.msg)
      }
    },
    //  分配工单
    async getAssign(data) {
      const { data: res } = await assign(data)
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: res.msg
        })
      } else {
        this.$message.error(res.msg)
      }
    },
    // 添加工单功能
    popButton(e) {
      e.stopPropagation()
      this.WorkOrderData.creator=sessionStorage.getItem('token_name')
       this.isWorkOrderShow = true
    },
    //  日志 
    async getViewWorkLog(data) {
      const { data: res } = await ViewWorkLog(data)
      
      if (res.code === 200) {
        this.popData = res.data
      
        if (res.code === 200) {
          this.getAllworkorder()
          this.$message({
            type: 'success',
            message: res.msg
          })
        } else {
          this.$message.error(res.msg)
        }
      }
    },
    // 确认添加
    addWorkOrder() {
      this.isWorkOrderShow = false
      this.WorkOrderData.content = this.temp.context
      
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
    // 分配工单
    open1(e, item) {
      this.isOpen1 = true
      e.stopPropagation()
      //  this.tradceing=item.tradceing
      this.postAssign.wid = item.id
    },
    // 完成工单
    open2(e, item) {
      this.isOpen2 = true
      e.stopPropagation()
      this.postWorkData.wid = item.id
      this.tradceing = item.tradceing
   
    },
      // 自定义事件接受参数
    getUrl(imgUrl) {
    },
    // 驳回工单
    open3(e, item) {
      e.stopPropagation()
      this.isOpen3 = true
      this.tradceing = item.tradceing
      this.postStartWork.wid = item.id
    },
    // 日志查看
    open4(e, item) {
      e.stopPropagation()
      this.isOpen4 = true
      this.postViewWorkLog.wid = item.id
      
      this.getViewWorkLog(this.postViewWorkLog)
    },
    // 查看工单
    rest(id, username) {
      this.dialogVi = true
      this.workData.id = id
      this.workData.username = username
    },
    // 查看待分配
    waitFor(){
      this.getpendingWork()
    },
    // 全部工单
    All(){
      this.list=this.listData
    },
    // 分配确认
    affirm1() {
      if (this.value !== '') {
        this.isOpen1 = false
        this.postAssign.username = this.value
     
        this.getAssign(this.postAssign)
      } else {
        this.$message.error('内容不能为空')
      }
    },
    // 完成确认
    affirm2() {
      this.isOpen2 = false
      this.getJudgeWorkOrder(this.postWorkData)
    },
    // 驳回确认
    affirm3() {
      this.isOpen3 = false
     
      this.getStartWork(this.postStartWork)
    },
    // 日志确认
    affirm4() {
      this.isOpen4 = false
    },
    // 关闭工单页面执行
    close() {
      this.value = ''
    },
    // 过滤
    searchData(data){
      if(data){
         this.list=data  
      }else{
          this.list=this.listData
      }
    },

  },
  created() {
    this.getAllworkorder()
    this.getNameData()
  },
  mounted() {
  },
}
</script> 

<style scoped lang="scss">
.square {
  .mal {
    width: 100%;
    margin: auto;
  }

  .el-card {
    margin-top: 20px;
  }

  .el-card ul {
    list-style: none;
    position: relative;
    display: flex;
    justify-content: space-around;
  }

  .el-card ul li {
    width: 300px;

  }

  .el-dialog li {
    list-style: none;
  }
}
</style>