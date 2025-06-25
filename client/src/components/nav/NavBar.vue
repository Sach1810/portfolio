<template>
  <nav>
    <HamburgerToClose />
    <router-link
      v-for="(record, index) in navRecords"
      :key="`navRecord${index}`"
      :to="record.to"
    >
      <NavRecord :icon="record.icon" :label="record.label" :color="iconColor" />
    </router-link>
  </nav>
</template>

<script setup>
import HamburgerToClose from "@/components/icons/HamburgerToClose.vue";
import NavRecord from "./NavRecord.vue";
import { PhHouseLine, PhInfo, PhReadCvLogo } from "@phosphor-icons/vue";
const rootStyles = getComputedStyle(document.documentElement);
const iconColor = rootStyles.getPropertyValue("--c-icon-primary").trim();
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
  display: flex;
  // flex-direction: column;
  gap: 20px;
  padding: 10px;

  a {
    text-align: center;
    text-decoration: none;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:active {
      opacity: 0.9;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
