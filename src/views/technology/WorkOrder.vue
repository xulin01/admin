<template>

  <div class="square">
    <el-button class="mal" type="text">
      <!-- <div class="box"> -->
        <el-col  :span="24">
      <el-row :gutter="20">
  <el-col :span="4"><div class="grid-content bg-purple">问题</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light">开始时间</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">工单号</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light">公司名称</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">当前状态</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light">操作</div></el-col>
</el-row>
      </el-col>
      <!-- </div> -->
      <el-card shadow="hover" :style=" {'color':item.status=='超时' ?'rgb(242, 5, 5)':'' }" v-for="item in listData" :key="item.id"  >
         <ul style="width=100%" @click="rest(item)">
          <el-row style="width=100%">
  <el-col :span="3"><div class="grid-content bg-purple">{{ item.title }}</div></el-col>
  <el-col :span="4" :offset="1"><div class="grid-content bg-purple-light">{{ item.createtime }}</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">{{ item.tradceing }}</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light">{{ item.company }}</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">{{ item.status }}</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light">
           <el-button type="info" :plain="true" @click="open1($event, item)">开始</el-button>
            <el-button type="success" :plain="true" @click="open2($event, item)">完成</el-button>
            <el-button type="primary" :plain="true" @click="open4($event, item)">日志</el-button>
            </div></el-col>
</el-row>
</ul>
        </el-card>

    </el-button>
    <!-- 查看工单弹出 -->
    <el-dialog title="查看工单" :visible.sync="dialogVi" width="30%">
      <li>ID : {{ workData.id }}</li>
      <li>负责人 : {{ workData.username }}</li>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVi = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 开始弹出 -->
    <el-dialog title="提示" :visible.sync="isOpen1" width="30%" center>
      <span>是否开始该工单:{{ tradceing }}</span>
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
    <!-- 日志弹出 -->
    <el-dialog title="项目信息" :visible.sync="isOpen4" :append-to-body="true" center :fullscreen="true" @close="close">
      <span>
        <p>日志添加</p>
        <div class="block">
          <el-timeline>
            <el-timeline-item v-for="(item, i) in popData" :key="i" :timestamp="item.createtime" placement="top">
              <el-card>
                <h4>{{ item.content }}</h4>
                <el-button type="danger" @click="dleData(item)">删除</el-button>
              </el-card>

            </el-timeline-item>
          </el-timeline>
        </div>

        <div style="margin: 20px 0;"></div>
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容"
          v-model="postViewWorkLog.content">
        </el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="isOpen4 = false">关 闭</el-button>
        <el-button type="primary" @click="affirm4"> 添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { allworkorder, judgeWorkOrder, startWork, ViewWorkLog, AddWorkLog, PopLog } from '@/api/workOrder'
import {selfWorkorder } from '@/api/request'
export default {
  name: 'WorkOrder',
  props: {},
  data() {
    return {
      listData: [],//工单数据
      popData: [], //日志数据
      dialogVi: false,//工单弹出
      isOpen1: false,//开始弹出
      isOpen2: false,//完成弹出
      isOpen4: false,//日志弹出
      workData: {//查看工单数据
        id: '',
        username: ''
      },
      tradceing: '',//删除工单提示
      postWorkData: {//删除id
        wid: ''
      },
      postStartWork: {//开始id
        wid: ''
      },
      postViewWorkLog: {//日志添加
        wid: '',
        content: ''
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 请求数据
    async getAllworkorder() {
      const { data: res } = await selfWorkorder({username:sessionStorage.getItem('token_name')})
     
      if (res.code === 200) {
        this.listData = res.data
      }
    },
    // 完成工单
    async getJudgeWorkOrder(data) {
      const { data: res } = await judgeWorkOrder(data)
     
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
    // 开始工单
    async getStartWork(data) {
      const { data: res } = await startWork(data)
    
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
    //  查看日志 
    async getViewWorkLog(data) {
      const { data: res } = await ViewWorkLog(data)
     
      if (res.code === 200) {
        this.popData = res.data
      }else {
          this.popData=[]
      }
    },
    // 添加日志
    async getAddWorkLog(data) {
      const { data: res } = await AddWorkLog(data)
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.getViewWorkLog({ wid: data.wid })
        this.postViewWorkLog.content=''
      }else{
        this.$message.error(res.msg)
      }
    },
    // 删除日志
    async getPopLog(data) {
      const { data: res } = await PopLog(data)
      if (res.code === 200) {
        this.getViewWorkLog({ wid: this.postViewWorkLog.wid })
        this.$message.success('删除成功')
      }
    },
    // 开始工单
    open1(e, item) {
      this.isOpen1 = true
      e.stopPropagation()
      this.postStartWork.wid = item.id
      this.tradceing = item.tradceing
    
    },
    // 完成工单
    open2(e, item) {
      this.isOpen2 = true
      e.stopPropagation()
      this.postWorkData.wid = item.id
      this.tradceing = item.tradceing
    
    },
    // 日志查看
    open4(e, item) {
      e.stopPropagation()
      this.isOpen4 = true
      this.postViewWorkLog.wid = item.id
      this.getViewWorkLog({ wid: item.id })
    },
    // 删除日志
    dleData(item) {
      this.getPopLog({ id: item.id })
    },
    // 查看工单
    rest(item) {
      this.dialogVi = true
      this.workData.id = item.id
      this.workData.username = item.username
     
    },
    // 确认开始
    affirm1() {
      this.isOpen1 = false
      this.getStartWork(this.postStartWork)
    },
    // 确认完成
    affirm2() {
      this.isOpen2 = false
      this.getJudgeWorkOrder(this.postWorkData)
    },
    // 日志确认
    affirm4() {
      if (this.postViewWorkLog.content !== '') {
       
        this.getAddWorkLog(this.postViewWorkLog)
      }
    },
    // 日志关闭
    close() {
      this.postViewWorkLog.content = ''
    }
  },
  created() {
    this.getAllworkorder()
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

.el-timeline-item__content {
  .el-card {
    display: flex;
  }
}
.el-row{
  width: 100%;
  margin: 0;
}
// .el-card__body{
//   padding:10px 0;
// }
.el-page-header {
  margin-top: 20px;
}
.box{
  padding: 0 20px;
}
::-webkit-scrollbar{
  display: none;
}
</style>