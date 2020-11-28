/*URL打包地址类*/
export class PathUrl {

  public pathURL: string = '';
  constructor() {
    switch (process.env.NODE_ENV) {
      case 'development':
        this.pathURL = '/api'; // 测试
        break;
      case 'production':
        this.pathURL = '/app'; // 测试打包目前修改为此地址 改为动态地址
        break;
      case 'onlinetest':
        this.pathURL = '/app'; // 测试打包目前修改为此地址 改为动态地址
        break;
    }
  }
}
