// timestampToTime(timestamp) {
//   var date = new Date(chinaStandard);
//   var y = date.getFullYear();
//   var m = date.getMonth() + 1;
//   m = m < 10 ? ('0' + m) : m;
//   var d = date.getDate();
//   d = d < 10 ? ('0' + d) : d;
//   var h = date.getHours();
//   var minute = date.getMinutes();
//   minute = minute < 10 ? ('0' + minute) : minute;
//   var second = date.getSeconds();
//   second = second < 10 ? ('0' + second) : second;
//   Time = y + '-' + m + '-' + d+' '+h+':'+minute+ ':' + second;
//   },

// 格式化时间
export function timestampToTime(timestamp) {
  const date = new Date(timestamp);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
 return y + '-' + m + '-' + d
  }