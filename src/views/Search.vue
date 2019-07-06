<template>
    <div class="search">
        <van-nav-bar left-text="返回" title="CAMEL" fixed left-arrow @click-left="goBack" />

        <van-search v-model="value" placeholder="请输入搜索关键词" show-action>
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>

        <van-cell id="box" v-for="(item,index) in goods" :key="index" @click="toDetail(item._id)">
            <div class="div1">
                <img :src="item.goodsListImg" alt />
            </div>
            <div class="div2">
                <p class="ellipsis2">{{item.goodsname}}</p>
                <h3>{{item.goodsprice}}</h3>
                <h4>
                    <span>{{item.goodslist_li_color}}</span>
                </h4>
            </div>
        </van-cell>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: "",
            goods: []
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        onSearch() {
            this.$axios
                .post("/goods/search", {
                    goodsname: this.value
                })
                .then(res => {
                    // console.log('res',res);
                    this.goods = res.data.search;
                });
        },
        toDetail(id) {
            this.$router.push({ name: "detail", params: { id: id } });
        }
    }
};
</script>

<style lang="scss" scoped>
.van-nav-bar__title {
    color: #00f;
}

.van-search {
    width: 100%;
    position: fixed;
    top: 40px;
    left: 0;
    z-index: 11;
}
.search {
    margin-top: 93px;
    margin-bottom: 0;
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