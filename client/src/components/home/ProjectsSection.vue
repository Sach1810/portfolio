<template>
  <section class="projects-section">
    <div class="prompt">{{isMobile ? 'Tap' : 'Hover'}} to learn more (work in progress)</div>
    <div v-for="(row, rowIndex) in projectRows" :key="rowIndex" class="project-row"
      :class="{ 'row-reverse': rowIndex % 2 === 0 }">
      <div v-for="(project, projectIndex) in row" :key="projectIndex" class="project-card"
        :class="{ 'fade-in': isVisible[rowIndex * 2 + projectIndex] }"
        :style="{ background: getProjectColor(rowIndex * 2 + projectIndex) }"
        :ref="el => setProjectRef(el, rowIndex * 2 + projectIndex)">
        <img v-if="project.image" :src="project.image" :alt="project.title" class="project-image">
        <component v-if="project.component" :is="project.component" class="project-image"
          v-bind="project.iconColor ? { color: project.iconColor } : {}" />
        <div class="project-content">
          <h3 class="project-title">{{ project.title }}</h3>
        </div>
        <div class="project-overlay">
          <div class="overlay-content">
            <h3 class="overlay-title">{{ project.title }}</h3>
            <p class="overlay-description">{{ project.description }}</p>
            <div class="tech-wrapper"><span class="tech" v-for="(tech, index) in project.tech" :key="index">{{ tech
            }}</span></div>
            <button v-if="project.onClick" class="overlay-button" @click="project.onClick">{{ project.btnLabel || 'Launch' }}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Bowser from "bowser";
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import InterviewSvg from "../jobsearch/InterviewSvg.vue";
// import SachaCartoonArmsCrossed from "../SachaCartoonArmsCrossed.vue";
import { 
  PhXCircle,
  // PhBank, 
  PhTreeStructure, 
  PhEyeglasses, 
  PhTable,
  PhArrowsHorizontal,
  PhBinoculars,
  PhTarget
 } from "@phosphor-icons/vue";

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

const projects = [
  // { title: 'Portfolio', description: "The site you're viewing is built with a microfrontend architecture, which enables it to load each application in the list as a separate module.", component: SachaCartoonArmsCrossed, tech: ["Microfrontend", "Vue", "SCSS", "custom packages", "Vite"], btnLabel:"Learn more" },
  {
    title: 'Job Search',
    description: "A very basic game that can use a mobile phone as a controller based on the phones movement (also keyboard/swipe compatible). Loosly based on Snake. Get to the targets and avoid the trees which block you. For the best experience move around by tilting the phone.",
    component: InterviewSvg,
    tech: ["Vue", "SCSS", "Node.js", "Websockets", "devicemotion api", "Vite"],
    onClick: () => {
      router.push('/jobsearch');
    }
  },
  {
    title: "Web PD",
    description: "Camera-driven SDK embedded in client sites for capturing Pupillary Distance in real time.",
    component: PhArrowsHorizontal,
    iconColor,
    tech: ["Vue", "SCSS", "Canvas", "Camera", "Image Optimisation", "device sensors", "indexdb"],
    onClick: () => {
      window.open("https://web.glasseson.com/demo/pd/", "_blank");
    }
  },
  // { title: 'Target Shooter', description: "A basic game using hand detection to allow the user to shape their fingers like a gun and shoot targets on the screen and reload", component: TargetShooterSvg, tech: ["MediaPipe", "TensorFlow.js", "React", "TypeScript", "Canvas Api", "SCSS", "Vite"] },
  // { title: 'Finance Tracker', description: "A very simple app in which you can upload credit card and bank statements and analyze your spending habits", component: PhBank, iconColor, tech: ["React", "TypeScript", "SCSS", "Vite"] },
  {
    title: "Flow Editor",
    description: "A drag-and-drop visual editor that enables non-developers to define and configure clinical product flows using schema-driven tools.",
    component: PhTreeStructure,
    iconColor,
    tech: ["Vue", "JSON Schema", "Drag and Drop", "Svg", "Vue-cli/Webpack", "SCSS"]
  },
  {
    title: "LunaRx",
    description: "A JSON-configured state machine runner powering core clinical flows realted to vision care and UI from JSON rendered",
    component: PhEyeglasses,
    tech: ["Real Time", "Tensorflow Js", "Yolo", "Facemesh", "Pose", "Camera", "Microphone", "Speech to text", "JSON driven ui builder", "State Machine", "Vue-cli/Webpack", "SCSS", "device sensors", "cache api", "web worker"]
  },
  {
    title: "AdminUi",
    description: "An internal platform that houses all tools for QA, product, and clinical teams, including session inspection and flow debugging.",
    component: PhTable,
    iconColor,
    tech: ["Microfrontends", "Webpack", "Module Federation", "Vue", "SCSS", "Vue-cli/Webpack", "OAuth", "Fast Api", "Node js"]
  },
  {
    title: "Session Explorer",
    description: "An internal tool designed to efficiently handle and visualize large volumes of session data. It dynamically adapts its display based on session data type, with each type offering a tailored configuration that presents relevant metrics and insights. The tool aggregates and surfaces data from multiple applications across the organization, providing a unified interface for exploring, analyzing, and debugging diverse session flows.",
    component: PhBinoculars,
    iconColor,
    tech: ["Microfrontends", "Webpack", "Module Federation", "Vue", "SCSS", ""]
  },
  {
    title: "Web Companion",
    description: "Synchronized web/mobile SDK for aligning prescription detection flows with phone-camera input and screen visuals.",
    component: PhTarget,
    iconColor,
    tech: ["Vue", "SCSS", "SVGs", "Websockets"],
    onClick: () => {
      window.open("https://web.glasseson.com/qr/", "_blank");
    }
  },
];

// Group projects into rows of 2
const projectRows = computed(() => {
  const rows = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }
  return rows;
});

// Function to get color for a project, cycling through the colors array
const getProjectColor = (projectIndex) => {
  return colors[projectIndex % colors.length];
};

// Intersection Observer for fade-in animation
const isVisible = ref(new Array(projects.length).fill(false));
const projectRefs = ref([]);
let observer = null;

const setProjectRef = (el, index) => {
  if (el && el.tagName) {
    projectRefs.value[index] = el;
  }
};

const router = useRouter();

const openOverlayIndex = ref(null);

function closeOverlay() {
  openOverlayIndex.value = null;
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = projectRefs.value.indexOf(entry.target);
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

const result = Bowser.parse(window.navigator.userAgent);
const isMobile = result.platform.type === "mobile";
</script>

<style scoped lang="scss">
// @use "@sacha/theme/src/styles/_media" as *;
.projects-section {
  display: flex;
  flex-direction: column;
  gap: $space-m;

  .prompt {
    color: $c-font-light;
    font-family: var(--font-family-heading);
    font-size: $font-m;
  }


  .project-row {
    display: grid;
    grid-template-columns: 60% 40%;
    gap: $space-m;
    border-radius: 16px;

    &.row-reverse {
      grid-template-columns: 40% 60%;
    }

    @include respond-to(md) {
      grid-template-columns: 1fr !important;
    }
  }

  .project-card {
    border-radius: 12px;
    padding: $space-m;
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
      // height: 100dvh;
      // width: 100dvw;
      // position: fixed;
      // top: 0;
      // left: 0;

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
    margin-bottom: $space-s;
  }

  .project-content {
    transition: opacity 0.3s ease;

    .project-title {
      color: $c-font-light;
      font-size: $font-l;
      font-weight: bold;
      margin-bottom: $space-xs;
    }

    .project-description {
      font-size: $font-s;
      line-height: 1.4;
    }
  }

  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $c-bg-dark-overlay-2;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    border-radius: 12px;
    overflow-y: scroll;

    .overlay-content {
      text-align: center;
      color: white;
      padding: $space-m;

      .overlay-title {
        font-size: $font-l;
        font-weight: bold;
        margin-bottom: $space-s;
        color: white;
      }

      .overlay-description {
        line-height: 1.4;
        margin-bottom: $space-m;
        color: rgba(255, 255, 255, 0.9);
        text-align: left;
      }

      .overlay-button {
        background: $c-bg-light;
        color: white;
        border: none;
        padding: $space-s $space-m;
        border-radius: $radius-l;
        font-size: $font-s;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
        outline: none;

        &:active {
          background: $c-bg-dark;
        }
      }

      .tech-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: $space-s;
        justify-content: center;
        margin-bottom: $space-xl;
        font-size: $font-s;
        color: $c-font-dark;
        font-weight: bold;

        .tech {
          background-color: $c-highlight;
          border-radius: $radius-l;
          padding: $space-xxs $space-xs;
        }
      }
    }
  }
}

.show-more-btn {
  margin-top: $space-s;
  background: $c-bg-light;
  color: white;
  border: none;
  padding: $space-s $space-m;
  border-radius: $radius-l;
  font-size: $font-s;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  outline: none;
  &:active {
    background: $c-bg-dark;
  }
}

.fullscreen-project-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3000;
  background: $c-bg-dark-overlay-2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
  .overlay-content {
    position: relative;
    text-align: center;
    color: white;
    padding: $space-m;
    max-width: 600px;
    width: 90vw;
    background: rgba(0,0,0,0.7);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    .close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 10;
      padding: 0;
    }
    .overlay-title {
      font-size: $font-l;
      font-weight: bold;
      margin-bottom: $space-s;
      color: white;
    }
    .overlay-description {
      line-height: 1.4;
      margin-bottom: $space-m;
      color: rgba(255, 255, 255, 0.9);
      text-align: left;
    }
    .overlay-button {
      background: $c-bg-light;
      color: white;
      border: none;
      padding: $space-s $space-m;
      border-radius: $radius-l;
      font-size: $font-s;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
      outline: none;
      &:active {
        background: $c-bg-dark;
      }
    }
    .tech-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: $space-s;
      justify-content: center;
      margin-bottom: $space-xl;
      font-size: $font-s;
      color: $c-font-dark;
      font-weight: bold;
      .tech {
        background-color: $c-highlight;
        border-radius: $radius-l;
        padding: $space-xxs $space-xs;
      }
    }
  }
}
</style>
