<template>
    <div>
        <div class="div">
            <h2>购物车空空如也</h2>
            <div class="button" @click="toLogin">登录</div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        toLogin() {
            this.$router.push({ name: "login" });
        }
    }
};
</script>

<style lang="scss" scoped>
.div {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
h2 {
    width: 4rem;
    height: 0.5rem;
    margin: 150px auto 40px;
    background: url("https://m.camel.com.cn/614956d67cfa4bd515a0882300c81dac.png")
        no-repeat center top;
    background-size: 3rem 3rem;
    padding-top: 3.2rem;
    text-align: center;
    color: #9b9b9b;
}
.button {
    background-color: #007bff;
    margin: auto;
    width: 5rem;
    height: 1rem;
    font-size: 0.3rem;
    line-height: 1rem;
    color: #fff;
    border-radius: 0.04rem;
    margin-top: 0.3rem;
    border: none;
    text-align: center;
}
</style>