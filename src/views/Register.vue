<template>
    <div>
        <MyForm h3-text="快速注册" btn-text="注册" @clickBtn="register" />
    </div>
</template>

<script>
import MyForm from "@/components/MyForm.vue";
import { Dialog } from "vant";
export default {
    data() {
        return {};
    },
    components: {
        MyForm,
        [Dialog.Component.name]: Dialog.Component
    },
    methods: {
        register(data) {
            const { username, password } = data;

            if (username && password) {
                this.$axios
                    .post("/user/register", {
                        username,
                        password
                    })
                    .then(res => {
                        console.log(res);
                        const { code, msg } = res.data;
                        if (code == 1) {
                            // 注册成功之后，去登录页面
                            this.$router.push("/login");
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
                Dialog.alert({
                    message: "请输入账户名或密码"
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