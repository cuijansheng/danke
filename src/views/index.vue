<template>
  <div class="outer-main">
    <van-nav-bar title="蛋壳维权交流平台群" />
    <van-swipe :autoplay="3000" class="swiper" indicator-color="white">
      <van-swipe-item class="item" :key="item" v-for="(item, index) in imgList">
        <van-image
          @click="bannerClick(index)"
          fit="fill"
          width="100%"
          height="100%"
          :src="item"
        />
      </van-swipe-item>
    </van-swipe>
    <div class="main-content">
      <van-tabs v-model="active">
        <van-tab title="北京租户群">
          <van-grid class="index-grid" direction="horizontal" :column-num="3">
            <van-grid-item
              @click="toDetail(item)"
              :key="item.name"
              v-for="item in groupList"
              :text="item.name + '区'"
            />
          </van-grid>

          <van-empty v-if="groupList.length === 0" description="暂无数据" />
        </van-tab>
        <van-tab style="text-align: center; margin-top: 20px" title="北京房东群">


          <van-image class="img-box"></van-image>
                    <div class="txtx-box">          暂未开放</div>
          <!-- <van-skeleton title :row="3" /> -->
          <!-- <van-skeleton title :row="3" /> -->
        </van-tab>
      </van-tabs>

      <!-- <van-divider :style="{ color: '#9c1010', borderColor: '#a85959', padding: '0 16px' }">今日最新微信群</van-divider> -->

      <div
        style="
          text-align: center;
          font-size: 12px;
          color: #999;
          position: absolute;
          bottom: 20px;
          width: 100%;
        "
      >
        Copyright 信息平台 2020 All rights reserved.
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { systemApi } from "@/api";

@Component({
  name: "index",
  components: {},
})
export default class extends Vue {
  /*---Data Start---*/
  private groupList: any[] = [];
  private token: string = "";
  private active: string = "";
  private imgList: string[] = [
    require('../assets/banner1.jpg'),
    require('../assets/banner2.jpg'),
    require('../assets/banner3.jpg'),
    require('../assets/banner4.jpg'),
    require('../assets/banner5.jpg'),
    "http://n.sinaimg.cn/spider20201128/750/w450h300/20201128/2b5d-kentcvy0578843.jpg",
    "https://p0.ssl.img.360kuai.com/t01579d9e5064e7be09.webp",
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
    // this.token = this.$route.params.token;

    this.groupList = [
      {
        name: "通州",
      },
      {
        name: "朝阳",
      },
      {
        name: "丰台",
      },
      {
        name: "顺义",
      },
      {
        name: "昌平",
      },
      {
        name: "石景山",
      },
      {
        name: "大兴",
      },
      {
        name: "东城",
      },
      {
        name: "西城",
      },
      {
        name: "海淀",
      },
    ];

    // let res = null;
    // if (this.token) {
    //   res = await systemApi.getIndex({token: this.token});
    // } else {
    //   res = await systemApi.getIndexInf();
    // }
    // if (res.data) {
    //   this.groupList = res.data
    // }
  }

  /*---Lifecycle End---*/

  /*---Action Start---*/
  private onClickLeft() {
    console.log("click left");
  }

  private toDetail(item: any) {
    this.$router.push({
      // name: 'detail',
      name:"detail",
      params: {
        type: encodeURI(item.name),
      },
    });
  }

  private getRandomColor = function () {
    return (
      "rgb(" +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 10) +
      ")"
    );
  };

  private bannerClick(index: number) {
    if (index === 5) {
      window.open(
        "https://finance.sina.com.cn/chanjing/gsnews/2020-11-28/doc-iiznezxs4087263.shtml"
      );
    } else if (index === 6) {
      window.open(
        "https://www.360kuai.com/pc/912d4deb1ccdddc46?cota=3&kuai_so=1&tj_url=so_vip&sign=360_da20e874&refer_scene=so_3"
      );
    }
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
.swiper {
  .item {
    height: 200px;
  }
}

.title {
  text-align: center;
  font-size: 20px;
}
</style>

<style lang="scss">
.index-grid {
  /*padding: 20px;*/
  padding-top: 0;
  border: 1px solid #9c1010;
  border-right: none;
  border-bottom: none;

  .van-grid-item {
    /*border: 1px solid #1ea506;*/
    border-right: 1px solid #9c1010;
    border-bottom: 1px solid #9c1010;
  }

  s .van-grid-item__text {
    color: #9c1010;
  }

  .van-grid-item__icon {
    font-size: 20px;
  }

  // .van-grid-item__text {
  //   // color: rgb(25, 137, 250);
  // }
}

// .outer-main {
//   // background: #fff
// }

.van-nav-bar {
  background-color: #b32121;
}

.van-nav-bar__title {
  color: #ffffff;
  font-weight: bold;
}

.van-nav-bar .van-icon {
  color: #ffffff;
}

.van-nav-bar__text {
  color: #ffffff;
}

.index-grid {
  height: 50%;
  overflow-y: auto;
}

.img-box{
  width: 70%;
  height: 200px;
}

.txtx-box{
  margin-top: 20px;
  color: red;
}
</style>
