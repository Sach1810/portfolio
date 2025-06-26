<template>
  <nav :class="[props.expanded ? 'active' : '']">
    <div class="nav-content">
      <div class="logo-area">
        <SachaSvg :animateWink="true" color="#227c9d" class="logo" />
        <span>S.A.D</span>
      </div>

      <div class="links">
        <router-link
          v-for="(record, index) in navRecords"
          :key="`navRecord${index}`"
          :to="record.to"
          @click="emit('toggle')"
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
        @clicked="emit('toggle')"
        :color="iconColor"
      />
    </div>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import HamburgerToClose from "@/components/icons/HamburgerToClose.vue";
import NavRecord from "./NavRecord.vue";
import { PhHouseLine, PhInfo, PhReadCvLogo } from "@phosphor-icons/vue";
import SachaSvg from "@/components/svgs/SachaSvg.vue";

const props = defineProps({ expanded: Boolean });
const emit = defineEmits(["toggle"]);

const rootStyles = getComputedStyle(document.documentElement);
const iconColor = rootStyles.getPropertyValue("--c-font-light").trim();
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
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 60px;
  z-index: 999;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &.active {
    width: 300px;
  }

  .nav-content {
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    background: $c-bg-dark;
  }
  &.active .nav-content {
    opacity: 1;
    pointer-events: auto;
  }

  .logo-area {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $space-m;
    margin-left: -100px;

    .logo {
      $logo-size: $font-headline;
      width: $logo-size;
      height: $logo-size;
    }

    span {
      font-size: $font-xl;
      color: $c-font-light;
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
      padding: 0 $space-m;
      text-align: center;
      text-decoration: none;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
      &:active {
        opacity: 0.9;
        transform: scale(1.02);
      }

      &:hover {
        border-radius: 5px;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.15),
          rgba(255, 255, 255, 0)
        );
      }
    }
  }

  .selector-container {
    flex: 0 0 60px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    z-index: 1000;
    position: absolute;
    top: 0;
    right: 0;
    pointer-events: auto;
  }
}
</style>
