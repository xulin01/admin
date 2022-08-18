<template>
  <div id="gong">
    <div class="box-gj">
    <div class="gj" @click="hrf(item)" v-for="item in list" :key="item.id">
    <div class="box">
      <img :src="require('@/assets/'+item.sr)" alt="logo">
      <span>{{item.text}}</span>
      <p>{{item.p}}</p>
    </div>
   </div>
    </div>
  </div>
</template>

<script>
export default {
      data() {
        return {
          list:[
          {id:1,text:'蓝湖',sr:'imgs/1.jpg', p:'高效的产品设计协作平台', src:'https://lanhuapp.com/'},
          {id:2,text:'站酷',sr:'imgs/2.jpg', p:'原创潮玩设计', src:'https://www.zcool.com.cn/'},
          {id:3,text:'千图',sr:'imgs/3.jpg', p:'千万海报图纸设计', src:'https://www.58pic.com/'},
          {id:4,text:'摄魂网',sr:'imgs/5.jpg', p:'图片素材可商用', src:'https://699pic.com/'},
          {id:5,text:'CSDN',sr:'imgs/6.png', p:'程序员平台', src:'https://www.csdn.net/'},
          {id:6,text:'github',sr:'imgs/7.jpg', p:'程序员开源平台', src:'https://github.com/'},
          {id:7,text:'gitee',sr:'imgs/8.png', p:'程序员开源平台', src:'https://gitee.com/login'},
          {id:8,text:'稀土',sr:'imgs/9.jpg', p:'程序员分享平台', src:'https://juejin.cn/'},
          {id:9,text:'设计师资源',sr:'imgs/4.png', p:'设计师资源', src:'http://doyoudo.com/resources'},
          {id:10,text:'百度',sr:'imgs/11.png', p:'百度就是百度', src:'https://www.baidu.com'},
          ],
        };
      },
       methods:{
            hrf(item){
              window.open(item.src)
            }
        }
}
</script>

<style scoped>

    #gong{
        width: 100%;
        height: 100vh;
      overflow: hidden;
        padding: 50px 0;
    }
    .box-gj{
      width: 60%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    margin:auto;
    }
    .gj{
      width:21%;
      height:120px;
      background-color: #f1ebeb;
      box-sizing: border-box;
      border-radius: 20px;
      cursor: pointer;
      margin-bottom:50px;
      position: relative;
      overflow: hidden;
    }
    .gj:hover{
      transform: scale(1.1);
    }
    .box{
     
       margin-left: 15px;
       margin-top: 15px;
       font-size: 15px;
       color: #999;
    }
    .gj img{
      width:49px;
      height:40%;
      border-radius:10px;
      
    }
    .gj span{
      position: absolute;
      top: 30px;
      left: 90px;
      color: #000;
    }
</style>