import router from "@/router";

/**
 *
 *
 * @return {
 *   android
 *   iPhone
 *   blackApp
 * }
 */
export const isBlackApp = () => {
  const u = navigator.userAgent.toLowerCase();
  console.log(u);
  // alert(u.indexOf('micromessenger') > -1);
  return {
    android: u.indexOf('android') > -1 || u.indexOf('linux') > -1, //android终端或者uc浏览器
    iPhone: u.indexOf('iphone') > -1 || u.indexOf('mac') > -1, //是否为iPhone或者QQHD浏览器
    // blackApp: /micromessenger/i.test(u) || u.indexOf('weibo') > -1 || u.indexOf('qq') > -1 || u.indexOf('mqqbrowser') > -1 //判断浏览器是否为头部APP(微信,微博，qq，QQ浏览器)
    blackApp: u.indexOf('micromessenger') > -1 //判断浏览器是否为微信
  };
};

export const routerTo = (name: string) => {
  router.push(name)
}