<template>
    <div class="personal">
        <div class="img">
            <van-uploader :after-read="afterRead">
                <img src="http://img3.imgtn.bdimg.com/it/u=4171914132,1957317625&fm=26&gp=0.jpg" alt />
            </van-uploader>
            <span class="span" @click="toLogin" v-show="flag">登录/注册</span>
            <span class="span" v-show="!flag">{{username}}</span>
            <span class="quit" v-show="!flag" @click="removeLogin">退出</span>
        </div>
        <Personal :username="username"></Personal>
        <Footer></Footer>
    </div>
</template>


<script>
import Personal from "@/components/Personal.vue";
export default {
    data() {
        return {
            flag: false,
            username: ""
        };
    },
    components: {
        Personal
    },
    methods: {
        toLogin() {
            this.$router.push("/login");
        },
        removeLogin() {
            localStorage.removeItem("token");
            sessionStorage.removeItem("username"); //移除sessionStorage
            this.username = ''
            this.flag = true;
        },
        afterRead(file) {
            //上传图片
            // 此时可以自行将文件上传至服务器
            console.log(file);
        }
    },
    mounted() {
        this.username = sessionStorage.getItem("username");
        if (this.username) {
            this.flag = false;
        } else {
            this.flag = true;
        }
    }
};
</script>


<style scoped>
.personal{
    margin-bottom: .8rem;
}
.img {
    height: 2rem;
    background-color: #1989fa;
    padding: 0.5rem 0 0 0.5rem;
    position: relative;
}
.img img {
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
}
.img .span {
    position: absolute;
    left: 2.5rem;
    top: 42px;
    font-size: 0.5rem;
    color: #fff;
}
.quit {
    position: absolute;
    top: 50px;
    right: .3rem;
    padding:.1rem 0.3rem;
    border-radius: 5px;
    background: none;
    border: 1px #aaa solid;
    color: rgb(243, 174, 174);
}
</style>
