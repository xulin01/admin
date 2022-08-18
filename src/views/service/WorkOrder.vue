<template>
  <div class="square">
    <el-button class="mal" type="text">
      <el-col :span="24">
        <el-card shadow="hover" :style=" {'color':item.status=='超时' ?'rgb(242, 5, 5)':'' }" v-for="item in list" :key="item.id">
          <ul @click="rest(item.id, item.username)">
            <li>问题:&nbsp; {{ item.title }}</li>
            <li>开始时间：{{ item.createtime }}</li>
            <li>工单号：{{ item.tradceing }}</li>
            <li>公司名称：{{ item.company }}</li>
            <li>当前状态:{{ item.status }}</li>
            <!-- <el-button type="success" :plain="true" @click="open1">新建</el-button> -->
            <el-button type="danger" :plain="true" @click="open2($event, item)">删除</el-button>
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
    <!-- 删除弹出 -->
    <el-dialog title="提示" :visible.sync="isOpen2" width="30%" center>
      <span>是否删除该工单:{{ tradceing }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isOpen2 = false">取 消</el-button>
        <el-button type="primary" @click="affirm">确 定</el-button>
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
import {  popWorkorder, ViewWorkLog } from '@/api/workOrder'
import { pendingWork, addWorkOrder,selfWorkorder } from '@/api/request'
import tinymce from '@/components/TinymceShop'
// import Tic from "@/components/Tick/dong.vue";
export default {
  name: 'WorkOrder',
  props: {},
  components:{tinymce},
  data() {
    return {
      list:[],
      listData: [],//工单数据
      popData: [], //日志数据
      dialogVi: false,//工单弹出
      isOpen1: false,//新建弹出
      isOpen2: false,//删除弹出
      isOpen4: false,//删除弹出
      isWorkOrderShow:false,//添加工单弹出
      workData: {//查看工单数据
        id: '',
        username: ''
      },
      tradceing: '',//删除工单提示
      postWorkData: {
        id: ''
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
  computed: {},
  watch: {},
  methods: {
    // 返回上一个页面
     goBack() {
      this.$router.back()
    },
    // 请求数据
    async getList() {
      const { data: res } = await selfWorkorder({username:sessionStorage.getItem('token_name')})
      if (res.code === 200) {
        this.listData = res.data
        this.list=res.data
      }
    },
    // 删除工单
    async postWork(data) {
      const { data: res } = await popWorkorder(data)
      
      if (res.code === 200) {
        this.getList()
        this.$message({
          type: 'success',
          message: res.msg
        })
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
    //  日志 
    async getViewWorkLog(data) {
      const { data: res } = await ViewWorkLog(data)
      
      if (res.code === 200) {
        this.popData = res.data
         
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.msg
          })
        } else {
          this.$message.error(res.msg)
        }
      }
    },
    // 添加工单
    open1(e) {
      e.stopPropagation()
      this.isOpen1 = true
    },
    // 删除工单
    open2(e, item) {
      this.isOpen2 = true
      e.stopPropagation()
      this.postWorkData.id = item.id
      this.tradceing = item.tradceing
    },
        // 查看待分配
    waitFor(){
      this.getpendingWork()
    },
    // 全部工单
    All(){
      console.log(this.listData);
      this.list=this.listData
    },
    // 日志查看
    open4(e, item) {
      e.stopPropagation()
      this.isOpen4 = true
      this.postViewWorkLog.wid = item.id
       
      this.getViewWorkLog(this.postViewWorkLog)
    },
    rest(id, username) {
      this.dialogVi = true
      this.workData.id = id
      this.workData.username = username
    },
    affirm() {
      this.isOpen2 = false
      this.postWork(this.postWorkData)
    },
    // 日志确认
    affirm4() {
      this.isOpen4 = false
    },
      // 添加工单功能
    popButton(e) {
      e.stopPropagation()
      this.WorkOrderData.creator=sessionStorage.getItem('token_name')
       this.isWorkOrderShow = true
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
    getUrl(){},
  },
  created() {
    this.getList()
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