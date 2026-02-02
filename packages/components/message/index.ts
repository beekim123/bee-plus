import Message from "./src/method";
import type { App } from "vue";

// 安装函数（用于全局注册）
Message.install = (app: App) => {
    app.config.globalProperties.$message = Message;
};

export default Message;
export * from "./src/message";
