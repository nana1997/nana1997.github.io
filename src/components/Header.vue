<template>
    <div>
        <van-nav-bar left-text="返回" title="CAMEL" fixed left-arrow @click-left="goBack">
            <van-icon name="search" slot="right" @click="goSearch"/>
        </van-nav-bar>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        goSearch() {
            this.$router.push("/search");
            console.log(this.$router);
        }
    }
};
</script>

<style lang="scss" scoped>
.van-nav-bar__title {
    // height: 100%;
    // background: url("../assets/img/1.jpg") no-repeat center center;
    // background-size: 1.5rem 0.4rem;
    color: #00f;
}
</style>