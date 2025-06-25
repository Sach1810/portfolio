<template>
  <nav :class="[shouldExpand ? 'active' : '']">
    <div class="nav-content">
      <div class="logo-area">
        <SachaSvg animateWink="true" color="#227c9d" class="logo" />
        <span>S.A.D</span>
      </div>

      <div class="links">
        <router-link
          v-for="(record, index) in navRecords"
          :key="`navRecord${index}`"
          :to="record.to"
        >
          <NavRecord
            :icon="record.icon"
            :label="record.label"
            :color="iconColor"
          />
        </router-link>
      </div>
    </div>
    <div class="selector-container">
      <HamburgerToClose
        class="hamburger"
        @clicked="shouldExpand = !shouldExpand"
        :color="iconColor"
      />
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import HamburgerToClose from "@/components/icons/HamburgerToClose.vue";
import NavRecord from "./NavRecord.vue";
import { PhHouseLine, PhInfo, PhReadCvLogo } from "@phosphor-icons/vue";
import SachaSvg from "@/components/SachaSvg.vue";

const shouldExpand = ref(false);
const rootStyles = getComputedStyle(document.documentElement);
const iconColor = rootStyles.getPropertyValue("--iconColor").trim();
console.log("iconColor", iconColor);
const navRecords = [
  {
    icon: PhHouseLine,
    label: "Home",
    to: "/",
  },
  {
    icon: PhInfo,
    label: "About",
    to: "/about",
  },
  {
    icon: PhReadCvLogo,
    label: "CV",
    to: "/cv",
  },
];
</script>

<style lang="scss" scoped>
nav {
  display: grid;
  grid-template-columns: 0px 40px;
  transition: grid-template-columns 0.5s ease;
  height: 100%;
  z-index: 999;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  &.active {
    grid-template-columns: 300px 20px;
  }

  .nav-content {
    overflow: hidden;
    background: #004a68;
    height: 100%;
    text-align: left;

    .logo-area {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: $space-m;
      margin-left: -60px;

      .logo {
        width: 150px;
        height: 150px;
      }

      span {
        font-size: 50px;
        color: #ffffff;
        font-weight: bold;
        margin-left: -25px;
      }
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: $space-m;
      padding: $space-m;

      a {
        text-align: center;
        text-decoration: none;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
        &:active {
          opacity: 0.9;
          transform: scale(1.02);
        }

        &:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15),
            rgba(255, 255, 255, 0)
          );
        }
      }
    }
  }

  .selector-container {
    pointer-events: none;
    .hamburger {
      pointer-events: auto;
    }
  }
}
</style>
