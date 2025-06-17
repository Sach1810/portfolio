<template>
  <div v-for="(record, index) in EductationRecords" :key="index">
    <div style="font-weight: bold">
      {{ record.degree }}
      {{ record.institution }} ({{ record.startDate }} = {{ record.endDate }})
    </div>
    <div>{{ record.description }}</div>
  </div>
</template>

<script setup>
import EductationRecords from "./EducationRecords.json";
</script>

<style lang="scss" scoped></style>
