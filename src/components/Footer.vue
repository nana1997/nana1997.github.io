<template>
    <div>
        <van-tabbar route>
            <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/classify" icon="qr">分类</van-tabbar-item>
            <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
            <van-tabbar-item replace to="/personal" icon="manager-o">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    }
};
</script>

<style lang="scss" scoped>
</style>