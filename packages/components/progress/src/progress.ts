import type { ExtractPropTypes, PropType } from 'vue'

export type ProgressType = 'line' | 'circle' | 'dashboard'

export const progressProps = {
    percentage: {
        type: Number,
        default: 0,
        required: true,
        validator: (val: number) => val >= 0 && val <= 100
    },
    type: {
        type: String as PropType<ProgressType>,
        default: 'line',
        values: ['line', 'circle', 'dashboard']
    },
    strokeWidth: {
        type: Number,
        default: 6
    },
    textInside: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        values: ['success', 'warning', 'exception', ''],
        default: ''
    },
    color: {
        type: [String, Function, Array] as PropType<string | Function | Array<any>>,
        default: ''
    },
    width: {
        type: Number,
        default: 126
    },
    showText: {
        type: Boolean,
        default: true
    },
    strokeLinecap: {
        type: String,
        default: 'round'
    },
    useCanvas: {
        type: Boolean,
        default: false
    },
    animated: {
        type: Boolean,
        default: true
    },
    format: {
        type: Function,
        default: (percentage: number) => `${percentage}%`
    }
}

export type ProgressProps = ExtractPropTypes<typeof progressProps>
