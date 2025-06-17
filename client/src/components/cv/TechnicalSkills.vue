<template>
  <div class="technicall-skills">
    <span v-for="(skill, index) in skills" :key="skill" class="skill">
      {{ skill }}<span v-if="index < skills.length - 1"></span>
    </span>
  </div>
</template>

<script setup>
const skills = [
  "Javascript",
  "Typescript",
  "Python",
  "Node",
  "PHP",
  "Vue",
  "React",
  "HTML",
  "CSS",
  "MongoDB",
  "MySQL",
  "Microfrontends",
  "Microservices",
  "Websockets",
  "Web Technologies",
  "Docker",
  "Redis",
];
</script>

<style lang="scss" scoped>
.technicall-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 3px 10px;

  .skill {
    &:after {
      content: "|";
      margin-left: 5px;
    }
    &:last-child:after {
      content: "";
      margin-left: 0;
    }
  }
}
</style>
