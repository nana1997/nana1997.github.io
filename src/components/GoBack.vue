<template>
    <div>
        <van-icon name="arrow-left" @click="goBack" />
    </div>
</template>

<script>
export default {
    methods:{
        goBack(){
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="scss" scoped>
i {
    position: fixed;
    top: 0.4rem;
    left: 0.4rem;
    z-index: 11;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    padding-left: .08rem;
    line-height: 1rem;
    background-color: rgba(112, 110, 110, 0.5);
    color: #fff;
    font-size: 0.8rem;
}
</style>