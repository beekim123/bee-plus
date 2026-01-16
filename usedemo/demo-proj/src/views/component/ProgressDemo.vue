<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'

const percentageDashboard = ref(20)
const percentageCanvas = ref(60)
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 }
]

// 动画开关状态（始终开启）
const animatedLine = ref(true)
const animatedTextInside = ref(true)
const animatedCircle = ref(true)
const animatedDashboard = ref(true)
const animatedCanvas = ref(true)

// 每个区块的独立百分比变量
const linePercentages = ref([50, 100, 100, 50])
const textInsidePercentages = ref([70, 100, 80, 50])
const circlePercentages = ref([0, 25, 100, 70, 50])

// 触发动画重放效果
const toggleLineAnimation = () => {
  const targets = [50, 100, 100, 50]
  animatedLine.value = false
  linePercentages.value = [0, 0, 0, 0]
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animatedLine.value = true
      linePercentages.value = [...targets]
    })
  })
}

const toggleTextInsideAnimation = () => {
  const targets = [70, 100, 80, 50]
  animatedTextInside.value = false
  textInsidePercentages.value = [0, 0, 0, 0]
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animatedTextInside.value = true
      textInsidePercentages.value = [...targets]
    })
  })
}

const toggleCircleAnimation = () => {
  const targets = [0, 25, 100, 70, 50]
  animatedCircle.value = false
  circlePercentages.value = [0, 0, 0, 0, 0]
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animatedCircle.value = true
      circlePercentages.value = [...targets]
    })
  })
}

const toggleDashboardAnimation = () => {
  const currentValue = percentageDashboard.value
  animatedDashboard.value = false
  percentageDashboard.value = 0
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animatedDashboard.value = true
      percentageDashboard.value = currentValue
    })
  })
}

const toggleCanvasAnimation = () => {
  const currentValue = percentageCanvas.value
  animatedCanvas.value = false
  percentageCanvas.value = 0
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animatedCanvas.value = true
      percentageCanvas.value = currentValue
    })
  })
}

const increaseDashboard = () => {
    percentageDashboard.value += 10
    if(percentageDashboard.value > 100) {
        percentageDashboard.value = 100
    }
}
const decreaseDashboard = () => {
    percentageDashboard.value -= 10
    if(percentageDashboard.value < 0) {
        percentageDashboard.value = 0
    }
}

const increaseCanvas = () => {
    percentageCanvas.value += 10
    if(percentageCanvas.value > 100) {
        percentageCanvas.value = 100
    }
}
const decreaseCanvas = () => {
    percentageCanvas.value -= 10
    if(percentageCanvas.value < 0) {
        percentageCanvas.value = 0
    }
}
</script>

<template>
  <div class="component-demo">
    <h2>Progress 进度条</h2>
    <p class="lead">用于展示操作进度，告知用户当前状态和预期。</p>

    <!-- Linear Progress -->
    <DemoBlock title="直线进度条" desc="最基础的进度条" 
code='<bee-progress :percentage="50" :animated="true" />
<bee-progress :percentage="100" status="success" :animated="true" />
<bee-progress :percentage="100" status="warning" :animated="true" />
<bee-progress :percentage="50" status="exception" :animated="true" />'>
      <div style="margin-bottom: 15px;">
        <bee-button @click="toggleLineAnimation" size="small">
          查看动画效果
        </bee-button>
      </div>
      <div style="width: 100%; max-width: 500px">
         <bee-progress :percentage="linePercentages[0]" :animated="animatedLine" />
         <bee-progress :percentage="linePercentages[1]" status="success" :animated="animatedLine" />
         <bee-progress :percentage="linePercentages[2]" status="warning" :animated="animatedLine" />
         <bee-progress :percentage="linePercentages[3]" status="exception" :animated="animatedLine" />
      </div>
    </DemoBlock>


    <!-- Percentage Inside -->
    <DemoBlock title="百分比内显" desc="百分比不占用额外控件，适用于展示空间狭窄的场景。"
code='<bee-progress :percentage="70" :text-inside="true" :stroke-width="26" :animated="true" />
<bee-progress :percentage="100" :text-inside="true" :stroke-width="24" status="success" :animated="true" />
<bee-progress :percentage="80" :text-inside="true" :stroke-width="22" status="warning" :animated="true" />
<bee-progress :percentage="50" :text-inside="true" :stroke-width="20" status="exception" :animated="true" />'>
      <div style="margin-bottom: 15px;">
        <bee-button @click="toggleTextInsideAnimation" size="small">
          查看动画效果
        </bee-button>
      </div>
      <div style="width: 100%; max-width: 500px">
        <bee-progress :percentage="textInsidePercentages[0]" :text-inside="true" :stroke-width="26" :animated="animatedTextInside" />
        <bee-progress :percentage="textInsidePercentages[1]" :text-inside="true" :stroke-width="24" status="success" :animated="animatedTextInside" />
        <bee-progress :percentage="textInsidePercentages[2]" :text-inside="true" :stroke-width="22" status="warning" :animated="animatedTextInside" />
        <bee-progress :percentage="textInsidePercentages[3]" :text-inside="true" :stroke-width="20" status="exception" :animated="animatedTextInside" />
      </div>
    </DemoBlock>

    <!-- Circular Progress -->
    <DemoBlock title="环形进度条" desc="环形进度条。"
code='<bee-progress type="circle" :percentage="0" :animated="true" />
<bee-progress type="circle" :percentage="25" :animated="true" />
<bee-progress type="circle" :percentage="100" status="success" :animated="true" />
<bee-progress type="circle" :percentage="70" status="warning" :animated="true" />
<bee-progress type="circle" :percentage="50" status="exception" :animated="true" />'>
      <div style="margin-bottom: 15px;">
        <bee-button @click="toggleCircleAnimation" size="small">
          查看动画效果
        </bee-button>
      </div>
      <bee-progress type="circle" :percentage="circlePercentages[0]" :animated="animatedCircle" />
      <bee-progress type="circle" :percentage="circlePercentages[1]" :animated="animatedCircle" />
      <bee-progress type="circle" :percentage="circlePercentages[2]" status="success" :animated="animatedCircle" />
      <bee-progress type="circle" :percentage="circlePercentages[3]" status="warning" :animated="animatedCircle" />
      <bee-progress type="circle" :percentage="circlePercentages[4]" status="exception" :animated="animatedCircle" />
    </DemoBlock>

    <!-- Dashboard Progress -->
    <DemoBlock title="仪表盘进度条" desc="仪表盘形进度条。"
code='<bee-progress type="dashboard" :percentage="percentage" :color="colors" :animated="true" />'>
      <bee-progress type="dashboard" :percentage="percentageDashboard" :color="colors" :animated="animatedDashboard" />
       <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
         <bee-button @click="decreaseDashboard" icon="bee-icon-minus">-</bee-button>
         <bee-button @click="increaseDashboard" icon="bee-icon-plus">+</bee-button>
         <bee-button @click="toggleDashboardAnimation" size="small">
           查看动画效果
         </bee-button>
       </div>
    </DemoBlock>

    <!-- Canvas Progress (Experimental) -->
    <DemoBlock title="Canvas 模式" desc="使用 Canvas 渲染的进度条，性能更好（对于大量动画）。(Experimental)"
code='<bee-progress :percentage="percentage" :use-canvas="true" :animated="true" />
<bee-progress type="circle" :percentage="percentage" :use-canvas="true" :animated="true" />
<bee-progress type="dashboard" :percentage="percentage" :use-canvas="true" :animated="true" />'>
      <div style="width: 100%; display: flex; flex-direction: column; gap: 20px;">
        <bee-progress :percentage="percentageCanvas" :use-canvas="true" :animated="animatedCanvas" />
        
        <div style="display: flex; gap: 20px;">
           <bee-progress type="circle" :percentage="percentageCanvas" :use-canvas="true" :animated="animatedCanvas" />
           <bee-progress type="dashboard" :percentage="percentageCanvas" :use-canvas="true" :animated="animatedCanvas" />
        </div>
        
        <div style="margin-top: 10px; display: flex; gap: 10px; flex-wrap: wrap;">
           <bee-button @click="decreaseCanvas" icon="bee-icon-minus">-</bee-button>
           <bee-button @click="increaseCanvas" icon="bee-icon-plus">+</bee-button>
           <bee-button @click="toggleCanvasAnimation" size="small">
             查看动画效果
           </bee-button>
        </div>
      </div>
    </DemoBlock>

  </div>
</template>

<style scoped>
.component-demo {
  /* Layout handled by parent usually, but we ensure full width */
  width: 100%;
}

.lead {
  margin-bottom: 30px;
  color: #5e6d82;
}
</style>
