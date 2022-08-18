<template>
  <div id="sales">

 <!-- 售后操作  -->
        <el-col :span="18">
            <el-card shadow="hover" style="padding:0;" v-for="item in listData" :key="item.id" >
                <ul  @click="brk(item)">
                    <li>类型：{{item.classify}}</li>
                    <li>开始 时间：{{item.createtime}}</li>
                    <li>项目名称:{{item.name}}</li>
                    <li>负责人：{{item.username}}</li>
                    <li>状态:{{item.status}}</li>
                    
                </ul>
                 
                    
            </el-card>
        </el-col>



  </div>
</template>

<script>

export default {
    name:'sales',
    
     data() {
        return {
            token:null,
            uid: 0,
           listData:[],
          
        };
    },
    mounted() {
        this.test()
    },
 methods: {
    async test(){
        this.uid = sessionStorage.getItem('token_uid')
        const axios = require('axios');
        await axios.post('/project/customerservice',{uid:this.uid}).then(res => {this.listData=res.data.data;console.log(this.listData)}).catch(error=>{console.log(error);})
    },
        goBack() {
            this.$router.back()
        },

    brk(item){
         const feedbackData = JSON.stringify({
        id: item.id,
        username: item.username
      })
      this.$router.push({
          path: '/wrk',
          query: {
            feedbackData: feedbackData
          }
        }) 
    }


    }
}
</script>

<style scoped>
.el-page-header {
    margin-top: 30px;
    margin-left: 30px;
}
/deep/.el-card__body{
    padding: 0;
}
.el-col {
    margin: 20px 0 0 50px;
    cursor: pointer;
}
.el-col .el-card{
    padding: 0;
}
.el-card {
    margin-top: 30px;
   position: relative;
   padding: 1px;
}

.el-card ul {
    list-style: none;
    height: 75px;
     display:inline-block;
    margin:0;
}
.el-card ul li{
    line-height:75px;
    float:left; 
    width:200px;
    margin-left:30px;
    text-align:center;
}
.el-card .el-button{
    display:inline-block;
   position: absolute;
   top: 40px;
   right: 60px;
}


</style>