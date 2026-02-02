import { createVNode, render } from "vue";
import MessageConstructor from "./message.vue";
import type { MessageOptions, MessageInstance, MessageType } from "./message";

// Message 函数接口
export interface MessageFunction {
    (options: MessageOptions | string): MessageInstance;
    success: (options: MessageOptions | string) => MessageInstance;
    warning: (options: MessageOptions | string) => MessageInstance;
    info: (options: MessageOptions | string) => MessageInstance;
    error: (options: MessageOptions | string) => MessageInstance;
    closeAll: () => void;
    install?: (app: any) => void;
}

// 存储所有消息实例
const instances: MessageInstance[] = [];
let seed = 1;

// 计算偏移量（考虑已有的消息）
const getOffset = (id: string): number => {
    const idx = instances.findIndex((instance) => instance.id === id);
    if (idx === 0) {
        return 20;
    } else {
        const prev = instances[idx - 1];
        return 20; // 简化版，实际应该累加之前消息的高度
    }
};

// 创建消息实例的核心方法
const createMessage = (options: MessageOptions): MessageInstance => {
    const id = `message_${seed++}`;
    const container = document.createElement("div");

    // 处理关闭逻辑
    const onClose = () => {
        close(id);
        if (typeof options.onClose === "function") {
            options.onClose();
        }
    };

    // 合并配置项
    const props = {
        ...options,
        id,
        onClose,
        offset: getOffset(id),
        zIndex: 2000 + seed,
    };

    // 创建VNode
    const vnode = createVNode(MessageConstructor, props as any);

    // 渲染到容器
    render(vnode, container);
    document.body.appendChild(container.firstElementChild!);

    // 创建实例对象
    const instance: MessageInstance = {
        id,
        close: () => {
            if (vnode.component) {
                (vnode.component.exposed as any)?.close();
            }
        },
    };

    // 存储实例
    instances.push(instance);

    return instance;
};

// 关闭指定消息
const close = (id: string) => {
    const idx = instances.findIndex((instance) => instance.id === id);
    if (idx === -1) return;

    instances.splice(idx, 1);
};

// 关闭所有消息
const closeAll = () => {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
};

// 主导出函数
const Message = ((options: MessageOptions | string): MessageInstance => {
    if (typeof options === "string") {
        options = { message: options };
    }
    return createMessage(options);
}) as MessageFunction;

// 快捷函数
["success", "warning", "info", "error"].forEach((type) => {
    (Message as any)[type] = (
        options: MessageOptions | string
    ): MessageInstance => {
        if (typeof options === "string") {
            options = {
                message: options,
                type: type as MessageType,
            };
        } else {
            options.type = type as MessageType;
        }
        return createMessage(options);
    };
});

Message.closeAll = closeAll;

export default Message;
