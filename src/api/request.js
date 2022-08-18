import axios from 'axios'
axios.defaults.baseURL ='http://8.144.8.236:8056/'
axios.defaults.timeout = 3000
// 管理页面
//#region

// 获取项目信息
export function getItemData(data) {
  return axios({
    method: 'post',
    url: 'project/allProjects',
    headers: {
      ContentType: { "key": "Content-Type", "value": "multipart/form-data" }
    },
    data: data
  })
}
// 未分配的工单
export function getPs() {
  return axios({
    method: 'get',
    url: 'workorder/communityWork',
    headers: {
      ContentType: { "key": "Content-Type", "value": "multipart/form-data" }
    },
  })
}
// 获取项目负责人信息
export function getNameData() {
  return axios.get('user/showuser')
}
// 分配项目
export function setData(postData) {
  return axios({
    method: 'post',
    url: 'project/assign',
    data: postData,
    headers: {
      ContentType: { "key": "Content-Type", "value": "multipart/form-data" }
    },
  })
}
// 获取项目进度
export function getPop(data) {
  return axios({
    method: 'post',
    url: 'project/ViewProjectLog ',
    data: data,
  })
}
// 添加项目
export function getAddData(data) {
  return axios({
    method: 'post',
    url: 'project/addProject',
    data: data
  })
}
// 获取所有分类
export function getAllClassify() {
  return axios({
    method: 'get',
    url: 'project/allClassify'
  })
}
// 驳回
export function getReject(data) {
  return axios({
    method: 'post',
    url: 'project/rejectProject',
    data: data
  })
}
//  项目完成

export function getSucceed(data) {
  return axios({
    method: 'post',
    url: 'project/finishProject',
    data: data
  })
}
//#endregion

//  技术页面
//#region 
export function getTechSuccess(data) {
  return axios({
    method: 'post',
    url: 'project/startProject',
    data: data
  })
}
//  项目完成
export function judgeProject(data) {
  return axios({
    method: 'post',
    url: 'project/judgeProject',
    data: data
  })
}
//  添加日志
export function AddProjectLog(data) {
  return axios({
    method: 'post',
    url: 'project/AddProjectLog',
    data: data
  })
}
//#endregion 


// 客服页面
//  #region
//  添加工单
export function addWorkOrder(data) {
  return axios({
    method: 'post',
    url: 'workorder/addWorkOrder',
    data: data
  })
}
//  #endregion

// #region
// 请求项目进度
export function viewProcess(data) {
  return axios({
    method: 'post',
    url: 'process/viewProcess',
    data: data
  })
}
   // #endregion

// 搜索功能
 export function find(data){
  return axios({
    method: 'post',
    url: 'project/find',
    data: data
  })
 }
//  暂停功能
export function Pause(data){
  return axios({
    method: 'post',
    url: 'project/pause',
    data: data
  })
}
//重开项目R
export function Restart(data){
  return axios({
    method: 'post',
    url: 'project/restart',
    data: data
  })
}
// 客户分层
export function updateDegree(data){
  return axios({
    method:'post',
    url: 'project/updateDegree',
    data: data
  })
}
// 获取所有客服
export function customer(){
  return axios({
    method:'get',
    url: 'user/customer',
  })
}
// 获取自己工单
export function selfWorkorder(data){
  return axios({
    method:'post',
    url:'workorder/selfWorkorder',
    data:data
  })
}
// 待处理工单
export function pendingWork(data){
  return axios({
    method:'post',
    url:'workorder/pendingWork',
    data:data
  })
}
// 任务
export function viewtask(data){
  return axios({
    method:'post',
    url:'workdesk/viewtask',
    data:data
  })
}
// 已完成项目
export function doneProjects(data){
  return axios({
    method:'post',
    url:'project/doneProjects',
    data:data
  })
}
// 问题项目

export function matterproject(data){
  return axios({
    method:'post',
    url:'project/matterproject',
    data:data
  })
}