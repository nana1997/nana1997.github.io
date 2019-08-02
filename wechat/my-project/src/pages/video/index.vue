<template>
    <div>
        <ul>
            <li v-for="(item,index) in list" :key="index">
                <div class="song">{{item.songName}}</div>
                <div class="singer">{{item.singer}}</div>
                <div class="video">
                    <video
                        :src="item.url"
                        controls
                        @play="videoplay"
                        @timeupdate="videotimeupdate"
                    ></video>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {
                    singer: "Camila Cabello",
                    songName: "Havana",
                    url: "http://47.102.140.68/video/Havana.mp4"
                },
                {
                    singer: "HelloMedia / 酸楚韩",
                    songName: "演员-后羿的死法",
                    url: "http://47.102.140.68/video/houyidesifa.mp4"
                },
                {
                    singer: "刘先华 Henry、圭贤、泰民",
                    songName: "Trap",
                    url: "http://47.102.140.68/video/Trap.mp4"
                },
                {
                    singer: "麦振鸿",
                    songName: "雪见-落入凡尘",
                    url: "http://47.102.140.68/video/luorufanchen.mp4"
                },
                {
                    singer: "Taylor Swift",
                    songName: "You Need To Calm Down",
                    url: "http://47.102.140.68/video/YouNeedToCalmDown.mp4"
                },
                {
                    singer: "周杰伦",
                    songName: "本草纲目",
                    url: "http://47.102.140.68/video/bancaogangmu.mp4"
                },
                {
                    singer: "跟风超人",
                    songName: "你打不过我吧",
                    url: "http://47.102.140.68/video/dabuguowoba.mp4"
                }
            ],
            toggle: true,
            videoCtx: null
        };
    },
    methods: {
        videoplay() {
            // video 开始/继续播放
            if (!mpvue.getStorageSync("play")) {
                // 不是wifi
                this.showPrompt();
            }
        },
        showPrompt() {
            this.videoCtx.pause();
            mpvue.showModal({
                title: "流量警告",
                content: "你正在使用移动网络数据观看!",
                cancelText: "取消观看",
                cancelColor: "#123456",
                confirmText: "继续观看",
                confirmColor: "#d81e06",
                success: res => {
                    if (res.confirm) {
                        console.log("用户点击确定");
                        mpvue.showToast({
                            title: "土豪,你继续."
                        });
                        mpvue.setStorageSync("play", true);
                        this.videoCtx.play();
                        this.toggle = true;
                    } else if (res.cancel) {
                        console.log("用户点击取消");
                    }
                }
            });
        },
        videotimeupdate() {
            // console.log("video update");
            if (!mpvue.getStorageSync("play") && this.toggle) {
                // console.log("change...");
                this.showPrompt();
                this.toggle=false
            }
        }
    },
    mounted() {
        this.videoCtx = mpvue.createVideoContext("myVideo");
        // console.log(this.videoCtx)
        mpvue.getNetworkType({
            success(res) {
                const networkType = res.networkType;
                console.log(networkType);
                if (networkType !== "wifi") {
                    mpvue.setStorageSync("play", false);
                } else {
                    mpvue.setStorageSync("play", true);
                }
            }
        });

        mpvue.onNetworkStatusChange(function(res) {
            const networkType = res.networkType;
            console.log(networkType);
            mpvue.setStorageSync("play", networkType == "wifi");
        });
    }
};
</script>

<style scoped>
ul{
    background-color: #eee;
    padding-top: 20px;
}
li{
    text-align: center;
    padding: 20px 0;
    margin: 20px 0;
    background-color: #fff;
}
.song{
    line-height: 40px;
    margin: 10px 0;
    font-size: 24px;
    font-weight: 600;
    color: #0090f0;
}
.singer{
    line-height: 30px;
    margin: 10px 0;
    font-size: 16px;
    color: #f00;
}
.video{
    width: 80%;
    height: 200px;
    border-radius: 10px;
    margin: auto;
    overflow: hidden;
}
.video video{
    width: 100%;
    height: 100%;
}
</style>
