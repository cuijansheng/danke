/*HTTP Axios 封装 APIlist*/
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { Toast } from 'vant';
import { PathUrl } from '@/services/PathUrl';
import { IApiObj } from "@/interface/modules/common";
import Cookies from 'js-cookie'
import router from "@/router";

// service 循环遍历输出不同的请求方法
const instance: any = axios.create({
  baseURL: new PathUrl().pathURL,
  timeout: 1000 * 60
});
// 包裹请求方法的容器
// const Http: any  = null;

// let loadingInstance: any = null;

// 请求方法
const Http: any = (api: IApiObj) => {
  return async function (params: any, isFormData = false, config: AxiosRequestConfig = {}) {
    const url = api.url;
    let newParams: any = {};
    // let mergeConfig = Object.assign(config,api.config);

    // contact-type是否是form-data的判断
    if (params && isFormData) {
      newParams = new FormData()
      for (const i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }

    // 不同请求的判断
    let response = {} // 请求的返回值
    if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
      try {
        response = await instance[api.method](api.url, newParams, config)
      } catch (err) {
        response = err
      }
    } else if (api.method === 'get' || api.method === 'delete') {
      config.params = newParams
      try {
        response = await instance[api.method](api.url, config)
      } catch (err) {
        response = err
      }
    }
    return response
  }
}


// for (const key in service) {
//
// }

// 拦截器
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // console.log('request拦截器：',config)

  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });

  if (!config.headers.Authorization) {
    config.headers.Authorization = Cookies.get('USER_TOKEN'); // 添加token
  }

  let tstr = new Date().getTime() / 1000;
  config.params = {
    ...config.params,
    _t: tstr  //添加时间戳 解决接口缓存
  };
  return config
}, (err: AxiosError) => {
  // 请求错误
  console.log('---request错误---：');
  console.error(err);
  Toast.clear()
  // Message.error(err);
  Toast.fail(err)
  // loadingInstance.close();
});


instance.interceptors.response.use((res: AxiosResponse | any) => {
  console.log('---response拦截器-fulfilled：', res);
  console.log()
  // loadingInstance.close();
  Toast.clear()

  // 特殊处理上传回调
  if (res.config.uploadTag) {
    return res.data
  }

  //特殊处理下载接口
  if (Object.prototype.toString.call(res.data) === '[object Blob]') {

    //暂时判断方案为判断返回type，json的话说明是报错了
    if (res.data.type === 'application/json') {
      // Message.error('Download failed.');
      Toast.fail('Download failed.')
      return false
    }

    return {
      data: res.data,
      headers: res.headers
    }
  }


  //处理接口返回错误
  if (res.data.code !== 0) {
    // Message.error(res.data.message);
    // if(!res.config.withOutMsg){
    //   Toast.fail(res.data.msg)
    // }

    if(res.data.code ===401){
      Cookies.remove('USER_TOKEN')
      Cookies.remove('USER_ID')
      router.replace('login')
    }

    if(res.data.code===3001){
      router.replace({
        name: '404',
      })
    }

    return false
  }

  return res.data
}, (err: AxiosError) => {
  console.log('---response拦截器-reject---：');
  console.dir(err);
  // loadingInstance.close();
  Toast.clear()
  Toast.fail(err.message)
  return false
});

export default Http
