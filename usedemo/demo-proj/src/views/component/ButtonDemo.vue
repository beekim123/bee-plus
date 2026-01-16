<script setup lang="ts">
import { BeeButton } from '@bee-plus/components'
import DemoBlock from '../../components/DemoBlock.vue'

const codeBasic = `<BeeButton>Default</BeeButton>
<BeeButton type="primary">Primary</BeeButton>
<BeeButton type="success">Success</BeeButton>
<BeeButton type="warning">Warning</BeeButton>
<BeeButton type="danger">Danger</BeeButton>
<BeeButton type="info">Info</BeeButton>`

const codeRound = `<BeeButton type="primary" round>Round Button</BeeButton>
<BeeButton type="success" round icon="check">Submit</BeeButton>
<BeeButton type="danger" circle icon="delete"></BeeButton>
<BeeButton type="warning" circle icon="star-off"></BeeButton>
<BeeButton type="primary" circle icon="search"></BeeButton>`

const codeDisabled = `<BeeButton disabled>Disabled</BeeButton>
<BeeButton type="primary" disabled>Disabled</BeeButton>
<BeeButton type="success" loading>Loading</BeeButton>`

const codeSize = `<BeeButton size="large" type="primary">Large</BeeButton>
<BeeButton type="primary">Default</BeeButton>
<BeeButton size="small" type="primary">Small</BeeButton>`
</script>

<template>
  <div class="component-demo">
    <h2>Button 按钮</h2>
    <p class="desc">基础的按钮用法，支持多种颜色、尺寸和状态。</p>

    <DemoBlock title="基础用法" desc="基础的按钮用法。" :code="codeBasic">
      <BeeButton>Default</BeeButton>
      <BeeButton type="primary">Primary</BeeButton>
      <BeeButton type="success">Success</BeeButton>
      <BeeButton type="warning">Warning</BeeButton>
      <BeeButton type="danger">Danger</BeeButton>
      <BeeButton type="info">Info</BeeButton>
    </DemoBlock>

    <DemoBlock title="圆角与图标" desc="设置 round 属性可以变为圆角按钮，设置 circle 属性可以变为圆形按钮。" :code="codeRound">
      <BeeButton type="primary" round>Round Button</BeeButton>
      <BeeButton type="success" round icon="check">Submit</BeeButton>
      <BeeButton type="danger" circle icon="delete"></BeeButton>
      <BeeButton type="warning" circle icon="star-off"></BeeButton>
      <BeeButton type="primary" circle icon="search"></BeeButton>
    </DemoBlock>

    <DemoBlock title="禁用状态" desc="按钮不可用状态。" :code="codeDisabled">
      <BeeButton disabled>Disabled</BeeButton>
      <BeeButton type="primary" disabled>Disabled</BeeButton>
      <BeeButton type="success" loading>Loading</BeeButton>
    </DemoBlock>

    <DemoBlock title="不同尺寸" desc="Button 组件提供除了默认值以外的两种尺寸。" :code="codeSize">
      <BeeButton size="large" type="primary">Large</BeeButton>
      <BeeButton type="primary">Default</BeeButton>
      <BeeButton size="small" type="primary">Small</BeeButton>
    </DemoBlock>
  </div>
</template>

<style scoped>
.component-demo {
  width: 100%;
}

h2 {
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 20px;
  color: #2c3e50;
  text-transform: uppercase;
  text-shadow: 2px 2px 0 #fff;
  letter-spacing: 1px;
}

.desc {
  font-size: 18px;
  color: #2f3640;
  margin-bottom: 40px;
  font-weight: 500;
  background: rgba(255,255,255,0.5);
  padding: 10px 20px;
  border-radius: 12px;
  display: inline-block;
  border: 2px solid rgba(0,0,0,0.1);
}
</style>
