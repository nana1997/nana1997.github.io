<template>
    <div>
        <i class="iconfont icon-xiala" @click="loadBottom"></i>
        <Header></Header>
        <div class="fixed">
            <van-dropdown-menu>
                <van-dropdown-item v-model="value1" :options="option1" @change="type(value1)" />
                <van-dropdown-item v-model="value2" :options="option2" @change="sort(value2)" />
            </van-dropdown-menu>
        </div>
        <div class="classify">
            <!-- 
            1.添加mt-loadmore组件
            2.添加loadTop、loadBottom、allLoaded和ref
            3.将默认的auto-fill改为false
            -->
            <mt-loadmore
                :top-method="loadTop"
                :bottom-method="loadBottom"
                :bottom-all-loaded="allLoaded"
                ref="loadmore"
                :auto-fill="false"
            >
            <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
                <van-cell v-for="(item,index) in list" :key="index" @click="toDetail(item._id)">
                    <div class="div1">
                        <img :src="item.goodsListImg" alt />
                    </div>
                    <div class="div2">
                        <p class="ellipsis2">{{item.goodsname}}</p>
                        <h3>￥{{(item.goodsprice).toFixed(2)}}</h3>
                        <h4>
                            <span>{{item.goodslist_li_color}}</span>
                        </h4>
                    </div>
                </van-cell>
            <!-- </van-list> -->
            </mt-loadmore>
        </div>
        <BackTop />
        <Chat />
        <Footer></Footer>
    </div>
</template>

<script>
import BackTop from "@/components/BackTop.vue";
export default {
    data() {
        return {
            value1: 0,
            value2: 0,
            option1: [
                { text: "全部商品", value: 0 },
                { text: "户外", value: 1 },
                { text: "男装", value: 2 },
                { text: "瑜伽", value: 3 }
            ],
            option2: [
                { text: "默认排序", value: 0 },
                { text: "价格正序", value: 1 },
                { text: "价格倒序", value: -1 }
            ],
            list: [],
            loading: false,
            finished: false,
            // 是否全部加载完毕
            allLoaded: false
        };
    },
    methods: {
        // onLoad() {
        //     // 异步更新数据
        //     setTimeout(() => {
        //         this.$axios
        //             .post("/goods/list", {
        //                 pageNum: 1
        //             })
        //             .then(res => {
        //                 // console.log(res);
        //                 const { code, msg, list } = res.data;
        //                 // console.log(res.data)
        //                 // 整个列表显示第一页
        //                 this.list = list;
        //                 // 页数为1
        //                 this.page = 1;
        //             });
        //         // 加载状态结束
        //         this.loading = false;
        //         // 数据全部加载完成
        //         if (this.list.length) {
        //             this.finished = true;
        //         }
        //     }, 100);
        // },
        // 从上往下拉,刷新页面
        loadTop() {
            // 获取第一页
            this.$axios
                .post("/goods/list", {
                    pageNum: 1
                })
                .then(res => {
                    const { code, msg, list } = res.data;

                    // 整个列表显示第一页
                    this.list = list;
                    // 页数为1
                    this.page = 1;

                    // 去掉正在加载的顶部loading
                    this.$refs.loadmore.onTopLoaded();
                    // 放开上拉加载更多
                    this.allLoaded = false;
                });
        },
        // 从底部往上滑,加载更多
        loadBottom() {
            // 尝试让页数+1
            const newPage = this.page + 1;

            // 尝试获取下一页
            this.$axios
                .post("/goods/list", {
                    pageNum: newPage
                })
                .then(res => {
                    const { code, msg, list } = res.data;

                    // 如果下一页有数据
                    if (list.length) {
                        // 将数据拼接到旧数据的后面
                        this.list = this.list.concat(list);

                        // 更改页数
                        this.page = newPage;
                    } else {
                        // 关闭上拉加载更多的功能
                        this.allLoaded = true;
                    }

                    // 关闭正在加载的底部提示
                    this.$refs.loadmore.onBottomLoaded();
                });
        },
        type(value1) {
            if (this.option1[value1].text === "全部商品") {
                this.$axios.post("/goods/list").then(res => {
                    // console.log(res);
                    const { code, msg, list } = res.data;
                    // console.log(res.data)
                    // 整个列表显示第一页
                    this.list = list;
                });
            } else {
                this.$axios
                    .post("/goods/classify", {
                        goodstype: this.option1[value1].text
                    })
                    .then(res => {
                        // console.log(res);
                        this.list = res.data.classify;
                    });
            }
        },
        sort(value2) {
            console.log(value2);
            if (value2 === "默认排序") {
                this.$axios.post("/goods/list").then(res => {
                    // console.log(res);
                    const { code, msg, list } = res.data;
                    // console.log(res.data)
                    // 整个列表显示第一页
                    this.list = list;
                });
            } else {
                this.$axios
                    .post("/goods/sort", {
                        goodsprice: value2
                    })
                    .then(res => {
                        // console.log(res);
                        this.list = res.data.list;
                    });
            }
        },
        toDetail(id) {
            // console.log(this)
            // this.$touter.push('/detail/'+id)
            this.$router.push({ name: "detail", params: { id: id } });
        }
    },
    components: {
        BackTop
    },
    // 页面初始化的时候,手动加载第一页,相当于刷新一次列表
    mounted() {
        this.loadTop();
    }
};
</script>

<style lang="scss" scoped>
.icon-xiala{
    position: fixed;
    right: 0.4rem;
    bottom: 1.5rem;
    color: #1989fa;
    font-size: 0.8rem;
    z-index: 11;
}
.fixed {
    width: 100%;
    position: fixed;
    z-index: 11;
}
.classify {
    padding-top: 0.9rem;
    img {
        width: 2.3rem;
        height: 2.3rem;
    }
    .div1 {
        float: left;
        width: 40%;
    }
    .div2 {
        float: left;
        width: 60%;
        p {
            color: #6c757d;
            margin-top: 0.1rem;
        }
        h3 {
            font-size: 0.4rem;
            color: #e83e8c;
            height: 0.8rem;
            line-height: 0.8rem;
        }
        h4 {
            span {
                background-color: #eee;
                color: #aaa;
            }
        }
    }
}
</style>