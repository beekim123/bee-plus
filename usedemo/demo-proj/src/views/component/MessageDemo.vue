<script setup lang="ts">
import { BeeButton, BeeMessage } from '@bee-plus/components'
import DemoBlock from '../../components/DemoBlock.vue'

const codeBasic = `import { BeeMessage } from 'bee-plus'

// 基础用法
BeeMessage('这是一条消息提示')

// 使用对象配置
BeeMessage({
  message: '这是一条消息提示',
  type: 'info'
})`

const codeTypes = `import { BeeMessage } from 'bee-plus'

// 使用快捷方法
BeeMessage.success('恭喜你，这是一条成功消息')
BeeMessage.warning('警告哦，这是一条警告消息')
BeeMessage.error('错了哦，这是一条错误消息')
BeeMessage.info('这是一条普通消息')`

const codeClosable = `import { BeeMessage } from 'bee-plus'

BeeMessage({
  message: '可以手动关闭的消息',
  showClose: true,
  duration: 0  // 设置为0则不会自动关闭
})`

const codeHtml = `import { BeeMessage } from 'bee-plus'

BeeMessage({
  dangerouslyUseHTMLString: true,
  message: '<strong>这是 <i>HTML</i> 片段</strong>'
})`

const codeCenter = `import { BeeMessage } from 'bee-plus'

BeeMessage({
  message: '居中的文字',
  center: true,
  type: 'success'
})`

// 示例方法
const openBasic = () => {
  BeeMessage('这是一条消息提示')
}

const openSuccess = () => {
  BeeMessage.success('恭喜你，这是一条成功消息')
}

const openWarning = () => {
  BeeMessage.warning('警告哦，这是一条警告消息')
}

const openError = () => {
  BeeMessage.error('错了哦，这是一条错误消息')
}

const openInfo = () => {
  BeeMessage.info('这是一条普通消息')
}

const openClosable = () => {
  BeeMessage({
    message: '可以手动关闭的消息（鼠标悬停会暂停计时）',
    showClose: true,
    duration: 10000
  })
}

const openNonAutoClose = () => {
  BeeMessage({
    message: '不会自动关闭的消息',
    showClose: true,
    duration: 0
  })
}

const openHtml = () => {
  BeeMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>这是 <i>HTML</i> 片段</strong>',
    type: 'warning'
  })
}

const openCenter = () => {
  BeeMessage({
    message: '居中的文字',
    center: true,
    type: 'success'
  })
}

const openCustomIcon = () => {
  BeeMessage({
    message: '自定义图标的消息',
    icon: 'star-on',
    type: 'success'
  })
}

const openMultiple = () => {
  BeeMessage.info('第一条消息')
  setTimeout(() => {
    BeeMessage.success('第二条消息')
  }, 200)
  setTimeout(() => {
    BeeMessage.warning('第三条消息')
  }, 400)
}

const openWithCallback = () => {
  BeeMessage({
    message: '3秒后会关闭并触发回调',
    type: 'info',
    duration: 3000,
    onClose: () => {
      BeeMessage.success('回调函数被触发了！')
    }
  })
}
</script>

<template>
  <div class="component-demo">
    <h2>Message 消息提示</h2>
    <p class="desc">常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。</p>

    <DemoBlock title="基础用法" desc="从顶部出现，3 秒后自动消失。" :code="codeBasic">
      <BeeButton @click="openBasic">打开消息提示</BeeButton>
    </DemoBlock>

    <DemoBlock title="不同类型" desc="用来显示「成功、警告、消息、错误」类的操作反馈。" :code="codeTypes">
      <BeeButton type="success" @click="openSuccess">成功</BeeButton>
      <BeeButton type="warning" @click="openWarning">警告</BeeButton>
      <BeeButton type="danger" @click="openError">错误</BeeButton>
      <BeeButton type="info" @click="openInfo">消息</BeeButton>
    </DemoBlock>

    <DemoBlock title="可关闭" desc="可以添加关闭按钮。" :code="codeClosable">
      <BeeButton @click="openClosable">可手动关闭（10秒）</BeeButton>
      <BeeButton @click="openNonAutoClose">不会自动关闭</BeeButton>
    </DemoBlock>

    <DemoBlock title="文字居中" desc="使用 center 属性让文字水平居中。" :code="codeCenter">
      <BeeButton @click="openCenter">文字居中</BeeButton>
    </DemoBlock>

    <DemoBlock title="使用 HTML 片段" desc="message 属性支持传入 HTML 片段。将 dangerouslyUseHTMLString 设置为 true，message 就会被当作 HTML 片段处理。" :code="codeHtml">
      <BeeButton type="warning" @click="openHtml">使用 HTML</BeeButton>
    </DemoBlock>

    <DemoBlock title="更多功能" desc="支持自定义图标、多条消息堆叠、关闭回调等。" code="">
      <BeeButton @click="openCustomIcon">自定义图标</BeeButton>
      <BeeButton type="primary" @click="openMultiple">多条消息</BeeButton>
      <BeeButton type="success" @click="openWithCallback">关闭回调</BeeButton>
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
