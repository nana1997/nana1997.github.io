<template>
    <div class="goods">
        <GoBack />
        <van-swipe class="goods-swipe" v-if="goodsDetail" :autoplay="3000">
            <van-swipe-item v-for="(item,index) in goodsDetail.goodsSwiperImg" :key="index">
                <img v-if="item.swiperImg" :src="item.swiperImg" />
            </van-swipe-item>
        </van-swipe>

        <van-cell-group>
            <van-cell>
                <div class="goods-title">{{ info.goodsname }}</div>
                <div class="goods-price">￥{{info.goodsprice}}</div>
            </van-cell>
            <van-cell class="goods-express">
                <van-col span="10">运费：免运费</van-col>
                <van-col span="14">剩余：{{ info.goodscount }}件</van-col>
            </van-cell>
        </van-cell-group>
        <div style="font-size:.26rem;color:#aaa;text-align:center;margin-top: .2rem;">
            <span>骆驼自营爆品 - - - - 7天无忧退换货- - - - 免快递费</span>
        </div>

        <van-cell-group class="goods-cell-group">
            <van-cell title="请选择商品、数量" @click="falgshow">
                {{select}} {{size1}}
                <van-icon name="arrow" />
            </van-cell>
        </van-cell-group>

        <van-action-sheet v-model="show" title="请选择商品规格">
            <div class="info" v-if="goodsDetail">
                <div class="left" v-for="(item4,index4) in goodsDetail.goodsModel" :key="index4">
                    <img v-if="item4.color===isShow" :src="item4.modelImg" />
                </div>
                <div class="right">
                    <h2>￥{{info.goodsprice}}</h2>
                    <p>
                        <mark>已选：</mark>
                        <span>{{select}} {{size1}}</span>
                    </p>
                </div>
            </div>
            <p class="p">颜色</p>
            <ul class="color cl" v-if="goodsDetail">
                <li
                    class="item3"
                    v-for="(item3,index3) in goodsDetail.goodsModel"
                    :key="index3"
                    @click="changeModelImg(item3,$event)"
                >{{item3.color}}</li>
            </ul>
            <p class="p">尺码</p>
            <ul class="size cl">
                <li
                    class="item"
                    v-for="(item,index) in size"
                    :key="index"
                    @click="selectSize(item,$event)"
                >{{item.txt}}</li>
            </ul>
            <p class="p">数量</p>
            <van-stepper v-model="num" class="add" />
        </van-action-sheet>

        <ul v-if="goodsDetail">
            <li v-for="(item2,index2) in goodsDetail.goodsDetailImg" :key="index2">
                <img :src="item2.detailImg" alt />
            </li>
        </ul>

        <van-goods-action>
            <van-goods-action-icon icon="chat-o" @click="toChat">客服</van-goods-action-icon>
            <van-goods-action-icon icon="cart-o" @click="toCart">购物车</van-goods-action-icon>
            <van-goods-action-button type="warning" @click="addCart">加入购物车</van-goods-action-button>
            <van-goods-action-button type="danger">立即购买</van-goods-action-button>
        </van-goods-action>
    </div>
</template>

<script>
import { Dialog } from "vant";
import GoBack from "@/components/GoBack.vue";
import { mapState } from "vuex";
export default {
    data() {
        return {
            show: false,
            isShow: "白色",
            id: "",
            info: {},
            num: 1,
            goodsDetail: {},
            size: [{ txt: "M" }, { txt: "L" }, { txt: "XL" }, { txt: "XXL" }],
            select: "请选择",
            size1: "",
            style: "1px #f00 solid",
            img: "",
            username: ""
        };
    },
    components: {
        GoBack,
        [Dialog.Component.name]: Dialog.Component
    },
    methods: {
        falgshow() {
            this.show = true;
        },
        reqGoodsDetail() {
            const id = this.id;
            this.$axios.post("/goods/detail", { id }).then(res => {
                const { code, msg, info } = res.data;
                this.info = info;
                this.goodsDetail = info.goodsDetail;
                // console.log(info);
                this.isShow = this.goodsDetail.goodsModel[0].color;
            });
        },
        increase() {
            this.num++;
        },
        decrease() {
            if (this.num > 1) {
                this.num--;
            }
        },
        changeModelImg(item, event) {
            this.isShow = item.color;
            this.select = item.color;
            this.img = item.modelImg;
            // console.log(item);
            let liDom = document.getElementsByClassName("item3");
            for (let i = 0; i < liDom.length; i++) {
                liDom[i].style = "border:1px #aaa solid";
            }
            event.target.style.border = "1px #f00 solid";
        },
        selectSize(item, event) {
            this.size1 = item.txt;
            // console.log(this.size1);
            let li_dom = document.getElementsByClassName("item");
            for (let i = 0; i < li_dom.length; i++) {
                li_dom[i].style = "border:1px #aaa solid";
            }
            event.target.style.border = "1px #f00 solid";
        },
        toCart() {
            this.$router.push("/cart");
        },
        toAsk() {
            this.$router.push("/ask");
        },
        toChat() {
            this.$router.push("/chat");
        },
        addCart() {
            if (this.img && this.size1) {
                // console.log(this.isShow)
                // console.log(this.size1)
                this.$store
                    .dispatch("myAction", {
                        goodsid: this.id,
                        goodsname: this.info.goodsname,
                        goodsprice: this.info.goodsprice,
                        goodsNum: this.num,
                        goodsSize: this.size1,
                        goodsColor: this.isShow,
                        modelImg: this.img
                    })
                    .then(res => {
                        const { code, msg } = res.data;
                        console.log(res.data);
                        this.username = sessionStorage.getItem("username");
                        if (code == 1 && this.username) {
                            // 当添加成功，就弹出下面这个提示框
                            // if (confirm("加入购物车成功，是否进入购物车列表"))
                            //     this.$router.push("/cart");
                            Dialog.confirm({
                                message: "加入购物车成功，是否进入购物车列表"
                            })
                                .then(() => {
                                    // on confirm
                                    this.$router.push("/cart");
                                })
                                .catch(() => {
                                    // on cancel
                                });
                        } else {
                            // alert(msg + ",请先登录");
                            Dialog.confirm({
                                message: msg+"，请先登录"
                            })
                                .then(() => {
                                    // on confirm
                                    this.$router.push("/login");
                                })
                                .catch(() => {
                                    // on cancel
                                });
                        }
                    });
            } else {
                this.show = true;
            }
        }
    },
    mounted() {
        // // 获取路由信息对象中的params,这是当前路由的参数集合,再取里面的id
        this.id = this.$route.params.id;
        // 请求获取商品信息
        this.reqGoodsDetail();
    },
    computed: {
        // 如果有多个计算属性,添加mapState的时候,需要使用扩展运算符
        ...mapState(["token"])
    }
};
</script>

<style lang="less" scoped>
.goods {
    padding-bottom: 50px;
    &-swipe {
        img {
            width: 100%;
            display: block;
        }
    }
    &-title {
        font-size: 16px;
    }
    &-price {
        color: #f44;
    }
    &-express {
        color: #999;
        font-size: 12px;
        padding: 5px 15px;
    }
    &-cell-group {
        margin: 15px 0;
        .van-cell__value {
            color: #999;
        }
    }
    &-tag {
        margin-left: 5px;
    }
}
ul li {
    img {
        width: 100%;
    }
}
.info {
    height: 2.5rem;
    margin-top: 0.3rem;
}
.left {
    float: left;
    margin-left: 0.9rem;
}
.left img {
    width: 2rem;
    height: 2rem;
}
.right {
    float: left;
    margin-left: 0.8rem;
}
.right h2 {
    font-size: 0.4rem;
    color: #ea7d51;
    margin-top: 0.4rem;
}
.right p {
    line-height: 0.8rem;
}
.right p mark {
    background: none;
    color: #aaa;
}
.p {
    line-height: 0.8rem;
    padding-left: 0.3rem;
}
.size li {
    width: 1rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    float: left;
    padding: 0.1rem;
    border: 1px #aaa solid;
    margin-left: 0.25rem;
    margin-top: 0.2rem;
}
.color li {
    float: left;
    padding: 0.1rem;
    border: 1px #aaa solid;
    margin-left: 0.25rem;
    margin-top: 0.2rem;
}
.add {
    margin-left: 0.3rem;
    margin-bottom: 0.3rem;
}
.ul {
    height: 0.8rem;
    padding-left: 0.3rem;
}
.ul .buy {
    float: left;
    width: 40%;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    background-color: #007bff;
    border-radius: 3px;
    color: #fff;
    margin-left: 0.3rem;
}
</style>