<template>
    <div class="list">
        <view class="search">
            <input class="input" placeholder="输入搜索内容..." @change="listenInput" />
            <button class="button" @click="goSearch">搜索</button>
        </view>

        <view class="content">
            <view class="li" v-for="(item,index) in list" :key="index" @click="goDetail(item._id)">
                <view class="img">
                    <image class="image" :src="item.img" />
                </view>
                <view class="h3">{{item.title}}</view>
                <view class="h5">
                    <text class="author">{{item.author}}</text>
                    <text class="date">{{item.date}}</text>
                </view>
                <view class="p">{{item.state}}</view>
            </view>
        </view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            value: ""
        };
    },
    methods: {
        listenInput(e) {
            // console.log(e)
            let inputValue = e.target.value;
            this.value = inputValue;
        },
        goSearch() {
            // console.log(this)
            let searchInput = this.value;
            if (searchInput === "") {
                this.reqList()
            } else {
                mpvue.showLoading({
                    //显示消息提示框  此处是提升用户体验的作用
                    title: "数据加载中",
                    icon: "loading"
                });
                mpvue.request({
                    url: "http://47.102.140.68:1903/react/search",
                    method: "POST", //请求方式
                    header: {
                        "content-type": "application/json" // 默认值
                    },
                    data: { title: searchInput },
                    complete() {
                        //请求结束后隐藏 loading 提示框
                        mpvue.hideLoading();
                    },
                    success: res => {
                        // console.log(res)
                        this.list = res.data.result;
                    }
                });
            }
        },
        goDetail(e) {
            //获取传递的值
            // console.log("e",e)
            mpvue.navigateTo({
                //跳转详情页  切记配置app.json文件
                url: "../detail/main?id=" + e //传递参数
            });
        },
        reqList() {
            mpvue.showLoading({
                //显示消息提示框  此处是提升用户体验的作用
                title: "数据加载中",
                icon: "loading"
            });
            mpvue.request({
                url: "http://47.102.140.68:1903/react/discoverlist",
                method: "POST", //请求方式
                header: {
                    "content-type": "application/json" // 默认值
                },
                complete() {
                    //请求结束后隐藏 loading 提示框
                    mpvue.hideLoading();
                },
                success: res => {
                    // console.log(res);
                    this.list = res.data.result;
                }
            });
        }
    },
    onShareAppMessage: function(options) {},
    mounted() {
        mpvue.showShareMenu({
            withShareTicket: true
        })
        this.reqList()
    }
};
</script>

<style scoped>
/* pages/list/list.wxss */
.search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    background-color: #eee;
}
.search .input {
    float: left;
    width: 55%;
    height: 40px;
    border-radius: 10px;
    background-color: #fff;
    padding: 0 5%;
    margin: 0 5%;
    font-size: 18px;
}
.search .button {
    float: right;
    width: 20%;
    height: 40px;
    line-height: 40px;
    background-color: #1464db;
    color: #fff;
    margin-right: 5%;
}
.content {
    padding: 60px 30px 0 30px;
}
.li {
    padding: 20px 0;
    border-bottom: 1px #ddd solid;
}
.image {
    width: 100%;
    height: 200px;
    border-radius: 15px;
}
.h3 {
    font-size: 26px;
    padding: 20px 0 10px 0;
    font-weight: 600;
    text-align: center;
}
.h5 {
    height: 30px;
    font-size: 12px;
}
.author {
    margin-left: 20px;
    color: #24d1f0;
}
.date {
    float: right;
    margin-right: 20px;
    color: #1678e7;
}
.p {
    padding: 15px 30px;
    line-height: 30px;
}
</style>

