<template>
    <div>
        <Header></Header>
        <div class="div">
            <h2>您还没有相关的收藏
                <p>可以去看看有哪些想买的</p>
            </h2>
        </div>
    </div>
</template>

<script>
export default {
    
};
</script>

<style lang="scss" scoped>
.div {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
h2 {
    width: 4rem;
    height: 0.5rem;
    margin: 150px auto 40px;
    background: url("https://m.camel.com.cn/614956d67cfa4bd515a0882300c81dac.png")
        no-repeat center top;
    background-size: 3rem 3rem;
    padding-top: 3.2rem;
    text-align: center;
    color: #9b9b9b;
}
</style>