<template>
  <div ref="outer" class="outer-main">
    <van-nav-bar
      class="bar"
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="main-content">
      <van-pull-refresh
        style="flex: 1"
        v-model="refreshing"
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-grid style="margin-top: 10px" :gutter="10" :column-num="2">
            <van-grid-item
              @click="showModal(item)"
              :key="index"
              v-for="(item, index) in qrGroupList"
              class="card-item"
            >
              <img
                width="100%"
                height="150px"
                :ref="'imageDom' + index"
                :src="item.url"
              />
              <div class="title">
                {{ item.name + Number(index + 1) + "群" }}
              </div>
            </van-grid-item>
          </van-grid>
        </van-list>
      </van-pull-refresh>
    </div>

    <!--    <van-dialog class="detail-modal" v-model="show" title="预览" show-cancel-button>-->
    <!--      <img width="100%" height="300px" :src="showUrl"/>-->
    <!--    </van-dialog>-->

    <van-image-preview v-model="show" :images="showUrlList">
    </van-image-preview>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Dialog } from "vant";
import html2canvas from "html2canvas";
import { systemApi } from "../api";

@Component({
  name: "detail",
  components: {},
})
export default class extends Vue {
  /*---Data Start---*/
  @Prop({ default: "" }) public prop: any;
  private countDownCom: any = null;
  private title: string = "";
  private titleOrg: string = "";
  private show: boolean = false;
  private showUrl: string = "";
  private showUrlList: string[] = [];

  private imgUrl: string = "";
  private qrGroupList: any[] = [];

  private loading: boolean = false;
  private finished: boolean = false;
  private refreshing: boolean = false;
  private queryData: any = {
    token: "",
    class_name: "", //分类名称
    page: 1, //第几页
    limit: 10, //每页数量
  };
  private bjGroup = [
    {
      name: "通州",
      url: "https://single.pplu.vip/tongzhou.png",
    },
    {
      name: "朝阳",
      url: "https://single.pplu.vip/chanyang.png",
    },
    {
      name: "丰台",
      url: "https://single.pplu.vip/fengtai.png",
    },
    {
      name: "顺义",
      url: "https://single.pplu.vip/shunyi.png",
    },
    {
      name: "昌平",
      url: "https://single.pplu.vip/changping.png",
    },
    {
      name: "石景山",
      url: "https://single.pplu.vip/shijingshan.png",
    },
    {
      name: "大兴",
      url: "https://single.pplu.vip/daxing.png",
    },
    {
      name: "东城",
      url: "https://single.pplu.vip/xicheng.png",
    },
    {
      name: "西城",
      url: "https://single.pplu.vip/tongzhou.png",
    },
    {
      name: "海淀",
      url: "https://single.pplu.vip/haidian.png",
    },
  ];

  /*---Data End---*/

  /*---Computed Start---*/
  get dataAdd() {
    return null;
  }

  /*---Computed End---*/

  /*---Lifecycle Start---*/
  private created(): void {}

  private async mounted() {
    // this.queryData.token = this.$route.params.token;

    if (this.$route.params.type) {
      this.title = decodeURI(this.$route.params.type);
      // this.titleOrg = this.$route.params.type
      // this.queryData.class_name = this.$route.params.type
      // this.queryData.class_name = decodeURI(this.$route.params.type);
    } else {
      this.$router.replace({
        name: "index",
      });
    }
  }

  private showModal(item: any) {
    this.show = true;
    this.showUrl = item.url;
    this.showUrlList = [item.url];
  }

  private saveToPic(index: number) {
    return;

    // @ts-ignore
    const ref: any = this.$refs["imageDom" + index][0];
    // const ref: any = this.$refs.outer
    // debugger

    html2canvas(ref, { useCORS: true }).then(
      (canvas: { toDataURL: (arg0: string) => any }) => {
        // 转成图片，生成图片地址
        this.imgUrl = canvas.toDataURL("image/png");
        //保存图片
        var alink = document.createElement("a");
        alink.href = this.imgUrl;
        alink.download = "picture"; //图片名
        alink.click();
      }
    );
  }

  onLoad() {
    this.qrGroupList = [];

    setTimeout(async () => {
      if (this.refreshing) {
        this.qrGroupList = [];
        this.refreshing = false;
        this.queryData.page = 1;
      }

      // mock
      // for (let i = 0; i < 10; i++) {
      // this.qrGroupList.push(
      //   {
      //     "name": "佛罗伦萨代购群",
      //     "class_name": "代购群",
      //     "url": "http://www.wwqun.com/UploadFile/Picture/2020-5/20200526220303261.jpg",
      //     "create_time": 1601623849,
      //     "id": 3914
      //   },
      // );
      // }

      this.qrGroupList = this.bjGroup.filter(
        (item: any) => item.name === this.title
      );

      if (this.qrGroupList.length >= 1) {
        this.finished = true;
      }

      // const res = await systemApi.getDetailInf(this.queryData);

      // if (res.code !== 0) {
      //   this.finished = true;
      //   this.loading = false;
      //   return
      // }

      // this.qrGroupList = [...this.qrGroupList, ...res.data.list]
      // this.queryData.page++;
      // this.loading = false;

      // if (this.qrGroupList.length >= res.data.count) {
      //   this.finished = true;
      // }
    }, 500);
  }

  onRefresh() {
    // 清空列表数据
    this.finished = false;

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    this.loading = true;
    this.onLoad();
  }

  /*---Lifecycle End---*/

  /*---Action Start---*/
  private onClickLeft() {
    this.$router.go(-1);
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
.title {
  text-align: center;
  margin-top: 5px;
  font-size: 16px;
  color: #333;
}
.main-content {
  display: flex;
  flex-direction: column;
}
</style>

<style lang="scss">
.card-item {
  .van-grid-item__content {
    box-shadow: 2px 6px 14px 0px #bebebe;
  }
}
</style>
