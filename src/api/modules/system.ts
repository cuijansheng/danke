/*API List*/
import Http from "@/services/http";

const API_OBJECT: any = {
  getAppUrl: null,
  upload: null,
  notice: null,
  banner: null
}

const _API: any = {
  // 获取版本信息
  getIndex: {
    method: 'get',
    url: '/class_list'
  },
  getIndexInf: {
    method: 'get',
    url: '/class_list_forever'
  },
  getDetail: {
    method: 'get',
    url: '/images'
  },
  getDetailInf: {
    method: 'get',
    url: '/images_forever'
  },
  getUrl: {
    method: 'get',
    url: '/generate_code'
  },
}

Object.keys(_API).forEach((key: string) => {
  const api = _API[key];
  API_OBJECT[key] = Http(api)
})

export default API_OBJECT
