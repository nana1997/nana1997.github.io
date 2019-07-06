<template>
    <div class="waiting">
        <van-nav-bar left-text="返回" title="待付款" fixed left-arrow @click-left="goBack" />
        <ul>
            <li class="cl" v-for="(item,index) in list" :key="index">
                <div class="img">
                    <img :src="item.modelImg" />
                </div>

                <div class="content">
                    <p>{{item.goodsname}}</p>
                    <h6>
                        {{item.goodsColor}}
                        {{item.goodsSize}}码
                        {{item.goodsNum}}件
                    </h6>
                    <h5>
                        ￥{{(item.goodsprice*item.goodsNum).toFixed(2)}}
                        <span>去付款</span>
                    </h5>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { Dialog } from "vant";
export default {
    components: {
        [Dialog.Component.name]: Dialog.Component
    },
    data() {
        return {
            list: []
        };
    },
    methods: {
        goBack() {
            this.$router.push("/personal");
        },
        reqOrder() {
            return this.$axios.post("/cart/orderList").then(res => {
                // console.log(res);
                const { code, msg, list } = res.data;
                if (code == 1) {
                    this.list = list;
                } else {
                    Dialog.alert({
                        message: msg
                    }).then(() => {
                        // on close
                    });
                }
            });
        }
    },
    mounted() {
        this.username = sessionStorage.getItem("username");
        if (this.username) {
            this.reqOrder();
        }
    }
};
</script>

<style lang="scss" scoped>
.van-nav-bar__title {
    color: #00f;
}
.waiting {
    padding-top: 0.8rem;
}
ul {
    background-color: #fff;
    li {
        padding: 0.6rem 0.1rem;
        position: relative;
        border-bottom: 1px #eee solid;
        .img {
            float: left;
            width: 30%;
            // padding: 0 1%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .content {
            float: right;
            width: 60%;
            padding-right: 0.3rem;
            p {
                color: #666;
            }
            h6 {
                margin-top: 0.2rem;
                color: #999;
            }
            h5 {
                height: 0.8rem;
                line-height: 0.8rem;
                font-size: 0.3rem;
                color: #f00;
                span {
                    float: right;
                    padding: 0 0.2rem;
                    color: #fff;
                    background-color: #f00;
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>