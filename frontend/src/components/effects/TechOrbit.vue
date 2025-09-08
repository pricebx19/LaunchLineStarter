<template>
  <div class="relative flex justify-center">
    <!-- Floating Tech Icons -->
    <div class="tech-orbit-container">
      <div class="tech-orbit">
        <div 
          v-for="(tech, index) in technologies" 
          :key="tech.name"
          :class="`tech-icon tech-${index + 1}`"
          :title="tech.name"
        >
          {{ tech.icon }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Technology {
  name: string
  icon: string
}

defineProps<{
  technologies: Technology[]
}>()
</script>

<style scoped>
/* Technology Orbit Container */
.tech-orbit-container {
  width: 300px;
  height: 300px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

/* Technology Orbit */
.tech-orbit {
  position: relative;
  width: 200px;
  height: 200px;
}

.tech-icon {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
}

.tech-icon:hover {
  background: rgba(59, 130, 246, 0.2);
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
  z-index: 10;
}

/* Individual orbit positions - all start from center */
.tech-1 { animation: orbit1 20s linear infinite; }
.tech-2 { animation: orbit2 20s linear infinite; }
.tech-3 { animation: orbit3 20s linear infinite; }
.tech-4 { animation: orbit4 20s linear infinite; }
.tech-5 { animation: orbit5 20s linear infinite; }
.tech-6 { animation: orbit6 20s linear infinite; }
.tech-7 { animation: orbit7 20s linear infinite; }
.tech-8 { animation: orbit8 20s linear infinite; }

/* Orbit animations with different starting positions */
@keyframes orbit1 { from { transform: translate(-30px, -30px) rotate(0deg) translateX(60px) rotate(0deg); } to { transform: translate(-30px, -30px) rotate(360deg) translateX(60px) rotate(-360deg); } }
@keyframes orbit2 { from { transform: translate(-30px, -30px) rotate(45deg) translateX(60px) rotate(-45deg); } to { transform: translate(-30px, -30px) rotate(405deg) translateX(60px) rotate(-405deg); } }
@keyframes orbit3 { from { transform: translate(-30px, -30px) rotate(90deg) translateX(60px) rotate(-90deg); } to { transform: translate(-30px, -30px) rotate(450deg) translateX(60px) rotate(-450deg); } }
@keyframes orbit4 { from { transform: translate(-30px, -30px) rotate(135deg) translateX(60px) rotate(-135deg); } to { transform: translate(-30px, -30px) rotate(495deg) translateX(60px) rotate(-495deg); } }
@keyframes orbit5 { from { transform: translate(-30px, -30px) rotate(180deg) translateX(60px) rotate(-180deg); } to { transform: translate(-30px, -30px) rotate(540deg) translateX(60px) rotate(-540deg); } }
@keyframes orbit6 { from { transform: translate(-30px, -30px) rotate(225deg) translateX(60px) rotate(-225deg); } to { transform: translate(-30px, -30px) rotate(585deg) translateX(60px) rotate(-585deg); } }
@keyframes orbit7 { from { transform: translate(-30px, -30px) rotate(270deg) translateX(60px) rotate(-270deg); } to { transform: translate(-30px, -30px) rotate(630deg) translateX(60px) rotate(-630deg); } }
@keyframes orbit8 { from { transform: translate(-30px, -30px) rotate(315deg) translateX(60px) rotate(-315deg); } to { transform: translate(-30px, -30px) rotate(675deg) translateX(60px) rotate(-675deg); } }

/* Responsive adjustments */
@media (max-width: 768px) {
  .tech-orbit-container {
    width: 250px;
    height: 250px;
  }
  
  .tech-orbit {
    width: 180px;
    height: 180px;
  }
  
  .tech-icon {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
  
  /* Mobile orbit animations with smaller radius */
  @keyframes orbit1 { from { transform: translate(-25px, -25px) rotate(0deg) translateX(45px) rotate(0deg); } to { transform: translate(-25px, -25px) rotate(360deg) translateX(45px) rotate(-360deg); } }
  @keyframes orbit2 { from { transform: translate(-25px, -25px) rotate(45deg) translateX(45px) rotate(-45deg); } to { transform: translate(-25px, -25px) rotate(405deg) translateX(45px) rotate(-405deg); } }
  @keyframes orbit3 { from { transform: translate(-25px, -25px) rotate(90deg) translateX(45px) rotate(-90deg); } to { transform: translate(-25px, -25px) rotate(450deg) translateX(45px) rotate(-450deg); } }
  @keyframes orbit4 { from { transform: translate(-25px, -25px) rotate(135deg) translateX(45px) rotate(-135deg); } to { transform: translate(-25px, -25px) rotate(495deg) translateX(45px) rotate(-495deg); } }
  @keyframes orbit5 { from { transform: translate(-25px, -25px) rotate(180deg) translateX(45px) rotate(-180deg); } to { transform: translate(-25px, -25px) rotate(540deg) translateX(45px) rotate(-540deg); } }
  @keyframes orbit6 { from { transform: translate(-25px, -25px) rotate(225deg) translateX(45px) rotate(-225deg); } to { transform: translate(-25px, -25px) rotate(585deg) translateX(45px) rotate(-585deg); } }
  @keyframes orbit7 { from { transform: translate(-25px, -25px) rotate(270deg) translateX(45px) rotate(-270deg); } to { transform: translate(-25px, -25px) rotate(630deg) translateX(45px) rotate(-630deg); } }
  @keyframes orbit8 { from { transform: translate(-25px, -25px) rotate(315deg) translateX(45px) rotate(-315deg); } to { transform: translate(-25px, -25px) rotate(675deg) translateX(45px) rotate(-675deg); } }
}
</style>
