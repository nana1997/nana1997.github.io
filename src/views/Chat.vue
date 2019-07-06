<template>
    <div class="chat">
        <van-nav-bar left-text="返回" title="客服" fixed left-arrow @click-left="goBack" />
        <div class="content"></div>

        <div class="send">
            <input type="text" id="msg" />
            <button id="btn">点击发送</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        connent() {
            // 连接服务,进入聊天室
            const ws = new WebSocket("ws://localhost:8000");

            // 监听连接服务
            ws.onopen = function() {
                console.log("我连上了WebSocket");

                // 获取后端发来的消息
                ws.onmessage = function(obj) {
                    const data = obj.data;

                    // 向对话框中添加消息
                    $(".content").append(`<p class="p" style="display: inline;
            line-height: 0.8rem;
            text-align: center;
            padding: .2rem;
            background-color: rgb(39, 186, 206);
            color: #333;">${data}</p><br>`);
                };

                // 给按钮绑定点击事件
                $("#btn").on("click", () => {
                    let val = $("#msg").val();

                    // 点击将输入框的内容发送给后端
                    ws.send(val);

                    $("#msg").val("");
                });

                // 监听后端断开服务
                ws.onclose = function() {
                    console.log("聊天室已关闭");
                };
            };
        }
    },
    mounted() {
        this.connent();
    }
};
</script>

<style lang="scss" scoped>
.van-nav-bar__title {
    color: #00f;
}
.chat {
    margin-top: 0.8rem;
    background-color: #fff;
    height: 11.3rem;
    padding-bottom: 1.2rem;
    .content {
        // display: inline;
        // line-height: 0.8rem;
        text-align: center;
        // padding: .2rem;
        // background-color: rgb(39, 186, 206);
        // color: #333;
    }
    .send {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 0.2rem 0;
        background-color: #fff;
        input {
            width: 60%;
            height: 0.7rem;
            padding: 0 0.2rem;
            margin: 0 0.3rem;
            border: 1px #ccc solid;
        }
        button {
            width: 20%;
            height: 0.74rem;
            vertical-align: top;
            background-color: #1989fa;
            border: 1px #ccc solid;
            border-radius: 5px;
            color: #fff;
        }
    }
}
</style>