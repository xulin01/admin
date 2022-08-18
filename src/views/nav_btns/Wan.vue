<template>
    <div id="wan">
        <!-- 已完成项目 -->
        <el-col :span="18">
            <el-card shadow="hover" v-for="item in listData" :key="item.id">
                <ul>
                    <li>项目名称：{{ item.name }}</li>
                    <li>开始时间：{{ item.createtime }}</li>
                    <li>结束时间：{{ item.endTime }}</li>
                    <li>公司名称：{{ item.company }}</li>
                    <li>负责人:{{ item.username }}</li>
                    <li>当前状态：{{ item.status }}</li>
                </ul>
            </el-card>
        </el-col>




    </div>
</template>

<script>
import {doneProjects}from '@/api/request'
export default {
    name: 'wan',
    data() {
        return {
            uid: 0,
            listData: []
        };
    },
    created() {
        this.uid = sessionStorage.getItem('token_uid')
        this.getdoneProjects({ uid: this.uid })
    },
    methods:{
       async getdoneProjects(data){
       const {data:res} = await doneProjects(data)
       if(res.code===200){
        this.listData = res.data
       }
       }
        
    }
}
</script>

<style scoped>
.el-page-header {
    margin-top: 30px;
    margin-left: 30px;
}

.el-col {
    margin: 20px 0 0 50px;
    cursor: pointer;
}

.el-card {
    margin-top: 30px;
}

.el-card ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
}
</style>