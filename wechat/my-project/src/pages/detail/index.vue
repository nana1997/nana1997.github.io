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
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: {}
        };
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
