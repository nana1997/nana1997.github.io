<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    methods: {
        // 获取用户信息
        getUserInfo() {
            return this.$axios.post("/cart/info").then(res => {
                const { code, msg, userInfo } = res.data;

                if (code == 1) {
                    // 调用store对象的方法,改变userInfo的值
                    this.$store.commit("userInfo", userInfo);
                } else {
                    alert(msg);
                }
            });
        }
    },
    // 如果这里写mounted，它会比子组件里面的mounted晚执行
    created() {
        // console.log('根组件')
        // 打开页面,首先执行根组件这里的代码,之后,无论怎么跳转,这里的代码都不会再走

        // 获取token
        const token = localStorage.getItem("token");

        if (token) {
            // 存储token,放到store
            // 1.直接使用commit一个mutation函数
            this.$store.commit("token", token);
            // 2.使用dispatch一个action函数
            // this.$store.dispatch('token',token)

            // 获取用户信息
            this.getUserInfo();

            // this.$store.state.token = token;
        }
    }
};
</script>

<style lang="scss">
</style>
