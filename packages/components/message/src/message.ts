import type { ExtractPropTypes, VNode } from "vue";

export const MessageType = [
    "success",
    "warning",
    "error",
    "info",
] as const;

export const messageProps = {
    // 消息类型
    type: {
        type: String,
        values: MessageType,
        default: "info",
    },
    // 消息文字
    message: {
        type: String,
        default: "",
    },
    // 显示时间，单位ms，设为0则不自动关闭
    duration: {
        type: Number,
        default: 3000,
    },
    // 是否显示关闭按钮
    showClose: {
        type: Boolean,
        default: false,
    },
    // 是否将message作为HTML片段处理
    dangerouslyUseHTMLString: {
        type: Boolean,
        default: false,
    },
    // 文字是否居中
    center: {
        type: Boolean,
        default: false,
    },
    // 自定义图标
    icon: {
        type: String,
        default: "",
    },
    // 自定义类名
    customClass: {
        type: String,
        default: "",
    },
    // 距离顶部的偏移量
    offset: {
        type: Number,
        default: 20,
    },
    // 关闭时的回调函数
    onClose: {
        type: Function,
        default: undefined,
    },
    // 消息唯一ID
    id: {
        type: String,
        default: "",
    },
    // z-index
    zIndex: {
        type: Number,
        default: 2000,
    },
} as const;

export type MessageProps = ExtractPropTypes<typeof messageProps>;

export type MessageType = (typeof MessageType)[number];

export interface MessageOptions {
    type?: MessageType;
    message?: string | VNode;
    duration?: number;
    showClose?: boolean;
    dangerouslyUseHTMLString?: boolean;
    center?: boolean;
    icon?: string;
    customClass?: string;
    offset?: number;
    onClose?: () => void;
}

export interface MessageInstance {
    id: string;
    close: () => void;
}
