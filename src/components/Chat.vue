<template>
    <div>
        <van-icon class="icon" name="chat-o" @click="toChat"/>
    </div>
</template>

<script>
export default {
    methods:{
        toChat(){
            this.$router.push('/chat')
        }
    }
};
</script>

<style lang="scss" scoped>
.icon{
    position:fixed;
    right: .4rem;
    bottom: 2.5rem;
    color: #1989fa;
    font-size: .8rem;
}
</style>