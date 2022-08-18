import axios from 'axios'

axios.defaults.baseURL ='http://8.144.8.236:8056/'
axios.defaults.timeout=3000
//客服
//#region
// 获取工单
export function allworkorder(){
  return axios({
    method:'get',
    url:'workorder/allworkorder'
  })
}
//删除工单
export function  popWorkorder(data){
  return axios({
    method:'post',
    url:'workorder/popWorkorder',
    data:data
  })
}
//#endregion


//技术
//#region
//完成项目
 export function judgeWorkOrder(data){
  return axios({
    method:'post',
    url:'workorder/judgeWorkOrder',
    data:data
  })
 }
//  开始项目
export function startWork(data){
  return axios ({
    method:'post',
    url:'workorder/startWork',
    data:data
  })
}
//endregion

// 管理
// #region
// 完成项目
 export function finishWork(data){
     return axios({
      method:'post',
      url:'workorder/finishWork',
      data:data
     })
 }
//  驳回项目
 export function rejectWorkOrder(data){
  return axios({
    method:'post',
    url:"workorder/rejectWorkOrder",
    data:data
  })
 }
//  分配工单
 export function assign(data){
  return axios({
    method:'post',
    url:"workorder/assign",
    data:data
  })
 }
//  获取日志
 export function ViewWorkLog(data){
  return axios({
    method:'post',
    url:'workorder/ViewWorkLog',
    data:data
  })
 }
//  添加日志
export function AddWorkLog (data){
  return axios({
    method:'post',
    url:'workorder/AddWorkLog',
    data:data
  })
}
  export function PopLog(data){
    return axios({
      method:'post',
      url:'workorder/PopLog',
      data:data
    })
  }
// #endregion




