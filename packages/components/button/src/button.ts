import type { ExtractPropTypes } from "vue";

export const ButtonType = [
    "primary",
    "success",
    "info",
    "warning",
    "danger",
    "default",
] as const;

export const ButtonSize = ["large", "default", "small"] as const;

export const buttonProps = {
    type: {
        type: String,
        values: ButtonType,
        default: "default",
    },
    size: {
        type: String,
        values: ButtonSize,
        default: "default",
    },
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
    disabled: Boolean,
    icon: String,
    loading: Boolean,
} as const;

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
