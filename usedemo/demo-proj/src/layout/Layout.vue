<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { name: 'Button 按钮', path: '/component/button' },
  { name: 'Progress 进度条', path: '/component/progress' },
]
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <div class="logo">🐝 Bee Plus</div>
    </header>

    <div class="main-body">
      <aside class="app-sidebar">
        <nav>
          <RouterLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="menu-item"
            :class="{ active: route.path === item.path }"
          >
            {{ item.name }}
          </RouterLink>
        </nav>
      </aside>

      <main class="app-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #2f3640; /* Dark background for the whole app */
  font-family: 'Rubik', sans-serif;
  color: #2c3e50;
}

.app-header {
  height: 80px;
  background: #fbc531; /* Pop Yellow */
  color: #2d3436;
  display: flex;
  align-items: center;
  padding: 0 30px;
  border-bottom: 4px solid #000;
  z-index: 10;
}

.logo {
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 
    3px 3px 0 #000,
    -1px -1px 0 #000,  
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
  letter-spacing: 1px;
}

.main-body {
  display: flex;
  flex: 1;
}

.app-sidebar {
  width: 260px;
  background: #353b48; /* Dark Blue-Grey */
  border-right: 4px solid #000;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: block;
  padding: 16px 20px;
  margin-bottom: 10px;
  text-decoration: none;
  color: #dcdde1;
  font-weight: 700;
  font-size: 18px;
  border-radius: 12px;
  border: 3px solid transparent; /* Reserve space for border */
  transition: all 0.15s ease;
  text-transform: uppercase;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  transform: translateX(5px);
}

.menu-item.active {
  background-color: #00a8ff; /* Pop Cyan */
  color: #fff;
  border: 3px solid #000;
  box-shadow: 0 4px 0 rgba(0,0,0,0.4);
  transform: translateY(-2px);
  text-shadow: 2px 2px 0 #000;
}

.menu-item.active:active {
  transform: translateY(2px);
  box-shadow: 0 0 0 rgba(0,0,0,0.4);
}

.app-content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  background-color: #f5f6fa;
  background-image: radial-gradient(#dcdde1 15%, transparent 16%), radial-gradient(#dcdde1 15%, transparent 16%);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}

@media (max-width: 768px) {
  .app-header {
    padding: 0 15px;
    height: 60px;
  }
  
  .logo {
    font-size: 24px;
  }

  .main-body {
    flex-direction: column;
  }

  .app-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 4px solid #000;
    padding: 10px;
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
    gap: 10px;
  }
  
  .menu-item {
    display: inline-block;
    margin-bottom: 0;
    padding: 8px 15px;
    font-size: 14px;
  }

  .app-content {
    padding: 20px;
  }
}
</style>
