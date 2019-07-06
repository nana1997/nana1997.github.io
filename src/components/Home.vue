<template>
    <div>
        <div class="lunbo">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in imgs" :key="index">
                    <img :src="item.src" alt>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="slogan">
            <span>骆驼自营爆品</span>
            <span>7天无忧退换货</span>
            <span>快递包邮</span>
        </div>
        <van-notice-bar
            color="#1989fa"
            background="rgba(0,0,0,0)"
            left-icon="volume-o"
            mode="closeable"
            scrollable
        >春风十里不如为你遮风挡雨!</van-notice-bar>
        <div class="nav">
            <ul>
                <li v-for="(item,index) in list" :key="index" @click="toClassify">
                    <a>
                        <img :src="item.img" alt>
                        {{item.txt}}
                    </a>
                </li>
            </ul>
        </div>
        <ul class="goods">
            <li v-for="(item2,index2) in list2" :key="index2" @click="toClassify">
                <p>
                    {{item2.text}}
                    <van-icon name="arrow" class="i2"/>
                </p>
                <div>
                    <img :src="item2.img" alt>
                </div>
            </li>
        </ul>
        <div class="bottom">
            <p>客服电话:15670275287</p>
            <p>京ICP备12001814号 Copyright © 北京骆驼鞋业有限公司</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgs: [
                {
                    src:
                        "https://topic.camel.com.cn/module/wap_home_banner_main/efbfd052-dabb-4029-97fa-769f0b551b97.jpg!/fw/540"
                },
                {
                    src:
                        "https://topic.camel.com.cn/module/wap_home_banner_main/a64262e8-69d0-4437-80e9-822a64b83c17.jpg!/fw/540"
                },
                {
                    src:
                        "https://topic.camel.com.cn/module/wap_home_banner_main/20eca83d-cc5f-4702-9b21-e60972b415a3.jpg!/fw/540"
                },
                {
                    src:
                        "https://topic.camel.com.cn/module/wap_home_banner_main/bb08726c-0b05-49f7-8e1b-40906300a46f.jpg!/fw/540"
                }
            ],
            list: [
                {
                    id: 1,
                    txt: "户外",
                    path: "outdoors",
                    name: "outdoors",
                    img:
                        "https://img01.camel.com.cn/product_class/20181211/ed9afc8b-d748-4331-be00-bfb05cc9babe.jpg!/fw/86"
                },
                {
                    id: 2,
                    txt: "运动",
                    path: "outdoors",
                    name: "outdoors",
                    img:
                        "https://img01.camel.com.cn/product_class/20181211/9fcc8c3d-39b8-4b20-993f-e8f4480c12e7.jpg!/fw/86"
                },
                {
                    id: 3,
                    txt: "瑜伽",
                    path: "app/home/outdoors",
                    name: "outdoors",
                    img:
                        "https://img01.camel.com.cn/product_class/20181211/e54aab9b-1791-4047-8879-c67ab9eb0681.jpg!/fw/86"
                },
                {
                    id: 4,
                    txt: "男鞋",
                    path: "app/home/outdoors",
                    name: "outdoors",
                    img:
                        "https://img01.camel.com.cn/product_class/20181211/41096cf2-593c-44f8-be2b-73431194bae7.jpg!/fw/86"
                },
                {
                    id: 5,
                    txt: "男装",
                    path: "app/home/outdoors",
                    name: "outdoors",
                    img:
                        "https://img01.camel.com.cn/product_class/20181211/c38d7b64-191e-4402-9330-ade2046ecd74.jpg!/fw/86"
                },
                {
                    id: 6,
                    txt: "女鞋",
                    path: "app/home/outdoors",
                    name: "outdoors",
                    img:
                        "https://img01.camel.com.cn/product_class/20181211/bb71ce69-5da2-4f00-95a5-7e07a5b48bde.jpg!/fw/86"
                },
                {
                    id: 7,
                    txt: "箱包",
                    path: "app/home/outdoors",
                    name: "outdoors",
                    img:
                        "https://img01.camel.com.cn/product_class/20181211/2a605e94-8f70-4e09-8d90-ae8c1da3f6d6.jpg!/fw/86"
                },
                {
                    txt: "全部",
                    path: "classify",
                    name: "classify",
                    img:
                        "https://img01.camel.com.cn/images/product_category_all_02.jpg"
                }
            ],
            list2: [
                {
                    text: "户外系列",
                    img:
                        "https://topic.camel.com.cn/module/wap_index_column01_main/60551fc1-6575-4541-b8f3-ab0a8885c654.jpg!/fw/540"
                },
                {
                    text: "男装系列",
                    img:
                        "https://topic.camel.com.cn/module/wap_index_column03_main/2f5d92da-be45-4093-9a57-6e897d21c174.jpg!/fw/540"
                },
                {
                    text: "女鞋系列",
                    img:
                        "https://topic.camel.com.cn/module/wap_index_column04_main/b381182c-8232-4417-9475-70f96cfcaf22.jpg!/fw/540"
                },
                {
                    text: "瑜伽系列",
                    img:
                        "https://topic.camel.com.cn/module/wap_index_yundong_yujia/015d84cf-befb-4c11-a97f-2729d13652a2.jpg!/fw/540"
                }
            ]
        };
    },
    methods:{
        toClassify(){
            this.$router.push('/classify')
        }
    }
};
</script>

<style lang="scss" scoped>
.lunbo {
    img {
        width: 100%;
    }
}
.slogan {
    width: 100%;
    height: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 0.1rem;
    background-color: #fff;
    line-height: 0.8rem;
    span {
        color: #7f2400;
        padding-left: 0.32rem;
        background: url("../assets/img/1.png") no-repeat left center;
        background-size: 0.2rem 0.2rem;
    }
}

.nav ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: #fff;
    margin-top: 0.1rem;
    padding-bottom: 0.2rem;
    li {
        width: 25%;
        a {
            display: block;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #333;
            padding-top: 0.2rem;
            img {
                width: 1.2rem;
                height: 1.2rem;
            }
        }
    }
}
.goods {
    li {
        p {
            height: 0.9rem;
            line-height: 0.9rem;
            margin: 0 0.3rem;
            font-size: 0.36rem;
            .i2 {
                float: right;
                font-size: 0.4rem;
                margin-top: 0.3rem;
                color: #ccc;
            }
        }
        div img {
            width: 100%;
        }
    }
}
.bottom {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.22rem;
    padding: 0.2rem 0;
    p {
        line-height: 0.4rem;
    }
}
</style>