<template>
    <div>
        <Header></Header>
        <div class="div">
            <div id="nav">
                <router-link to="/login">登录</router-link>|
                <router-link to="/register">注册</router-link>
            </div>
            <div>
                <h3 class="login_register">{{h3Text}}</h3>
                <div class="username">
                    <label for="username">用户名:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="用户名"
                        name="username"
                        v-model="username"
                    />
                </div>
                <div class="password">
                    <label for="password">密码:</label>
                    <input
                        type="password"
                        class="password_input"
                        id="password"
                        placeholder="密码"
                        name="pwd"
                        v-model="password"
                    />
                </div>
                <button type="submit" class="button" @click="onClick">{{btnText}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    props: ["h3Text", "btnText"],
    methods: {
        onClick() {
            const { username, password } = this;
            this.$emit("clickBtn", {
                username,
                password
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.div {
    width: 80%;
    margin: auto;
    #nav {
        margin: 60px 0;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #007bff;
            }
        }
    }
    .login_register {
        font-size: 0.6rem;
        color: #007bff;
        height: 60px;
        line-height: 60px;
        text-align: center;
    }
    .username,
    .password {
        margin-top: 30px;
        label {
            display: block;
            text-align: center;
            height: 30px;
            line-height: 30px;
        }
        input {
            display: block;
            width: 80%;
            height: 40px;
            line-height: 40px;
            margin: auto;
            border: 1px #aaa solid;
            border-radius: 5px;
            padding-left: 0.2rem;
            margin-top: 10px;
        }
    }
    .button{
        display: block;
        width: 82%;
        height: 42px;
        line-height: 42px;
        margin: auto;
        background-color: #007bff;
        margin-top: 40px;
        border:1px #007bff solid;
        color: #fff;
        border-radius: 5px;
    }
}
</style>