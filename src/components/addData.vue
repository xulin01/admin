<template>
  <div class="">
     <el-button type="primary" @click="isAddShow = true">添加项目</el-button>
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
          <!-- <el-form-item label="服务时长">
       <el-input v-model="ruleForm.vision"></el-input>
    </el-form-item>  -->
    </el-col>
    </el-row>
    <!-- <el-row :gutter="24">
    <el-col :span="12">
    </el-col>
    </el-row> -->
     <el-form-item>
     <el-button @click="isAddShow = false">取 消</el-button>
    <el-button type="primary" @click="getAddDate('ruleForm')">确 定</el-button>
  </el-form-item>
</el-form>
  </span>
</el-dialog>
  </div>
</template>

<script>
import {customer}from '@/api/request'
export default {
  props:['AllClassify'],
    data() {
      return {
         isAddShow:false,
         serviceList:[],
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
          ],
          // tradceing:[
          //    { required: true, message: '请输入单号', trigger: 'blur' },
          // ],
        },
      };
    },
    methods: {
      async getCustomer(){
        const{data:res}=await customer()
        if(res.code===200){
         this.serviceList=res.data
        }
      },
      getAddDate(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {     
              this.$emit('fun',this.ruleForm)
             this.isAddShow=false
          } else {
            return false;
          }
        });
      },
      qwe(item){
         this.ruleForm.typeid=item.id
      },
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
      }
    },
    beforeMount(){
        this.getCustomer()     
    }
  }
  
</script> 

<style scoped lang="less">

</style>