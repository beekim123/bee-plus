<template>
  <div
    class="bee-progress"
    :class="[
      'bee-progress--' + type,
      status ? 'is-' + status : '',
      {
        'bee-progress--without-text': !showText,
        'bee-progress--text-inside': textInside,
      }
    ]"
    role="progressbar"
    :aria-valuenow="currentValue"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <!-- Canvas Mode -->
    <div v-if="useCanvas" class="bee-progress-canvas">
       <canvas ref="canvasRef" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>

    <!-- DOM/SVG Mode -->
    <template v-else>
      <!-- Line Progress -->
      <div v-if="type === 'line'" class="bee-progress-bar">
        <div
          class="bee-progress-bar__outer"
          :style="{ height: strokeWidth + 'px' }"
        >
          <div
            class="bee-progress-bar__inner"
            :style="barStyle"
          >
            <div v-if="textInside && showText" class="bee-progress-bar__innerText">
              {{ content }}
            </div>
          </div>
        </div>
      </div>

      <!-- Circle / Dashboard Progress -->
      <div
        v-else
        class="bee-progress-circle"
        :style="{ width: width + 'px', height: width + 'px' }"
      >
        <svg viewBox="0 0 100 100">
          <path
            class="bee-progress-circle__track"
            :d="trackPath"
            fill="none"
            :stroke-width="relativeStrokeWidth"
            :style="trackStyle"
          ></path>
          <path
            class="bee-progress-circle__path"
            :d="trackPath"
            fill="none"
            stroke-linecap="round"
            :stroke-width="relativeStrokeWidth"
            :style="circlePathStyle"
          ></path>
        </svg>
      </div>
    </template>

    <!-- Text (Outside) -->
    <div
      v-if="!textInside && showText"
      class="bee-progress__text"
      :style="{ fontSize: progressTextSize + 'px' }"
    >
      <slot v-if="$slots.default"></slot>
      <template v-else>
        <span v-if="!status">{{ content }}</span>
        <i v-else :class="statusIconClass"></i>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { progressProps } from './progress'

defineOptions({
  name: 'BeeProgress'
})

const props = defineProps(progressProps)

const currentValue = ref(props.percentage)
const animationFrameId = ref<number | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

// --- Common Logic ---
const content = computed(() => props.format(Math.round(currentValue.value)))

const progressTextSize = computed(() => {
  return props.type === 'line' ? 12 + props.strokeWidth * 0.4 : props.width * 0.111111 + 2
})

const statusIconClass = computed(() => {
  if (props.status === 'warning') return 'bee-icon-warning'
  if (props.status === 'success') return 'bee-icon-check'
  if (props.status === 'exception') return 'bee-icon-close'
  return ''
})

const getCurrentColor = (percentage: number) => {
  if (typeof props.color === 'function') {
    return props.color(percentage)
  } else if (typeof props.color === 'string' && props.color) {
    return props.color
  } else {
    return getLevelColor(percentage)
  }
}

const getLevelColor = (percentage: number) => {
  if (Array.isArray(props.color)) {
      const colorArray = [...props.color].sort((a, b) => a.percentage - b.percentage);
       for (let i = 0; i < colorArray.length; i++) {
        if (colorArray[i].percentage > percentage) {
          return colorArray[i].color
        }
      }
      return colorArray[colorArray.length - 1]?.color
  }
  return props.status === 'success' ? '#2ed573' :
         props.status === 'warning' ? '#ffa502' :
         props.status === 'exception' ? '#ff4757' : '#409eff'
}

// --- DOM / SVG Logic ---

const barStyle = computed(() => {
  return {
    width: `${currentValue.value}%`,
    backgroundColor: getCurrentColor(currentValue.value),
    transition: 'none' // Remove CSS transition to avoid conflict with JS animation
  }
})

const relativeStrokeWidth = computed(() => {
  return (props.strokeWidth / props.width) * 100
})

const radius = computed(() => {
  if (props.type === 'circle' || props.type === 'dashboard') {
    return 50 - relativeStrokeWidth.value / 2
  }
  return 0
})

const trackPath = computed(() => {
  const r = radius.value
  const isDashboard = props.type === 'dashboard'
  return `
    M 50 50
    m 0 ${isDashboard ? '' : '-'}${r}
    a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
    a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
    `
})

const perimeter = computed(() => {
  return 2 * Math.PI * radius.value
})

const rate = computed(() => {
  return props.type === 'dashboard' ? 0.75 : 1
})

const strokeDashoffset = computed(() => {
  const offset = -1 * perimeter.value * (1 - rate.value) / 2
  return `${offset}px`
})

const circlePathStyle = computed(() => {
  return {
    strokeDasharray: `${perimeter.value * rate.value * (currentValue.value / 100)}px, ${perimeter.value}px`,
    strokeDashoffset: strokeDashoffset.value,
    transition: 'none',
    stroke: getCurrentColor(currentValue.value)
  }
})

const trackStyle = computed(() => {
   return {
    strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
    strokeDashoffset: strokeDashoffset.value,
   }
})

// --- Canvas Logic ---
const canvasWidth = computed(() => props.type === 'line' ? 300 : props.width)
const canvasHeight = computed(() => props.type === 'line' ? props.strokeWidth * 3 : props.width)



const drawLine = (ctx: CanvasRenderingContext2D) => {
  const w = canvasWidth.value
  const h = props.strokeWidth
  const r = h / 2
  const y = (canvasHeight.value - h) / 2

  // Track (Background)
  ctx.beginPath()
  ctx.fillStyle = '#f3f3f3'
  ctx.roundRect(0, y, w, h, r)
  ctx.fill()

  // Bar (Progress)
  const progressW = (currentValue.value / 100) * w
  if (progressW > 0) {
    ctx.beginPath()
    ctx.fillStyle = getCurrentColor(currentValue.value)
    ctx.roundRect(0, y, progressW, h, r)
    ctx.fill()
  }

  // Text Inside Canvas?
  if (props.textInside && props.showText) {
     ctx.fillStyle = '#fff'
     ctx.font = '12px Rubik'
     ctx.textAlign = 'right'
     ctx.textBaseline = 'middle'
     if (progressW > 30) {
        ctx.fillText(`${Math.round(currentValue.value)}%`, progressW - 5, y + h / 2)
     }
  }
}

const drawCircle = (ctx: CanvasRenderingContext2D, isDashboard: boolean) => {
  const cx = canvasWidth.value / 2
  const cy = canvasHeight.value / 2
  const r = (props.width - props.strokeWidth) / 2
  const startAngle = isDashboard ? Math.PI * 0.75 : -Math.PI * 0.5
  const totalAngle = isDashboard ? Math.PI * 1.5 : Math.PI * 2
  const endAngle = startAngle + totalAngle * (currentValue.value / 100)
  const trackEndAngle = startAngle + totalAngle

  ctx.lineCap = props.strokeLinecap as CanvasLineCap
  ctx.lineWidth = props.strokeWidth

  // Track
  ctx.beginPath()
  ctx.strokeStyle = '#f3f3f3'
  ctx.arc(cx, cy, r, startAngle, trackEndAngle)
  ctx.stroke()

  // Process
  if (currentValue.value > 0) {
    ctx.beginPath()
    ctx.strokeStyle = getCurrentColor(currentValue.value)
    ctx.arc(cx, cy, r, startAngle, endAngle)
    ctx.stroke()
  }
}

const renderCanvas = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (props.type === 'line') {
        drawLine(ctx)
    } else {
        drawCircle(ctx, props.type === 'dashboard')
    }
}

// --- Unified Animation Logic ---
const animateProgress = () => {
    if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value)

    const target = props.percentage
    const animated = props.animated
    const speed = 2.0 // Animation speed increased

    if (!animated) {
        currentValue.value = target
        if (props.useCanvas) renderCanvas()
        return
    }

    if (Math.abs(currentValue.value - target) < speed) {
        currentValue.value = target
        if (props.useCanvas) renderCanvas()
        return
    }

    if (currentValue.value < target) {
        currentValue.value += speed
    } else {
        currentValue.value -= speed
    }

    if (props.useCanvas) renderCanvas()
    animationFrameId.value = requestAnimationFrame(animateProgress)
}

watch(() => props.percentage, animateProgress)
watch(() => props.animated, animateProgress)
watch(() => props.useCanvas, (val) => {
    if (val) renderCanvas()
})
watch(() => [props.type, props.strokeWidth, props.width, props.color], () => {
    if(props.useCanvas) renderCanvas()
})

onMounted(() => {
    if (props.useCanvas) renderCanvas()
})

onUnmounted(() => {
    if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value)
})

</script>
