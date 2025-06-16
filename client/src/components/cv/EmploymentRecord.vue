<template>
  <div class="employment-record">
    <!-- <div class="timeline"> -->
    <div class="top-line"><div class="line"></div></div>
    <div class="content">
      <h2>Fullstack Engineer</h2>
      <div>Jan 2025 - Present</div>
      <div>
        About my role in this company should be written here concisly and with
        lits of information that fits the section
      </div>
    </div>
    <div class="circle-bottom-line">
      <div class="line short"></div>
      <div class="circle"></div>
      <div class="line"></div>
      cv
    </div>
    <!-- <div class="circle"></div>
    <div class="title">Job Title</div> -->

    <!-- </div> -->
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.employment-record {
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-template-rows: 30px 1fr;
  grid-template-areas:
    "top-line ."
    "circle-bottom-line content";
  // gap: 20px;
  border: 1px solid red;
  width: 350px;

  > * {
    border: 1px dotted grey;
  }

  .top-line {
    grid-area: top-line;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // align-self: center;
  }

  .circle-bottom-line {
    grid-area: circle-bottom-line;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // align-self: center;
  }

  .line {
    width: 2px;
    background-color: black;
    height: 100%;
    &.short {
      height: 15px;
    }
    // align-self: center;
  }
  .circle {
    grid-area: circle;
    // align-self: center;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid black;
    // position: relative;
    // top: -5px; /* Adjust to center the circle on the line */
  }
  .title {
    grid-area: title;
  }
  .content {
    grid-area: content;
    padding: 5px;
  }
}
</style>
