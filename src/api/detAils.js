import axios from 'axios'
axios.defaults.baseURL ='http://8.144.8.236:8056/'
axios.defaults.timeout=3000
// 开始进度
export function Startprocess(data){
  return axios({
    method:'post',
    url:'process/startprocess',
    data:data
  })
}

// 完成进度
export function Finishprocess(data){
  return axios({
    method:'post',
    url:'process/finishprocess',
    data:data
  })
}
// 项目负责人
export function ProcessUser(){
  return axios({
    method:'get',
    url:'user/processUser',
  })
}
// 修改负责人
export function changeuser(data){
  return axios({
    method:'post',
    url:'process/changeuser',
    data:data
  })
}
// 添加反馈
export function addfeedback(data){
  return axios({
    method:'post',
    url:'process/addfeedback',
    data:data
  })
}
// 查看反馈
export function viewfeedback(data){
  return axios({
    method:'post',
    url:'process/viewfeedback',
    data:data
  })
}


