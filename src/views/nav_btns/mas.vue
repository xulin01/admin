<template>
    <div id="mage">

        <el-collapse v-model="activeNames">

            <el-collapse-item title="项目名单" name="1">
                <!-- 遍历 -->
                <el-card class="box-card" shadow="hover" v-for="(item, index) in listData" :index="index"
                    :key="item.id">
                    <el-row>

                        <!-- 项目名 -->
                        <el-col :span="8">
                            <div class="grid-content bg-purple">项目名称:&nbsp;<b>{{ item.name }}</b></div>
                            <div class="grid-content bg-purple">负责人:&nbsp;<b>{{ item.username }}</b></div>
                        </el-col>


                        <!-- 选项组-->
                        <el-col :span="8" class="shang" >

                            <el-dropdown @command="handleCommand" trigger="click" >
                                <span class="el-dropdown-link" @click="fc(index)">
                                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <!-- <span>(请先选择类型)</span> -->
                                <el-dropdown-menu slot="dropdown"  >
                                    <!-- <el-dropdown-item command="合同" index="1">合同</el-dropdown-item>
                                    <el-dropdown-item command="资料" >资料</el-dropdown-item> -->
                                    <el-dropdown-item v-for="i in k" :key="i.id" :command="i.name" >{{i.name}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <span id="sp"></span>
                        </el-col>


                        <!--上传  下载 -->
                        <el-col :span="8">
                            <div class=" grid-content bg-purple" id="me">

                                <!-- <el-button type="success" class="btns" size="small" @click="uploadBtn(item)"
                                    :disabled="leg" :index="index" ref="btn">上传图片</el-button> -->

                                <button class="btns" @click="uploadBtn(item)" @change="ff(index)" :disabled="leg"
                                    :index="index" ref="btn">上传图片</button>


                                <el-button type="success" size="small" :index="index" @click="viewImg(index)"
                                    class="ck">查看图片</el-button>

                            </div>
                        </el-col>
                    </el-row>
                </el-card>






            </el-collapse-item>
        </el-collapse>
        <!-- 上传图片 -->
        <div>
            <el-dialog title="上传图片" :visible.sync="dialogFormUpload" @close="uploadClose">
                <el-upload class="avatar-uploader" action="#" :show-file-list="false"
                    :on-change="handleAvatarChangeIcon" :auto-upload="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormUpload = false">取 消</el-button>
                    <el-button type="primary" @click="modifyUpload">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 查看图片 -->
        <el-dialog title="查看图片" :visible.sync="dialogFormView" @close="viewClose">
            <img :src="imgSrc" id="set">
        </el-dialog>








    </div>
</template>

<script>
import { getItemData } from "@/api/request.js";

export default {

    data() {
        return {
            fileList: [],
            activeNames: ['1'],
            listData: [],
            k: [],//上传的类型
            fileType: [],
            flg: false,

            imageUrl: '',
            iconformData: {
                file: '',
                projects_id: '',
                name: '',
            },
            projectID: '', // 项目id
            dialogFormUpload: false, // 上传图片

            dialogFormView: false, //查看图片
            imgData: [],
            imgSrc: '',
            leg: true,
            idx: 0,
            disb: true,
            uid: 0,
            unid: 0,    
            tyid:0

        };
    },
    mounted() {
        const tt = sessionStorage.getItem('token_uid')
        this.uid = tt
        this.getList({ uid: this.uid });
        this.postList();
        
    },
    methods: {
        // 获取项目信息
        async getList(data) {
            const { data: res } = await getItemData(data);
            if (res.code === 200) {
                this.listData = res.data;
               
            }
        },

        // 获取图片
        async postList() {
            const axios = require('axios');
            const huoObj = {
                projects_id: this.unid,
                name: this.uname
            }
            await axios.post('process/download', { params: huoObj }).then(res => {
                if (res.data.code === 200) {
                    this.imgSrc = res.data.data[0].url;
                } else {
                this.imgSrc = ''
            }
            })
        },
        // 获取类型id
        async postLi(){
            const axios = require('axios');
           
            await axios.post('process/choices',{typeid:this.tyid}).then(res=>{ this.k =res.data.data;})
        },



        // 按钮禁用
        handleCommand(command) {
          
            this.uname=command;
            
            if (command) {
                this.leg = true
                this.$refs.btn[this.idx].disabled = false;
                if (this.$refs.btn[this.idx].disabled == false) {
                    this.$refs.btn[this.idx].className = 'btnss'

                }
            }

            document.querySelectorAll('#sp')[this.idx+1].innerHTML = command
        //    this.postLi()
        },


        uploadBtn(item) {
            this.dialogFormUpload = true
            this.projectID = item.id

        },
        // 判断图片格式
        handleAvatarChangeIcon(file, fileList) {
            this.imageUrl = URL.createObjectURL(file.raw);
            const isJPG = file.raw.type === 'image/jpeg'
            const isPNG = file.raw.type === 'image/png'
            const isLt2M = file.raw.size / 1024 / 1024 < 2
            this.hideUploadIcon = fileList.length >= 1;
            if (!isPNG && !isJPG) {
                his.$message.error('上传图片只能是 JPG/PNG 格式!')
                return false
            } else if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!')
                return false
            }
             else if (isLt2M && (isPNG || isJPG)) {
                this.iconformData.file = file.raw;//图片的url
                this.iconformData.projects_id = this.projectID;
                this.iconformData.name = this.uname;
            }
        },
        // 手动上传图片
        async modifyUpload() {
            const formData = new FormData()
            for (const key in this.iconformData) {
                formData.append(key, this.iconformData[key]);//传参改为formData格式
            }
            const res = await this.$axios.post('/process/upload', formData)
            if (res.data.code === 200) {
                this.$message({
                    type: 'success',
                    message: '上传成功'
                })
                this.dialogFormUpload = false
            }else{
                this.$message({
                    type: 'error',
                    message: '上传内容格式过大，请重新上传！',
                     
                })
                  this.imgSrc = ''
            
            }
            this.imageUrl = ''

        },

        uploadClose() {
            this.dialogFormUpload = false
        },

        // 查看图片
        viewImg(index) {
            this.dialogFormView = true;
            this.unid = this.listData[index].id
            this.postList()
            if (this.iconformData.name !== '' && this.unid !== '') {
                // this.imgSrc = ''
                this.postList();
            } else {
                this.imgSrc = ''
            }

        },
        viewClose() {
            this.dialogFormView = false
        },
        // 获取索引
        fc(index) {
            this.idx = index;
 this.tyid=this.listData[this.idx].typeid

            this.postLi()
        },
       

    }
}

</script>

<style scoped>
.el-page-header {
    margin: 20px 0 20px 30px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.el-card {
    margin: 20px;
}


.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.btns {
    width: 80px;
    height: 32px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    cursor: not-allowed;
}

.btnss {
    width: 80px;
    height: 32px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    cursor: pointer;
}

#me {
    display: flex;
}

#set {
    width: 100%;
}

#sp {
    color: orange;
    margin-left: 30px;
}
</style>