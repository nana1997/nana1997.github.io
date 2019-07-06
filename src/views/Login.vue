<template>
    <div>
        <MyForm h3-text="快速登录" btn-text="登录" @clickBtn="login" />
    </div>
</template>

<script>
import { Dialog } from "vant";
import MyForm from "@/components/MyForm.vue";
export default {
    data() {
        return {};
    },
    components: {
        MyForm,
        [Dialog.Component.name]: Dialog.Component
    },
    methods: {
        login(data) {
            let { username, password } = data;

            if (username && password) {
                // 请求接口，获取数据
                this.$axios
                    .post("/user/login", {
                        username,
                        password
                    })
                    .then(res => {
                        const { code, msg, token, username } = res.data;
                        // console.log(res.data)
                        if (code == 1) {
                            // 登录成功，就将token存到localStorge(区别于sessionStorage)
                            localStorage.setItem("token", token);

                            sessionStorage.setItem("username", username);

                            // 接下来，就跳转到上一页或者首页
                            this.$router.push("/home");
                        } else {
                            Dialog.alert({
                                message: msg
                            }).then(() => {
                                // on close
                            });
                        }
                    })
                    .catch(err => {
                        Dialog.alert({
                            message: err
                        }).then(() => {
                            // on close
                        });
                    });
            } else {
                // alert("请填写用户名或者密码");
                Dialog.alert({
                    message: "请填写用户名或者密码"
                }).then(() => {
                    // on close
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
</style>