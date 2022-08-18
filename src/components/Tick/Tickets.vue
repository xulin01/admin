<template>
  <div>
    <Back></Back>
    <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  router>
<!-- 项目 -->
 <el-submenu index="1">
    <template slot="title">项目</template>
      <el-menu-item index="con" @click="AllProject">全部项目</el-menu-item>
    <el-menu-item index="con" @click="add">新增项目</el-menu-item>
    <el-menu-item index="wan">上线项目</el-menu-item>
    <el-menu-item index="con" @click="matterproject">问题项目</el-menu-item>
    </el-submenu>
<!-- 工单 -->
<el-submenu index="22">
    <template slot="title">工单</template>
    <el-menu-item index="wrok" @click="All">全部工单</el-menu-item>
    <el-menu-item  @click="popButton($event)">新增工单</el-menu-item>
    <el-menu-item index="square">工单广场</el-menu-item>
    <el-menu-item index="wrok" @click="waitFor">待处理工单</el-menu-item>
  </el-submenu>

<!-- 售后 -->
<el-submenu index="232">
    <template slot="title">售后</template>
    <el-menu-item index="sales">外企点</el-menu-item>
    <el-menu-item index="2-312">阿里国际*</el-menu-item>
  </el-submenu>

<!-- 客户 -->
<el-submenu index="33">
    <template slot="title">客户</template>
    <!-- <el-menu-item index="">任务管理</el-menu-item> -->
    <el-menu-item index="admin">客户管理</el-menu-item>
  </el-submenu>
<!-- <el-menu-item index="/admin">客户</el-menu-item> -->

<!-- 工作 -->
<!-- <el-submenu index="23"> -->
    <!-- <template slot="title">工作</template> -->
    <!-- <el-menu-item index="22-1">新增工作*</el-menu-item>
    <el-menu-item index="22-2">我的工作 *</el-menu-item> -->
    <!-- <el-menu-item index="renwu">工作查看</el-menu-item> -->
  <!-- </el-submenu> -->
 <el-menu-item index="renwu">工作查看</el-menu-item>
<!-- 账号 -->
<el-menu-item index="chakan">账号</el-menu-item>
<el-menu-item index="mas">文件管理</el-menu-item>
 <el-menu-item > <a href="http://tool.waiqidian.com/" target="blank">  工具</a></el-menu-item>
</el-menu>
   </div></el-col>
   <!-- 添加项目 -->
   <el-dialog
  title="添加项目"
  :visible.sync="isAddShow"
  @close="close"
  width="50%">
  <span>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="24">
  <el-col :span="12"><div class="grid-content bg-purple">
<el-form-item label="项目类型" prop="classify">
      <el-select v-model="ruleForm.classify" placeholder="请选择">
    <el-option
      v-for="item in AllClassify"
      :key="item.typeid"
      :label="item.name"
      :value="item.name"
      @click.native="qwe(item)"
      >
    </el-option>
  </el-select>
   </el-form-item>
  </div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">
    <el-form-item label="分配客服" prop="username">
        <el-select v-model="ruleForm.username" placeholder="请选择">
    <el-option
      v-for="item in serviceList"
      :key="item.id"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
    </el-form-item>

  </div></el-col>
</el-row>
<el-row :gutter="24">
  <el-col :span="12"><div class="grid-content bg-purple">
<el-form-item label=" 项目名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  </div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">
    <el-form-item label=" 公司名称" prop="company">
    <el-input v-model="ruleForm.company"></el-input>
  </el-form-item>
  </div></el-col>
</el-row>
  <el-row :gutter="24">
  <el-col :span="12"><div class="grid-content bg-purple">
      <el-form-item label="联系方式" prop="phone">
    <el-input v-model="ruleForm.phone"></el-input>
  </el-form-item>

  </div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">
    <el-form-item label="公司QQ" prop="QQ">
    <el-input v-model="ruleForm.QQ"></el-input>
  </el-form-item>

  </div></el-col>
</el-row>
    <el-row :gutter="24">
    <el-col :span="12">
    <el-form-item label="客户" prop="customer">
       <el-input v-model="ruleForm.customer"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="12">
          <el-form-item label=" 模板名称" prop="vision">
    <el-input v-model="ruleForm.vision"></el-input>
  </el-form-item>       
    </el-col>
    </el-row>
     <el-form-item>
     <el-button @click="isAddShow = false">取 消</el-button>
    <el-button type="primary" @click="getAddDate('ruleForm')">确 定</el-button>
  </el-form-item>
</el-form>
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
        <tinymce v-model="temp.context" :height="400" />
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isWorkOrderShow = false">关 闭</el-button>
        <el-button type="primary" @click="addWorkOrder">添 加</el-button>
      </span>
    </el-dialog>
</el-row>
    <router-view ref="child"></router-view>
  </div>
</template>

<script>
import {customer, addWorkOrder,getAllClassify,getAddData } from '@/api/request'
import tinymce from '@/components/TinymceShop'
import Back from "@/components/backNow.vue";
export default {
    components:{tinymce,Back},
   data() {
      return {
       activeIndex:'1',
       isAddShow:false,
       isWorkOrderShow:false,
         serviceList:[],
         AllClassify:[],//项目类型
        ruleForm: {//添加项目所需数据
          typeid:'',//分类id
          name : '',//  项目名
          company: '',// 公司名
          vision : '',// 模板版本
          classify: '',//分类
          QQ:'',//qq
          username:'',// 客服名字
         customer:'',//  客户
         phone :'',//电话
        //  servicetime:''//项目服务时间
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
        rules: {
          name : [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
          ],
          company: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
          ],
          vision : [
           { required: true, message: '请输入模板名称', trigger: 'blur' },
          ],
          classify:[
             { required: true, message: '请选择类型', trigger: 'blur' },
          ],
          username:[
             { required: true, message: '请选择类型', trigger: 'blur' },
          ],
          QQ:[
             { required: true, message: '请选择类型', trigger: 'blur' },
          ],
          customer:[
             { required: true, message: '请选择类型', trigger: 'blur' },
          ],
          phone:[
             { required: true, message: '请选择类型', trigger: 'blur' },
          ]
        },
      };
    },
    mounted(){
         this.getCustomer()     
         this.getStor()
    },
    methods: {
      // 全部项目
      AllProject(){
         this.$nextTick(()=>{
          this.$refs.child.getList()
        })
      },
        // 添加项目
    async getAddData(data) {
      const { data: res } = await getAddData(data)
      if (res.code === 200) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
          setTimeout(()=>location.reload(),500)
      } else {
        this.$message.error(res.msg)
      }
    },
      // 问题项目
      matterproject(){
        this.$nextTick(()=>{
          this.$refs.child.getmatterproject()
        })
      },
    add(){
      this.isAddShow=true
    },
     async getCustomer(){
        const{data:res}=await customer()
        if(res.code===200){
         this.serviceList=res.data
        }
      },
      // 获取所有分类
    async getStor() {
      const { data: res } = await getAllClassify();
      if (res.code === 200) {
        this.AllClassify = res.data;
      }
    },
      getAddDate(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {  
            this.getAddData(this.ruleForm)
             this.isAddShow=false
          } else {
            return false;
          }
        });
      },
      qwe(item){
         this.ruleForm.typeid=item.id
      },
       // 添加工单功能
    popButton(e) {
      //  e.stopPropagation()
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

    All(){
       this.$nextTick(()=>{
        this.$refs.child.All()
       });
    },
    // 22
    waitFor(){
     this.$nextTick(()=>{
        this.$refs.child.waitFor()
       });
    },
    // 关闭添加窗口
      close(){
              this.ruleForm.typeid=''
              this.ruleForm.name=''
              this.ruleForm.company=''
              this.ruleForm.vision=''
              this.ruleForm.classify=''
              this.ruleForm.QQ=''
              this.ruleForm.username=''
              this.ruleForm.customer=''
              this.ruleForm.phone =''
      },
    }
}
</script>

<style scoped>
#nav{
    width: 100%;
    display:flex;
    justify-content: space-around;
}
a{
  text-decoration: none;
}
</style>