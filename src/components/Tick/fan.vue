<template>
<div>
  <Back></Back>
 <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  router>
<!-- 项目 -->
 <el-submenu index="1">
    <template slot="title">项目</template>
    <el-menu-item index="con3" @click="AllProject">进行中项目</el-menu-item>
    <el-menu-item index="wan3">上线项目</el-menu-item>
    <el-menu-item index="con3" @click="matterproject">问题项目</el-menu-item>
  
    </el-submenu>
<!-- 工单 -->
<el-submenu index="22">
    <template slot="title">工单</template>
    <el-menu-item index="square3">工单广场</el-menu-item>
    <el-menu-item index="wrok3">我的工单</el-menu-item>

  </el-submenu>

<!-- 售后 -->
<el-submenu index="232">
    <template slot="title">售后</template>
    <el-menu-item index="sales3">外企点</el-menu-item>

  </el-submenu>

<!-- 工作 -->
<!-- <el-submenu index="23">
    <template slot="title">工作</template>
    <el-menu-item index="jk2">我的工作</el-menu-item>
  </el-submenu> -->
    <el-menu-item index="jk2">我的工作</el-menu-item>
   <!-- <el-menu-item index="">任务</el-menu-item> -->
   <el-menu-item index="mas3">文件管理</el-menu-item>
  <el-menu-item > <a href="http://tool.waiqidian.com/" target="blank">  工具</a></el-menu-item>
</el-menu>
   </div></el-col>
</el-row>
<router-view ref="child"></router-view>
</div>
</template>

<script>
import Back from "@/components/backNow.vue";

export default {
    components:{Back},
   data() {
      return {
       activeIndex:'1'
      };
    },
    methods: {
      // 全部项目
      AllProject(){
         this.$nextTick(()=>{
          this.$refs.child.getList()
        })
      },
      // 问题项目
      matterproject(){
        this.$nextTick(()=>{
          this.$refs.child.getmatterproject()
        })
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