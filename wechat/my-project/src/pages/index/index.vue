<template>
    <div>
        <div class="userinfo">
            <img
                class="userinfo-avatar"
                v-if="userInfo.avatarUrl"
                :src="userInfo.avatarUrl"
                background-size="cover"
            />
            <div class="userinfo-nickname">
                <card :text="userInfo.nickName"></card>
            </div>
            <div v-if="userInfo.avatarUrl" class="golist">
                <button @click="goList">开始探索</button>
            </div>
        </div>

        <div v-if="!userInfo.avatarUrl">
            <view class="tip">● 我们将获取您的公开信息(头像、昵称等)</view>
            <view class="login">
                <button class="loginbtn" open-type="getUserInfo" @getuserinfo="getUserInfo">授权登录</button>
            </view>
        </div>
    </div>
</template>

<script>
import card from "@/components/card";

export default {
    data() {
        return {
            motto: "Hello miniprograme",
            userInfo: {},
            globalData: {
                userInfo: null
            },
            msg: "111111"
        };
    },

    components: {
        card
    },

    methods: {
        goList() {
            mpvue.navigateTo({
                url: "../list/main"
            });
        },
        getUserInfo() {
            mpvue.getUserInfo({
                success: res => {
                    console.log(res.userInfo);
                    // 可以将 res 发送给后台解码出 unionId
                    this.userInfo = res.userInfo;
                    console.log(this.userInfo);
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (this.userInfoReadyCallback) {
                        this.userInfoReadyCallback(res);
                    }
                }
            });
        }
    },

    onLoad() {
        let app = getApp();
        // console.log(app);
        // console.log(this);

        // mpvue.getUserInfo({
        //   success(res) {
        //     console.log(res.userInfo);
        //     console.log(this);
        //     // that.setData({
        //     //   nickName: res.userInfo.nickName,
        //     //   avatarUrl: res.userInfo.avatarUrl
        //     // });
        //   }
        // });

        mpvue.getSetting({
            success: res => {
                if (res.authSetting["scope.userInfo"]) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    mpvue.getUserInfo({
                        success: res => {
                            // console.log(res.userInfo);
                            // 可以将 res 发送给后台解码出 unionId
                            this.userInfo = res.userInfo;
                            // console.log(this.userInfo);
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                            }
                        }
                    });
                } else {
                    console.log("该用户没有授获取用户信息");
                }
            }
        });
    }
};
</script>

<style scoped>
.tip {
    text-align: center;
    height: 50px;
    margin: 100px auto 30px;
}
.login .loginbtn {
    width: 80%;
    background-color: #168ae9;
    border-radius: 10px;
    color: #fff;
}
.userinfo {
    text-align: center;
}
.userinfo img {
    width: 80px;
    height: 80px;
    margin-top: 100px;
}
.golist {
    margin-top: 50px;
}
.golist button {
    width: 80%;
    background-color: #168ae9;
    border-radius: 10px;
    color: #fff;
}
</style>
