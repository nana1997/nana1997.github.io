<template>
    <div>
        <ul class="u1">
            <li>我的订单</li>
            <li class="li1" @click="toWaitingPay">
                <van-icon name="peer-pay" class="i1" />
                <van-icon v-show="username" info="1" />待付款
                <van-icon name="arrow" class="i2" />
            </li>
            <li class="li1" @click="toWaitingDeliverGoods">
                <van-icon name="tosend" class="i1" />待发货
                <van-icon name="arrow" class="i2" />
            </li>
            <li class="li1" @click="toDeliverGoods">
                <van-icon name="logistics" class="i1" />已发货
                <van-icon name="arrow" class="i2" />
            </li>
        </ul>
        <ul class="u1">
            <li>我的服务</li>
            <li class="li1" @click="toChat">
                <van-icon name="service-o" class="i1" />在线客服
                <van-icon name="arrow" class="i2" />
            </li>
            <li class="li1" @click="toCollection">
                <van-icon name="like-o" class="i1" />收藏夹
                <van-icon name="arrow" class="i2" />
            </li>
            <li class="li1" @click="toAddress" >
                <van-icon name="location-o" class="i1" />地址管理
                <van-icon name="arrow" class="i2" />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['username'],
    methods: {
        // 去聊天室
        toChat() {
            this.$router.push("/chat");
        },
        // 去待付款
        toWaitingPay() {
            this.$router.push("/waitingpay");
        },
        // 去待发货
        toWaitingDeliverGoods() {
            this.$router.push("/waitingDeliverGoods");
        },
        // 去已发货
        toDeliverGoods() {
            this.$router.push("/deliverGoods");
        },
        // 去收藏夹
        toCollection() {
            this.$router.push("/collection");
        },
        // 去地址
        toAddress(){
            // this.$router.push("/address");
        }
    },
    mounted() {

    }
};
</script>

<style scoped>
.u1 {
    margin: 0.3rem 0;
    background-color: #fff;
}
.u1 li {
    height: 1rem;
    line-height: 1rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    color: #999;
}
.u1 .li1 {
    border-top: 1px solid #eee;
    font-size: 0.26rem;
    position: relative;
}
.van-info {
    top: -24px;
    right: 10px;
}
.u1 li .i1 {
    float: left;
    margin-right: 0.2rem;
    font-size: 0.4rem;
    margin-top: 0.3rem;
    color: #666;
}
.u1 li .i2 {
    float: right;
    font-size: 0.4rem;
    margin-top: 0.3rem;
    color: #ccc;
}
</style>
