<template>
  <section class="projects-section">
    <div class="prompt">Hover to learn more</div>
    <div 
      v-for="(row, rowIndex) in projectRows" 
      :key="rowIndex" 
      class="project-row"
      :class="{ 'row-reverse': rowIndex % 2 === 0 }"
    >
      <div 
        v-for="(project, projectIndex) in row" 
        :key="projectIndex" 
        class="project-card"
        :class="{ 'fade-in': isVisible[rowIndex * 2 + projectIndex] }"
        :style="{ background: getProjectColor(rowIndex * 2 + projectIndex) }"
        :ref="el => setProjectRef(el, rowIndex * 2 + projectIndex)"
      >
        <img v-if="project.image" :src="project.image" :alt="project.title" class="project-image">
        <component 
          v-if="project.component" 
          :is="project.component" 
          class="project-image" 
          v-bind="project.iconColor ? { color: project.iconColor } : {}"
        />
        <div class="project-content">
          <h3 class="project-title">{{ project.title }}</h3>
        </div>
        <div class="project-overlay">
          <div class="overlay-content">
            <h3 class="overlay-title">{{ project.title }}</h3>
            <p class="overlay-description">{{ project.description }}</p>
            <div class="tech-wrapper"><span class="tech" v-for="(tech, index) in project.tech" :key="index">{{ tech }}</span></div>
            <button class="overlay-button">{{project.btnLabel || 'Launch'}}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import InterviewSvg from "../svgs/InterviewSvg.vue";
import TargetShooterSvg from "../svgs/TargetShooterSvg.vue";
import SachaCartoonArmsCrossed from "../svgs/SachaCartoonArmsCrossed.vue";
import { PhBank } from "@phosphor-icons/vue";

// TypeScript interfaces
interface Project {
  title: string;
  description: string;
  image?: string;
  component?: any;
  iconColor?: string;
  tech?: string[];
}

const rootStyles = getComputedStyle(document.documentElement);
const iconColor = rootStyles.getPropertyValue('--c-font-light').trim();

const minOpacity = 0.05;
const maxOpacity = 0.3;
const colors = [
  `linear-gradient(
           135deg,
           rgba(0, 188, 212, ${minOpacity}),
           rgba(0, 188, 212, ${maxOpacity})
         )`,// Bright Cyan
         `linear-gradient(
           135deg,
           rgba(29, 233, 182, ${minOpacity}),
           rgba(29, 233, 182, ${maxOpacity})
         )`,// Mint Green
         `linear-gradient(
           135deg,
           rgba(41, 182, 246, ${minOpacity}),
           rgba(41, 182, 246, ${maxOpacity})
         )`,// Sky Blue
         `linear-gradient(
           135deg,
           rgba(77, 208, 225, ${minOpacity}),
           rgba(77, 208, 225, ${maxOpacity})
         )`,// Light Aqua
         `linear-gradient(
           135deg,
           rgba(100, 255, 218, ${minOpacity}),
           rgba(100, 255, 218, ${maxOpacity})
         )`,// Neon Teal
         `linear-gradient(
           135deg,
           rgba(129, 212, 250, ${minOpacity}),
           rgba(129, 212, 250, ${maxOpacity})
         )`,// Light Blue
];

const projects: Project[] = [
{ title: 'Portfolio', description: "The site you're viewing is built with a microfrontend architecture, which enables it to load each application in the list as a separate module.", component: SachaCartoonArmsCrossed, tech: ["Microfrontend", "Vue", "SCSS", "custom packages", "Vite"], btnLabel:"Learn more" },
  { title: 'Job Search', description: "A very basic game that can use a mobile phone as a controller based on the phones movement (also keyboard/swipe compatible). Loosly based on Snake. Get to the targets and avoid the trees which block you. For the best experience move around by tilting the phone.", component: InterviewSvg, tech: ["Vue", "SCSS", "Node.js", "Websockets", "devicemotion api", "Vite"] },
  { title: 'Target Shooter', description: "A basic game using hand detection to allow the user to shape their fingers like a gun and shoot targets on the screen and reload", component: TargetShooterSvg, tech: ["MediaPipe", "TensorFlow.js", "React", "TypeScript", "Canvas Api", "SCSS", "Vite"] },
  { title: 'Finance Tracker', description: "A very simple app in which you can upload credit card and bank statements and analyze your spending habits", component: PhBank, iconColor, tech: ["React", "TypeScript", "SCSS", "Vite"] },
];

// Group projects into rows of 2
const projectRows = computed((): Project[][] => {
  const rows: Project[][] = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }
  return rows;
});

// Function to get color for a project, cycling through the colors array
const getProjectColor = (projectIndex: number): string => {
  return colors[projectIndex % colors.length];
};

// Intersection Observer for fade-in animation
const isVisible = ref<boolean[]>(new Array(projects.length).fill(false));
const projectRefs = ref<HTMLElement[]>([]);
let observer: IntersectionObserver | null = null;

const setProjectRef = (el: any, index: number): void => {
  if (el && el.tagName) {
    projectRefs.value[index] = el as HTMLElement;
  }
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = projectRefs.value.indexOf(entry.target as HTMLElement);
        if (index !== -1 && entry.isIntersecting) {
          isVisible.value[index] = true;
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  // Observe all project cards
  projectRefs.value.forEach((ref) => {
    if (ref) {
      observer?.observe(ref);
    }
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped lang="scss">
@use "@sacha/theme/src/styles/_media" as *;
.projects-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);

  .prompt {
    color: var(--c-font-light);
    font-family: var(--font-family-heading);
    font-size: var(--font-m);
    // margin-bottom: var(--space-l);
  }


.project-row {
  display: grid;
  grid-template-columns: 60% 40%;
  gap: var(--space-m);
  border-radius: 16px;
  
  &.row-reverse {
    grid-template-columns: 40% 60%;
  }
  
  @include respond-to(md) {
    grid-template-columns: 1fr!important;
  }
}

.project-card {
  border-radius: 12px;
  padding: var(--space-m);
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ease;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  
  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    
    .project-overlay {
      opacity: 1;
      visibility: visible;
    }
    
    .project-content {
      opacity: 0;
    }
  }
}

.project-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: var(--space-s);
}

.project-content {
  transition: opacity 0.3s ease;
  
  .project-title {
    color: var(--c-font-light);
    font-size: var(--font-l);
    font-weight: bold;
    margin-bottom: var(--space-xs);
  }
  
  .project-description {
    color: var(--c-font-muted);
    font-size: var(--font-s);
    line-height: 1.4;
  }
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--c-bg-dark-overlay-2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  border-radius: 12px;
  
  .overlay-content {
    text-align: center;
    color: white;
    padding: var(--space-m);
    
    .overlay-title {
      font-size: var(--font-l);
      font-weight: bold;
      margin-bottom: var(--space-s);
      color: white;
    }
    
    .overlay-description {
      // font-size: var(--font-s);
      line-height: 1.4;
      margin-bottom: var(--space-m);
      color: rgba(255, 255, 255, 0.9);
      text-align: left;
    }
    
    .overlay-button {
      background: var(--c-bg-light);
      color: white;
      border: none;
      padding: var(--space-s) var(--space-m);
      border-radius: var(--radius-full);
      font-size: var(--font-s);
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
      outline: none;
      
      &:active {
        background: var(--c-highlight-darker);
      }
    }

    .tech-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-s);
      justify-content: center;
      margin-bottom: var(--space-xl);
      font-size: var(--font-s);
      color: var(--c-font-dark);
      font-weight: bold;

      .tech {
        background-color: var(--c-highlight);
        border-radius: var(--radius-full);
        padding: var(--space-xxs) var(--space-xs);
      }
    }
  }
}
}
</style>
