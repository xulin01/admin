<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="square">
    <!-- <el-page-header @back="goBack" content="工单广场"> </el-page-header> -->

    <el-button class="mal" type="text">
      <el-col :span="26">
        <el-card shadow="hover" v-for="item in listData" :key="item.id">
          <ul @click="ulit(item.id, item.username)">
            <li>问题:&nbsp; {{ item.title }}</li>
            <li>开始时间：{{ item.createtime }}</li>
            <li>工单号：{{ item.tradceing }}</li>
            <li>公司名称：{{ item.company }}</li>
            <li>项目负责人:{{ item.username }}</li>
            <li>当前状态:{{ item.status }}</li>
           
          </ul>
         <el-button
            class="me"
            :plain="true"
            @click="rest(item.id, item.username)"
            >接受</el-button >
        </el-card>
      </el-col>
    </el-button>

    <!-- 查看信息 -->
    <el-dialog
      class="mou"
      title="工单详情"
      :visible.sync="dialogVi"
      width="30%"
      fullscreen
    >
      <ul id="ull">
        <li>问题:{{ ulitData.title }}</li>
        <li v-html="ulitData.content"></li>
      </ul>
    </el-dialog>

    <!-- 领取 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定接受此工单么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="reset(sone, stwo)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getPs } from "@/api/request.js";

export default {
  data() {
    return {
     token:null,
      listData: [],
      dialogVi: false,
      dialogVisible: false,
      pstData: [],
      ulitData: [],
      sum: 0,
      uname: "",
      su: 0,
      usname: "",
      sone: 0,
      stwo: "",
      sess: "",
    };
  },
  mounted() {
    this.getPt();
  },
  methods: {
    // 获取未完成工单
    async getPt() {
      const { data: res } = await getPs();
      if (res.code === 200) {
        this.listData = res.data;
      }
    },
    // 接受工单

    te() {
      const axios = require("axios");
      // eslint-disable-next-line no-undef
      axios
        .post("workorder/getWork", { id: this.sum, username: this.sess })
        .then((res) => {
          return res;
        })
        .catch((error) => {});
    },

    // 查看工单
    tes() {
      const axios = require("axios");
      // eslint-disable-next-line no-undef
      axios
        .post("workorder/viewWork", { id: this.su, username: this.usname })
        .then((res) => {
          this.ulitData = res.data.data[0];
        })
        .catch((error) => {});
    },

    rest(id, un) {
      this.dialogVisible = true;
      this.sone = id;
      this.stwo = un;
    },
    reset(pid, nam) {
      this.sum = pid;
      this.username = nam;
      this.sess = sessionStorage.getItem("token_name");
      this.te();
      location.reload();
    },

    ulit(pid, usn) {
      this.dialogVi = true;
      this.su = pid;
      this.usname = usn;
      this.tes();
    },
  },
};
</script>
<style scoped>
#square {
  width: 100%;
  height: 100%;
  padding: 20px 50px;
  overflow: hidden;
  box-sizing: border-box;
}

#square .el-card {
  margin-top: 20px;
  width: 120%;
  padding: 10px 10px;
  position: relative;
}

#square .el-card .el-button {
  display: inline-block;
  position: absolute;
  top: 12px;
  right: 15px;
}

#square .el-card ul {
  /* width: 80%; */
  height: 50px;
  list-style: none;
  /* display: inline-block; */
  text-align: center;
}

#square .el-card ul li {
  width: 210px;
  height: 30px;
  line-height: 40px;
  float: left;
}
.el-dialog #ull {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.el-dialog #ull li {
  width: 30%;
  height: 380px;
}
.el-dialog #ull li p img {
  width: 100%;
  height: 100%;
  text-align: center;
}
/deep/.el-dialog #ull li p img {
  width: 100%;
  height: 100%;
}
#square .mou ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
}


/deep/.el-card__body {
  padding: 0;
}
::-webkit-scrollbar {
  display: none;
}
</style>