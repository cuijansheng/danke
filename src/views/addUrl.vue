<template>
  <div class="outer-main page-addurl">
    <van-field
    style="margin-bottom:20px"
      v-model="linkUrl"
      rows="1"
      label="URL:"
      type="textarea"
      placeholder="点击生成URL"
    />

    <div>
      <van-button
        style="margin-right: 10px"
        :disabled="linkUrl === ''"
        v-clipboard:copy="linkUrl"
        v-clipboard:success="onCopy"
        type="primary"
        >复制链接</van-button
      >
      <van-button
        style="margin-right: 10px"
        @click="addUrlClickHandel"
        type="info"
        >生成链接</van-button
      >
      <van-button @click="showPickerHandel" type="warning"
        >{{ columnsString }}有效期</van-button
      >
    </div>

    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Toast } from "vant";
import { systemApi } from "@/api";
@Component({
  name: "addUrl",
  components: {},
})
export default class extends Vue {
  /*---Data Start---*/
  @Prop({ default: "" }) public prop: any;
  private linkUrl: string = "";
  private showPicker: boolean = false;
  private expires: number = 86400;
  private columns: string[] = ["一天", "一月", "一季", "一年"];
  private columnsString: string = "一天";

  /*---Data End---*/

  /*---Computed Start---*/
  get dataAdd() {
    return null;
  }

  /*---Computed End---*/

  /*---Lifecycle Start---*/
  private created(): void {}

  private async mounted() {}

  /*---Lifecycle End---*/

  /*---Action Start---*/
  private onClickLeft() {
    console.log("click left");
  }

  private onCopy() {
    Toast.success("复制成功");
  }

  private async addUrlClickHandel() {
    let res = await systemApi.getUrl({ expires: this.expires });
    this.linkUrl = `https://xiaolaba-qun.pplu.vip/#/guest/${res.data.token}`
  }
  private showPickerHandel() {
    this.showPicker = true;
  }

  private onConfirm(val: string) {
    this.columnsString = val;

    switch (val) {
      case "一天":
        this.expires = 86400;
        break;
      case "一月":
        this.expires = 86400 * 30;
        break;
      case "一季":
        this.expires = 86400 * 90;
        break;
      case "一年":
        this.expires = 86400 * 356;
        break;
    }

    this.showPicker = false;
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
.page-addurl {
  padding-top: 20%;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
}

.text {
  margin-bottom: 20px;
}
</style>

<style lang="scss">
</style>
