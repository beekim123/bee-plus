<template>
  <button
    class="bee-button"
    :class="[
      type ? 'bee-button--' + type : '',
      size ? 'bee-button--' + size : '',
      {
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
        'is-loading': loading,
      },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <i v-if="loading" class="bee-icon-loading"></i>
    <i v-if="icon && !loading" :class="`bee-icon-${icon}`"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { buttonProps } from "./button";

defineOptions({
  name: "BeeButton",
});

const props = defineProps(buttonProps);
const emit = defineEmits(["click"]);

const handleClick = (evt: MouseEvent) => {
  if (props.disabled || props.loading) return;
  emit("click", evt);
};
</script>
