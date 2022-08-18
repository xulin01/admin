<template>
    <el-row :gutter="24">
<el-col :span="7" :offset="6"><div class="grid-content bg-purple">
<el-input
    placeholder="请输入关键字进行搜索"
    v-model="input"
    clearable
  @input="funInput">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
</div></el-col>
</el-row>
</template>
<script>
export default {
  name: 'inputBox',
 
  props:{
    listData:{
      type:Array,
      // require:true,
      default:()=>{
        return []
      }
    },
    listWorkData:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  components: {},
  data () {
   return {
     obj:'name',
       input: '',
       t:null,
     
   }
  },
  watch: {
  },
  computed:{
    searchData(){
      return this.listData.filter(e=>{
      if(e.name.includes(this.input)){
        return e
       }else if(e.classify.includes(this.input)){
        return e
       }else if(e.username.includes(this.input)){
        return e
       } else if(e.company.includes(this.input)){
        return e
       } else if(e.status.includes(this.input)){
        return e
       }
      })
    }
  },
  methods: {
  Time(){
    if(this.t){
      clearTimeout(this.t)
    }
    this.t=setTimeout(()=>{
      if(this.listData.length==0){

      }else{
         this.$emit('fun',this.searchData)
      }
     
    },500)
  },
   funInput(){
      // console.log(this.listWorkData);
    this.Time()
   }
  },
  mounted () {
  
  },
}
</script> 

