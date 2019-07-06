<template>
    <div class="address">
        <van-nav-bar left-text="返回" title="编辑地址" fixed left-arrow @click-left="goBack" />
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
            @change-area="address"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            areaList:{},
            searchResult: []
        };
    },

    methods: {
        goBack(){
            this.$router.go(-1);
        },
        onSave() {
            Toast("save");
        },
        onDelete() {
            Toast("delete");
        },
        address(){
            
        },
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [
                    {
                        name: "黄龙万科中心",
                        address: "杭州市西湖区"
                    }
                ];
            } else {
                this.searchResult = [];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.address {
    padding: 0.8rem 0;
}
</style>