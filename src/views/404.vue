<template>
  <div class="outer-main">
    <div class="empty-box">
      <van-icon name="warning" />
      <div class="text">
        权限已失效
        <br />联系客服获取最新二维码信息
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { systemApi } from '@/api'
@Component({
  name: "index",
  components: {},
})
export default class extends Vue {
  /*---Data Start---*/
  @Prop({ default: "" }) public prop: any;
  private countDownCom: any = null;
  private current: number = 0;
  private groupList: any[] = [];
  private imgList: string[] = ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1705581946,4177791147&fm=26&gp=0.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601631841580&di=f6ff66f067d62c9a35c1eb300af57ba9&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201303%2F18%2F233119quyrec7to3ws3rco.jpg'];
  /*---Data End---*/

  /*---Computed Start---*/
  get dataAdd() {
    return null;
  }
  /*---Computed End---*/

  /*---Lifecycle Start---*/
  private created(): void {
  }

  private async mounted() {

  }

  /*---Lifecycle End---*/

  /*---Action Start---*/
  private onClickLeft() {
    console.log("click left");
  }

  private toDetail(item: any) {
    this.$router.push({
      name: 'detail',
      params: {
        type: encodeURI(item.name)
      }
    })
  }

  /*---Action End---*/

  /*---Watch Start---*/
  // @Watch("prop")
  // public changeTxt(newTxt: string, oldTxt: string) {
  //   console.log(`change data: ${oldTxt} to ${newTxt}`);
  // }

  /*---Watch End---*/

}
</script>

<style scoped lang="scss">
.text {
  padding-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #000;
}

.outer-main {
  display: flex;

  justify-content: center;
  align-items: center;
}

.empty-box {
  font-size: 40px;
  color: red;

  text-align: center;
  padding-bottom: 50px;
}
</style>

<style lang="scss">
</style>
