<template>
  <div ref="pdfContent" class="pdf-a4">
    <div class="content">
      <div class="side left">
        <MeArea />
        <ContentSection iconName="PhPaperPlaneTilt">
          <template #title>
            <span>ABOUT & CONTACT</span>
          </template>
          <template #content>
            <PersonalInfo />
          </template>
        </ContentSection>
        <ContentSection iconName="PhPerson">
          <template #title>
            <span>PERSONAL SKILLS</span>
          </template>
          <template #content>
            <PersonalSkills />
          </template>
        </ContentSection>
        <ContentSection iconName="PhDevices">
          <template #title>
            <span>TECHNICAL SKILLS</span>
          </template>
          <template #content>
            <TechnicalSkills />
          </template>
        </ContentSection>
        <ContentSection iconName="PhStudent">
          <template #title>
            <span>Education</span>
          </template>
          <template #content>
            <EducationRecords />
          </template>
        </ContentSection>
      </div>
      <div class="divider"><div class="vertical-line"></div></div>
      <div class="side right">
        <ContentSection iconName="PhChartPieSlice">
          <template #title>
            <span>OVERVIEW</span>
          </template>
          <template #content>
            Full Stack Engineer with over 9 years of experience delivering
            scalable, high-performance web applications and internal tools.
            Strong background in both frontend and backend development, with
            expertise in modern JavaScript frameworks, RESTful APIs, and
            cloud-based solutions. Proven ability to lead full project
            cycles—from planning and architecture to deployment and
            optimization. Worked across fast-paced startups and growth-stage
            companies, driving efficiency and improving user experience through
            clean, maintainable code and thoughtful design. Passionate about
            solving real-world problems with practical, reliable tech solution
          </template>
        </ContentSection>
        <ContentSection iconName="PhBriefcase">
          <template #title>
            <span>Experience</span>
          </template>
          <template #content>
            <EmploymentRecords />
          </template>
        </ContentSection>
        <ContentSection iconName="PhUserList">
          <template #title>
            <span>References</span>
          </template>
          <template #content> Available upon request. </template>
        </ContentSection>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import sadIcon from "../../assets/SADIcon.png";

import MeArea from "./MeArea.vue";
import ContentSection from "./ContentSection.vue";
import PersonalInfo from "./PersonalInfo.vue";
import PersonalSkills from "./PersonalSkills.vue";
import TechnicalSkills from "./TechnicalSkills.vue";
import EducationRecords from "./EducationRecords.vue";
import EmploymentRecords from "./EmploymentRecords.vue";

const emit = defineEmits(["pdfContent"]);
const pdfContent = ref(null);
const iconSize = 50;
onMounted(() => {
  emit("pdfContent", pdfContent.value);
});
</script>

<style lang="scss" scoped>
$baseFontSize: 14px;
$pagePadding: 20px;

.pdf-a4 {
  max-width: 794px; /* A4 width at 96 DPI */
  background: white;
  color: black;
  box-sizing: border-box;
  font-family: "Kodchasan";
  font-size: $baseFontSize;

  @media print {
    width: 794px; /* A4 width at 96 DPI */
    height: 1123px; /* A4 height at 96 DPI */
  }

  .content {
    height: 100%;
    width: 100%;
    padding: $pagePadding;
    display: grid;
    grid-template-columns: 0.6fr 20px 1fr;
    grid-column-gap: 5px;

    @include media.respond-to(md) {
      grid-template-columns: 1fr;
    }

    @media print {
      grid-template-columns: 0.6fr 20px 1fr;
    }
    .side {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .divider {
      height: 100%;
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
