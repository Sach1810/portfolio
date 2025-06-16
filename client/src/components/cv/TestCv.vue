<template>
  <div ref="pdfContent" class="pdf-a4">
    <div class="content">
      <div class="side left">
        <MeArea />
        <ContentSection>
          <template #icon
            ><PhPaperPlaneTilt :size="30" color="#fff"
          /></template>
          <template #title>
            <span style="font-size: 4.5mm; white-space: nowrap"
              >ABOUT & CONTACT</span
            >
          </template>
          <template #content>
            <div class="personal-info">
              <span>Mobile:</span>
              <span>0545776682</span>
              <span>Email:</span>
              <span>sach1810@gmail.com</span>
              <span>Address:</span>
              <span>Uzi Hitman, Netanya</span>
              <span>Languages:</span>
              <span
                ><strong>English</strong> (native),
                <strong>Hebrew</strong> (basic understanding)</span
              >
            </div>
          </template>
        </ContentSection>
        <ContentSection>
          <template #icon><PhChartPieSlice :size="30" color="#fff" /></template>
          <template #title>
            <span style="font-size: 4.5mm; white-space: nowrap"
              >PERSONAL SKILLS</span
            >
          </template>
          <template #content>
            <div>
              Analytical
              <br />
              Problem-Solving <br />
              Teamwork <br />
              Communication <br />
              Initiative <br />
              Independence <br />
              Adaptability <br />
              Learning Agility <br />
              Time Management <br />
              Prioritization
            </div>
          </template>
        </ContentSection>
      </div>
      <div class="divider"><div class="vertical-line"></div></div>
      <div class="side right">
        <ContentSection>
          <template #icon><PhPerson :size="30" color="#fff" /></template>
          <template #title>
            <span style="font-size: 4.5mm; white-space: nowrap">OVERVIEW</span>
          </template>
          <template #content>
            9 years+ of experience building scalable web applications and
            streamlining internal systems and infrastructure for business
            efficiency. Playing a pivotal role in helping to go from a small
            startup to being part of a giant corporation.
          </template>
        </ContentSection>
        <ContentSection>
          <template #icon><PhPerson :size="30" color="#fff" /></template>
          <template #title>
            <span style="font-size: 4.5mm; white-space: nowrap"
              >EXPERIENCE</span
            >
          </template>
          <template #content>
            <EmploymentRecord />
          </template>
        </ContentSection>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import sadIcon from "../../assets/SADIcon.png";
import {
  PhPaperPlaneTilt,
  PhChartPieSlice,
  PhPerson,
  PhDevices,
} from "@phosphor-icons/vue";

import MeArea from "./MeArea.vue";
import ContentSection from "./ContentSection.vue";
import EmploymentRecord from "./EmploymentRecord.vue";

const emit = defineEmits(["pdfContent"]);
const pdfContent = ref(null);
onMounted(() => {
  emit("pdfContent", pdfContent.value);
});
</script>

<style lang="scss" scoped>
.pdf-a4 {
  width: 794px; /* A4 width at 96 DPI */
  height: 1123px; /* A4 height at 96 DPI */
  background: white;
  color: black;
  box-sizing: border-box;
  font-family: "Kodchasan";
  font-size: 16px;
  border: 1px solid #000;
  .content {
    height: 100%;
    width: 100%;
    padding: 40px;
    display: grid;
    grid-template-columns: 35% 20px 65%;

    .side {
      &.left {
        .personal-info {
          display: grid;
          grid-template-columns: max-content 1fr;
          gap: 0 10px;
        }
      }
    }

    .divider {
      height: 100%;
      width: 100%;
      padding: 0 4mm;
      justify-self: center;

      .vertical-line {
        width: 2px;
        height: 100%;
        background: #000;
        transform: translateX(50%);
      }
    }
  }
}

@media print {
  .pdf-a4 {
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 40px;
  }
}
</style>
