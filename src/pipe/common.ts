import XEUtils from "xe-utils/methods";


export const formatMoney = (value: number, bd: number = 2) => {
  return value.toFixed(bd)
}

export const formatTime = (value: number, formater: string = 'yyyy-MM-dd HH:mm') => {
  return XEUtils.toDateString(value, formater)
}

export const formatRate = (value: number) => {
  return (value * 100).toFixed(2) + '%'
}

export const orderStatus = (status: number) => {
  switch (status) {
    case 1:
      return '待接单'
    case 2:
      return '辅助中'
    case 3:
      return '待确认'
    case 4:
      return '已成功'
    case 5:
      return '已失败'
    case 6:
      return '已放弃'
    case 7:
      return '申诉中'
    default:
      break
  }
}

export const insert_flg = (str: string) => {
  const rpStr = str.substring(str.length-8,str.length-4);

  return str.replace(rpStr,'****')
}

// export const insert_flg = (str: string, flg: string, sn: number) => {
//   let newstr = "";
//   for (let i = 0; i < str.length; i += sn) {
//     let tmp = str.substring(i, i + sn);
//     newstr += tmp + flg;
//   }
//   return newstr;
// }