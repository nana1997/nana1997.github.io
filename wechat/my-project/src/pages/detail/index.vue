<template>
    <div class="detail">
        <view class="img">
            <image :src="info.img" />
        </view>
        <view class="date">{{info.date}}</view>
        <view class="title">{{info.title}}</view>
        <view class="author">{{info.author}}</view>
        <view class="state">{{info.state}}</view>
        <view class="content">{{info.content}}</view>
        <div class="icon">
            <img :src="url1" @click="changeurl1">
            <img :src="url2" @click="changeurl2">
            <img :src="url3" @click="changeurl3">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: {},
            url1:"../../static/images/shoucang1.png",
            url2:"../../static/images/dianzan1.png",
            url3:"../../static/images/pinglun1.png"
        };
    },
    methods:{
        changeurl1(){
            this.url1="../../static/images/shoucang2.png"
        },
        changeurl2(){
            this.url2="../../static/images/dianzan2.png"
        },
        changeurl3(){
            this.url3="../../static/images/pinglun2.png"
        }
    },
    mounted() {
        const { id } = this.$mp.query;
        mpvue.showLoading({
            //显示消息提示框  此处是提升用户体验的作用
            title: "数据加载中",
            icon: "loading"
        });
        mpvue.request({
            url: "http://47.102.140.68:1903/react/discoverdetail",
            method: "POST", //请求方式
            data: { id },
            header: {
                "content-type": "application/json" // 默认值
            },
            complete() {
                //请求结束后隐藏 loading 提示框
                mpvue.hideLoading();
            },
            success: res => {
                // console.log(res)
                this.info = res.data.data;
            }
        });
    }
};
</script>

<style scoped>
.icon{
    position:fixed;
    top: 40px;
    right: 30px;
    width: 190px;
    height: 60px;
}
.icon img{
    width: 30px;
    height: 30px;
    margin-left: 30px;
}
i{
    height: 60px;
}
.detail{
    padding: 20px 30px;
}
.img image{
    width: 100%;
    height: 200px;
    border-radius: 20px;
}
.date{
    margin: 20px 0;
}
.title{
    font-size: 28px;
    font-weight: 600;
}
.author{
    text-align: center;
    line-height: 30px;
    margin: 20px;
    font-size: 18px;
    color: #e44b0f;
}
.state{
    padding: 0 20px 30px 20px;
    margin-bottom: 30px;
    border-bottom: 1px #eee solid;
    font-size: 16px;
    line-height: 30px;
}
.content{
    line-height: 30px;
    padding: 0 20px 30px 20px;
}
</style>
