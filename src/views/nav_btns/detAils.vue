<template>
  <div class="">
     
    <div>
      <el-row type="flex" class="row-bg">
        <el-col :span="6" :offset="7">
          <div class="grid-content bg-purple">
            项目名称: {{ $route.query.name }}
          </div>
        </el-col>
        <el-col :span="6" :offset="5">
          <div class="grid-content bg-purple-light">
            <el-button type="warning" @click="btn4($event)">反馈</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="square">
      <div class="title">
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="grid-content bg-purple">项目名称</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">时间</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">负责人</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">操作</div>
          </el-col>
        </el-row>
      </div>
      <el-collapse accordion>
        <el-collapse-item v-for="(item, i) in proGressList" :key="i">
          <template slot="title">
            <el-row :gutter="24">
              <el-col :span="6">
                <div class="grid-content bg-purple">{{ item.typename }}</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">{{ item.createtime }}</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-select
                    v-model="item.username"
                    :disabled="item.status == '已完成'"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in useNameList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-button
                    style="width: 84px"
                    v-if="item.status == '未开始'"
                    @click="btn1($event, i, item)"
                    >开始</el-button
                  >
                  <div v-else-if="item.status == '进行中'">
                    <el-button
                      style="width: 84px"
                      type="primary"
                      @click="btn2($event, i, item)">进行中</el-button>
                    <el-button @click="btn7($event, item)" type="info" plain>更改负责人</el-button>
                  </div>
                  <el-button
                    style="width: 84px"
                    type="success"
                    v-else-if="item.status == '已完成'"
                    @click="btn3($event, i)">
                    已完成</el-button>
                </div>
              </el-col>
            </el-row>
          </template>
          <div class="proBox" v-for="(item2, i2) in item.child" :key="i2">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  {{ item2.status }}
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-select
                    v-model="item2.username"
                    :disabled="item2.status == '已完成'"
                    placeholder="请选择">
                    <el-option
                      v-for="item in useNameList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  {{ item2.typename }}
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-button
                    style="width: 84px"
                    v-if="item2.status == '未开始'"
                    @click="btn5($event, i, item2)"
                    >开始</el-button>
                  <div v-else-if="item2.status == '进行中'">
                    <el-button
                      style="width: 84px"
                      type="primary"
                      @click="btn6($event, i, item2)">进行中</el-button>
                    <el-button @click="btn8($event, item2)" type="info" plain>更改负责人</el-button>
                  </div>
                  <el-button
                    style="width: 84px"
                    type="success"
                    v-else-if="item2.status == '已完成'">
                    已完成</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 反馈弹出 -->
    <el-dialog
      title="反馈"
      :visible.sync="centerDialogVisible"
      fullscreen
      center
    >
      <span>

        <el-col :span="24"
        body-style="{margin:'0 20px'}">
    <el-card shadow="always" v-for="(item,index) in feedbackList" :key="index">
         <div>
          <div>
            <p>时间 ：{{item.createtime}}</p>
            <p>负责人：{{item.accepter}}</p>
          </div>
          <div>
            内容： {{item.content}}
          </div>
         </div>
    </el-card>
  </el-col>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="feedbackData.content"
        >
        </el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="centerDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="affirm">添 加</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  Startprocess,
  Finishprocess,
  ProcessUser,
  changeuser,
  addfeedback,
  viewfeedback
} from "@/api/detAils";
import { viewProcess } from "@/api/request";
// import {timestampToTime}from '@/api/index'
export default {
  name: "detAils",
  props: {},
  components: {},
  data() {
    return {
      centerDialogVisible: false, //反馈弹出
      useNameList: [], //负责人列表
      proGressList: [], //进度列表
      feedbackList:[],//反馈列表
      fileList: [],
      feedbackData:{//反馈添加数据
        project_id:'',//项目id
        accepter:'',//项目负责人
        content:'',//反馈内容
        senter:''//登录用户名
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 开始进度
    async getStartprocess(data) {
      const { data: res } = await Startprocess(data);
     
      if (res.code === 200) {
        this.getViewProcess(JSON.parse(sessionStorage.getItem("id")));
      }
    },
    // 完成进度
    async getFinishprocess(data) {
      const { data: res } = await Finishprocess(data);
     
      if (res.code === 200) {
        this.getViewProcess(JSON.parse(sessionStorage.getItem("id")));
      }
    },
    // 获取负责人信息
    async getProcessUser() {
      const { data: res } = await ProcessUser();
      if(res.code==200){
         this.useNameList = res.data;
      }
    },
    //  更新进度
    async getViewProcess(data) {
      const { data: res } = await viewProcess(data);
      if (res.code === 200) {
        this.proGressList = res.data;
      }
    },
    // 修改项目负责人
    async getChangeuser(data) {
      const { data: res } = await changeuser(data);
      if(res.code===200){
         this.getViewProcess(JSON.parse(sessionStorage.getItem("id")))
         this.$message.success(res.msg)
      }else{
        this.$message.error(res.msg)
      }
    },
    // 反馈添加
   async getAddfeedback(data){
      const {data:res} = await addfeedback(data)
      if(res.code===200){
        this.getViewfeedback({project_id:this.feedbackData.project_id,
      username:sessionStorage.getItem('token_name')
      })
      this.feedbackData.content=''
      }else{
        this.$message.error(res.msg)
      }
    },
    // 查看反馈
    async getViewfeedback(data){
     const {data:res} = await viewfeedback(data)
   
     if(res.code===200){
     
      this.feedbackList=res.data
     }
    },
    //  父级进度
    btn1(e, i, item) {
      //开始
      e.stopPropagation();
      if (item.username === "") {
        this.$message.error("请选择负责人");
      } else {
        this.getStartprocess({
          pid: item.pid,
          username: item.username,
          id: item.id,
        });
        item.username = "";
      }
    },
    btn2(e, i, item) {
      //进行中
      e.stopPropagation();
      
      this.getFinishprocess({ pid: item.id });
    },
    btn3(e) {
      //完成
      e.stopPropagation();
    },
    btn4(e) {
      //反馈
      e.stopPropagation();
      this.centerDialogVisible = true;
      this.getViewfeedback({project_id:this.feedbackData.project_id,
      username:sessionStorage.getItem('token_name')
      })
    },
    // 子项目进度
    btn5(e, i, item2) {
     
      if (item2.username === "") {
        this.$message.error("请选择负责人");
      } else {
      
        this.getStartprocess({
          pid: item2.pid,
          username: item2.username,
          id: item2.id,
        });
      }
    },
    // 子级项目完成
    btn6(e, i, item2) {
    
      this.getFinishprocess({ pid: item2.id });
    },
    // 一级负责人修改
    btn7(e, item) {
       e.stopPropagation();
      
      this.getChangeuser({
        id:item.id,
        username:item.username
      })
    },
    // 二级负责人修改
    btn8(e, item2) {
     
      this.getChangeuser({
        id:item2.id,
        username:item2.username
      })
    },

    // 添加反馈
    affirm(){
      if(this.feedbackData.content==''){
          this.$message.error('内容不能为空')
      }else{
    
         this.getAddfeedback(this.feedbackData)
      }
     
    }
  },
  created() {
    this.getViewProcess(JSON.parse(sessionStorage.getItem("id")));
    this.getProcessUser();
    // 获取路由参数
    const data= JSON.parse(this.$route.query.feedbackData)
     this.feedbackData.project_id=data.id
     this.feedbackData.accepter=data.username   
     this.feedbackData.senter=sessionStorage.getItem('token_name')
     
  },
  beforeMount() {
   
  },
  mounted() {},
};
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

.el-row {
  width: 100%;
  text-align: center;
  background-color: #fff;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
}

.title {
  margin-bottom: 20px;
}

.proBox {
  margin-left: 150px;
  // height: 20px;
  line-height: 40px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}
.el-page-header{
  margin-top: 20px;
}
.el-card{
  margin:10px 0;
}
</style>