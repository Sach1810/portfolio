<template>
  <div
    v-for="(record, index) in EmploymentRecords"
    :key="index"
    class="employment-record"
  >
    <div class="top-line"><div class="line"></div></div>
    <div class="content">
      <h2>
        {{ record?.company
        }}<span class="dates">
          ({{ record.startDate }} - {{ record.endDate }})</span
        >
      </h2>
      <h3>{{ record.title }}</h3>
      <div>{{ record.description }}</div>
    </div>
    <div class="circle-bottom-line">
      <div class="line short"></div>
      <div class="circle"></div>
      <div class="line"></div>
    </div>
  </div>
</template>
<script setup>
import EmploymentRecords from "./EmploymentRecords.json";
</script>

<style lang="scss" scoped>
.employment-record {
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-template-rows: 3px 1fr;
  grid-template-areas:
    "top-line ."
    "circle-bottom-line content";
  width: 100%;

  .top-line {
    grid-area: top-line;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .circle-bottom-line {
    grid-area: circle-bottom-line;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .line {
    width: 1px;
    background-color: grey;
    height: 100%;
    &.short {
      height: 15px;
    }
  }
  .circle {
    grid-area: circle;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid grey;
    background: #fff;
    z-index: 1;
  }
  .content {
    grid-area: content;

    .dates {
      font-size: 14px;
    }
  }
}
</style>
