<template>
    <div class="home">
        <Header></Header>
        <!-- <MySwiper></MySwiper> -->
        <div>
            <Home></Home>
        </div>
        <Chat/>
        <Footer></Footer>
    </div>
</template>

	<script>
// @ is an alias to /src
import Home from '@/components/Home.vue';

export default {
    name: "home",
    components: {
        Home
    }
};
</script>
