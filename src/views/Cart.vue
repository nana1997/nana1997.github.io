<template>
    <div class="cart">
        <Cart v-show="show" />
        <van-nav-bar title="CAMEL" fixed />
        <div v-show="flag">
            <ul>
                <li class="cl" v-for="(item,index) in list" :key="index">
                    <div class="input">
                        <van-icon
                            :name="item.chosen?'passed':'circle'"
                            @click="chooseItem(item,index)"
                        />
                    </div>
                    <div class="img">
                        <img :src="item.modelImg" />
                    </div>

                    <div class="content">
                        <p>{{item.goodsname}}</p>
                        <h6>
                            {{item.goodsColor}}
                            {{item.goodsSize}}
                        </h6>
                        <h5>
                            ￥{{(item.goodsprice).toFixed(2)}}
                            <span>
                                <van-stepper
                                    v-model="item.goodsNum"
                                    @change="updateCart(item,index)"
                                />
                            </span>
                        </h5>
                    </div>
                    <div class="del" @click="delCart(item,index)">删除</div>
                </li>
            </ul>
            <div class="bottom cl">
                <div class="checkAll">
                    <van-icon :name="isAll?'passed':'circle'" @click="chooseAll" />
                    <span>全选</span>
                </div>
                <div class="delAll">
                    <button @click="delAll">批量删除</button>
                </div>
                <div class="total">
                    合计:
                    <span>￥</span>
                    <mark>{{(total).toFixed(2)}}</mark>
                </div>
                <div class="submit">
                    <button @click="pay">提交订单</button>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import { Dialog } from "vant";
import Cart from "@/components/Cart.vue";
export default {
    data() {
        return {
            show: false,
            username: "",
            flag: false,
            list: []
        };
    },
    components: {
        Cart,
        [Dialog.Component.name]: Dialog.Component
    },
    computed: {
        // 全选
        isAll: {
            get() {
                //取值
                // 过滤出被选中的数组，判断其长度是否与整个数组长度相等
                return (
                    this.list.filter(e => e.chosen).length == this.list.length
                );
            },
            set(newVal) {
                // 监听
                this.list = this.list.map(e => {
                    e.chosen = newVal;
                    return e;
                });
            }
        },
        // 总计
        total: {
            get() {
                let total = 0;
                this.list.forEach(li => {
                    if (li.chosen) {
                        total += li.goodsprice * li.goodsNum;
                    }
                });
                return total;
            }
        }
    },
    methods: {
        // 批量删除
        delAll() {
            // 获取被选中的购物车列表
            const chosenItems = this.list.filter(e => e.chosen);
            // 如果一个都没选中，就不会往下走
            if (chosenItems.length) {
                // 导出每个购物车id
                const ids = chosenItems.map(e => e._id);

                this.$axios
                    .post("/cart/cartDel", {
                        ids
                    })
                    .then(res => {
                        const { code, msg } = res.data;

                        if (code == 1) {
                            // 批量删除
                            const list = this.list;
                            for (let i = 0; i < list.length; i++) {
                                if (list[i].chosen) {
                                    list.splice(i, 1);
                                    i--;
                                }
                            }
                        }
                    });
            }
        },
        // 改变某个商品的选中状态
        chooseItem(item, index) {
            item.chosen = !item.chosen;
            // 注意，需要使用数组的变异方法
            // this.list[index] = item
            this.list.splice(index, 1, item);
        },
        // 全选
        chooseAll() {
            this.isAll = !this.isAll;
        },
        //删除购物车
        delCart(item, index) {
            this.$axios
                .post("/cart/cartDel", {
                    ids: [item._id]
                })
                .then(res => {
                    // console.log(res);
                    const { code, msg } = res.data;
                    if (code == 1) {
                        // 如果删除接口请求成功，就在页面上把这个商品给手动删掉
                        this.list.splice(index, 1);
                    } else {
                        Dialog.alert({
                            message: msg
                        }).then(() => {
                            // on close
                        });
                    }
                });
        },
        //更新购物车
        updateCart(item, index) {
            return this.$axios
                .post("/Cart/cartUpdate", {
                    id: item._id,
                    goodsNum: item.goodsNum
                })
                .then(res => {
                    // console.log(res);
                    const { code, msg } = res.data;
                    if (code == 1) {
                        this.list.splice(index, 1, item);
                    } else {
                        Dialog.alert({
                            message: msg
                        }).then(() => {
                            // on close
                        });
                    }
                });
        },
        // 结算
        pay() {
            const goodsList = this.list.filter(e => e.chosen);
            if (goodsList.length) {
                this.$axios
                    .post("/cart/order", {
                        goodsList
                    })
                    .then(res => {
                        const { code, msg } = res.data;
                        Dialog.confirm({
                            message: msg + "是否立即付款"
                        })
                            .then(() => {
                                // on confirm
                                this.$router.push("/waitingpay");
                            })
                            .catch(() => {
                                // on cancel
                            });
                    });
            } else {
                Dialog.alert({
                    message: "请选择商品"
                }).then(() => {
                    // on close
                });
            }
        },
        //获取购物车列表
        reqCart() {
            return this.$axios.post("/cart/cartList").then(res => {
                const { code, msg, list } = res.data;
                // console.log(res.data);
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
            $(document).ready(function() {
                if (location.href.indexOf("#reloaded") == -1) {
                    location.href = location.href + "#reloaded";
                    location.reload();
                }
            });
            this.reqCart();
            this.show = false;
            this.flag = true;
        } else {
            this.show = true;
            this.flag = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.van-nav-bar__title {
    color: #00f;
}
.cart {
    margin-bottom: 1.9rem;
}
ul {
    background-color: #fff;
    li {
        padding: 0.6rem 0.1rem;
        position: relative;
        border-bottom: 1px #eee solid;
        .input {
            float: left;
            width: 5%;
            text-align: center;
            i {
                line-height: 2rem;
                font-size: 0.4rem;
                color: #1989fa;
            }
        }
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
                }
            }
        }
        .del {
            position: absolute;
            right: 0.2rem;
            bottom: 0.1rem;
            padding: 0.05rem 0.1rem;
            background-color: #99c;
            color: #fff;
            border-radius: 5px;
        }
    }
}
.van-submit-bar {
    margin-bottom: 0.9rem;
}
.bottom {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0.88rem;
    background-color: #fff;
    padding-left: 0.1rem;
    i {
        color: #1989fa;
        margin-right: 0.1rem;
    }
    .checkAll {
        float: left;
        line-height: 1rem;
        margin-right: 0.2rem;
    }
    .delAll {
        float: left;
        button {
            height: 0.6rem;
            vertical-align: top;
            background-color: #fff;
            border: 1px #ddd solid;
            margin-top: 0.2rem;
        }
    }
    .total {
        float: left;
        line-height: 1rem;
        margin-left: 0.3rem;
        span {
            color: #f00;
        }
        mark {
            background: none;
            color: #f00;
        }
    }
    .submit {
        float: right;
        button {
            border: 1px #ddd solid;
            width: 2.1rem;
            height: 1rem;
            background-color: #f44;
            color: #fff;
        }
    }
}
</style>