<template>
  <div id="admin">
    <h1>管理员 客户页面</h1>
  <el-table
    :data="listData"
    style="width: 100%">
    <el-table-column
      label="id"
      prop="id">
    </el-table-column>
    <el-table-column
      label="company"
      prop="company">
    </el-table-column>
    <el-table-column
      label="customer"
      prop="customer">
    </el-table-column>
<el-table-column
      label="QQ"
      prop="QQ">
    </el-table-column>

<el-table-column
      label="phone"
      prop="phone">
    </el-table-column>

<el-table-column
      label="servicer"
      prop="servicer">
    </el-table-column>

    <el-table-column
      align="right">
      <!-- 搜索客户 -->
  <template slot="header" slot-scope="scope" id="st">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
          <!-- 添加客户 -->
          <el-button size="mini" @click="tian">添加</el-button>

                  
<el-dialog
  title="添加"
  :append-to-body="true"
  :visible.sync="dialogVisi"
  width="30%"
  >
    公司名： <el-input v-model="da.company"></el-input>
    客户:<el-input v-model="da.customer"></el-input>
   QQ: <el-input v-model="da.QQ"></el-input>
   Phone: <el-input v-model="da.phone"></el-input>
   客服名称:<el-input v-model="da.username "></el-input>
   <!-- <p>负责人名称:</p><el-select v-model="da.username" style="margin-top:10px;" placeholder="请选择负责人">
    <el-option
      v-for="k in selet"
      :key="k.id"
      :label="k.name"
      :value="k.name">
    </el-option>
  </el-select> -->
<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisi = false">取 消</el-button>
    <el-button type="primary" @click="tianjia">确 定</el-button>
  </span>
</el-dialog>
      </template>



<!-- 编辑客户 -->
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        
<el-dialog
  title="编辑"
  :append-to-body="true"
  :visible.sync="dialogVisible"
  width="30%"
  >
    公司名： <el-input v-model="bianji.company"></el-input>
    客户:<el-input v-model="bianji.customer"></el-input>
   QQ: <el-input v-model="bianji.QQ"></el-input>
   Phone: <el-input v-model="bianji.phone"></el-input>
   客服名称:<el-input v-model="bianji.username "></el-input>
<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sitbt">确 定</el-button>
  </span>
</el-dialog>



        <!-- 删除客户 -->
<el-popconfirm
  title="确定删除该客户吗？"
  @confirm="popcustomer(scope.$index, scope.row)"
>
  <el-button slot="reference" size="mini">删除</el-button>
</el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  </div>
</template>

<script>
export default {
name:'admin',
data() {
    return {
            listData:[],
            list:[],
         dialogVisible:false,
         dialogVisi:false,
        search: '',
        bianji:{
        QQ:'',
         company:'',
         customer:'',
         phone:'',
         username :''
        }, //编辑用户

         da : {
        username:  '',
        customer:   '',
        company:  '',
        QQ:'',
        phone:'' 
      },//添加用户
  // selet:[],
  // val:''
    };
},
// 修理器
computed:{
    fil(){
       return this.listData.filter(va=>{
            if(va.QQ.includes(this.search)){
                return va
            }else if(va.company.includes(this.search)){
                return va
            }else if(va.phone.includes(this.search)){
                return va
            }else if(va.servicer.includes(this.search)){
                return va
            }else if(va.customer.includes(this.search)){
                return va
            }
        })
    }
},
mounted(){
    this.allcustomer()
    
},
watch:{
    search(){
         this.listData = this.fil;
        if(this.search ==''){
            this.listData=this.list;
        }
    }
},
methods:{
   
   // 查看所有客户
  async allcustomer (){
        const axios = require('axios');
        await axios.post('customer/allcustomer',{uid:1}).then(res=>{this.listData=res.data.data;this.list=res.data.data;})
         
    },
    // 可分配人员 
// jiaren(){
//     
//         const axios = require('axios');
//          axios.get('user/processUser').then(res=>{this.selet=res.data.data; console.log(this.selet)})
   
// },
   //  删除客户
async popcustomer(index,row){
       const axios =require('axios');
         await axios.post('customer/popcustomer',{cid:row.id,username:this.listData[index].servicer,}).then(res=>{this.$message.success(res.data.msg)})
        this.timer()
},
// 修理客户
async updatecustomer(){
        const axios =require('axios');
         await axios.post('customer/updatecustomer',this.bianji).then(res=>{this.$message.success(res.data.msg);})
},
// 确定修理客户
sitbt(){
    this.dialogVisible = false;
    this.updatecustomer();
   this.timer()
},
// 修理客户的值
handleEdit(index,row){
    console.log(row);
    this.dialogVisible = true;
   this.bianji.QQ=row.QQ;
   this.bianji.company=row.company;
   this.bianji.customer=row.customer;
   this.bianji.username=row.servicer;
   this.bianji.phone=row.phone;
},

// 点击添加按钮
tian(){
  this.dialogVisi =true;
  // this.jiaren()
},

// 添加新用户
 async addcustomer(){
  
      const axios =require('axios');
      this.val = this.da.username
         await axios.post('customer/addcustomer',this.da).then(res=>{this.$message.success(res.data.msg);})
},
//  确定添加 
tianjia(){
    this.dialogVisi=false;
    this.addcustomer();
    this.timer()
},
// 延迟刷新 
timer(){
  setTimeout(()=>{location.reload()},600)
}

}
}
</script>

<style scoped>
/deep/.el-table th.el-table__cell>.cell{
     display:flex;
   
}

</style>