<template>
  <Transition name="bee-message-fade" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :id="id"
      :class="[
        'bee-message',
        type ? `bee-message--${type}` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass,
      ]"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <i v-if="iconClass" :class="iconClass"></i>
      
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="bee-message__content">
          {{ message }}
        </p>
        <p
          v-else
          class="bee-message__content"
          v-html="message"
        />
      </slot>

      <i
        v-if="showClose"
        class="bee-message__closeBtn bee-icon-close"
        @click="close"
      ></i>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { messageProps } from "./message";

defineOptions({
  name: "BeeMessage",
});

const props = defineProps(messageProps);
const emit = defineEmits(["destroy"]);

const visible = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

// 计算图标类名
const iconClass = computed(() => {
  if (props.icon) {
    return `bee-icon-${props.icon}`;
  }
  const iconMap: Record<string, string> = {
    success: "bee-icon-success",
    warning: "bee-icon-warning",
    error: "bee-icon-error",
    info: "bee-icon-info",
  };
  return iconMap[props.type] || "";
});

// 自定义样式（用于设置 offset 和 z-index）
const customStyle = computed(() => ({
  top: `${props.offset}px`,
  zIndex: props.zIndex,
}));

// 开始计时器
const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close();
    }, props.duration);
  }
};

// 清除计时器
const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

// 关闭消息
const close = () => {
  visible.value = false;
  clearTimer();
  if (typeof props.onClose === "function") {
    props.onClose();
  }
};

// 挂载时显示并开始计时器
onMounted(() => {
  visible.value = true;
  startTimer();
});

// 暴露close方法供外部调用
defineExpose({
  close,
  visible,
});
</script>

<style scoped>
.bee-message {
  min-width: 380px;
  box-sizing: border-box;
  border-radius: 16px;
  /* 硬核卡通风格：粗黑边框 */
  border: 4px solid #000;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  /* 默认背景色 */
  background-color: #f5f6fa;
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  overflow: hidden;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  /* 添加阴影效果 - 卡通风格 */
  box-shadow: 
    0 6px 0 rgba(0,0,0,0.8),
    0 8px 16px rgba(0,0,0,0.3);
  font-weight: 700;
}

/* 鼠标悬停时向下按压效果 */
.bee-message:hover {
  transform: translateX(-50%) translateY(2px);
  box-shadow: 
    0 4px 0 rgba(0,0,0,0.8),
    0 6px 12px rgba(0,0,0,0.3);
}

.bee-message.is-center {
  justify-content: center;
}

.bee-message.is-closable .bee-message__content {
  padding-right: 16px;
}

.bee-message__content {
  padding: 0;
  font-size: 16px;
  line-height: 1.4;
  margin: 0;
  color: #2c3e50;
  font-weight: 700;
  text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
}

.bee-message i {
  margin-right: 12px;
  font-size: 22px;
  line-height: 1;
  filter: drop-shadow(1px 1px 0 rgba(0,0,0,0.2));
}

.bee-message__closeBtn {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 900;
  transition: all 0.2s;
}

.bee-message__closeBtn:hover {
  color: #ff4757;
  transform: translateY(-50%) scale(1.2);
}

/* Success - 鲜艳绿色 */
.bee-message--success {
  background: linear-gradient(135deg, #7bed9f 0%, #70a1ff 100%);
  border-color: #000;
}

.bee-message--success .bee-message__content {
  color: #fff;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.3);
}

.bee-message--success i {
  color: #fff;
}

/* Warning - 橙黄色 */
.bee-message--warning {
  background: linear-gradient(135deg, #ffa502 0%, #fbc531 100%);
  border-color: #000;
}

.bee-message--warning .bee-message__content {
  color: #2d3436;
  text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
}

.bee-message--warning i {
  color: #2d3436;
}

/* Error - 红色 */
.bee-message--error {
  background: linear-gradient(135deg, #ff6348 0%, #ff4757 100%);
  border-color: #000;
}

.bee-message--error .bee-message__content {
  color: #fff;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.3);
}

.bee-message--error i {
  color: #fff;
}

/* Info - 蓝色 */
.bee-message--info {
  background: linear-gradient(135deg, #5f27cd 0%, #00a8ff 100%);
  border-color: #000;
}

.bee-message--info .bee-message__content {
  color: #fff;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.3);
}

.bee-message--info i {
  color: #fff;
}

/* 动画效果 - 从上往下弹出 */
.bee-message-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.bee-message-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.bee-message-fade-enter-from {
  transform: translate(-50%, -150%) scale(0.8);
  opacity: 0;
}

.bee-message-fade-leave-to {
  transform: translate(-50%, -150%) scale(0.8);
  opacity: 0;
}
</style>
