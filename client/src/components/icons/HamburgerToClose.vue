<template>
  <div class="menu cross menu--2">
    <label :style="{ height: props.size, width: props.size }">
      <input :checked="props.isOpen" type="checkbox" @input="emit('clicked')" />
      <svg viewBox="25 25 50 50" xmlns="http://www.w3.org/2000/svg">
        <path
          :style="transitionDurationStyle"
          class="line--1"
          d="M0 70l28-28c2-2 2-2 7-2h64"
          :stroke="props.color"
        />
        <path
          :stroke="props.color"
          :style="transitionDurationStyle"
          class="line--2"
          d="M0 50h99"
        />
        <path
          :stroke="props.color"
          :style="transitionDurationStyle"
          class="line--3"
          d="M0 30l28 28c2 2 2 2 7 2h64"
        />
      </svg>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  size: { type: String, default: "40px" },
  isOpen: { type: Boolean, default: false },
  transitionDuration: { type: String, default: "0.7s" },
  color: { type: String, default: "#000" },
});
const emit = defineEmits(["clicked"]);

const transitionDurationStyle = {
  transitionDuration: props.transitionDuration,
};
</script>

<style lang="scss" scoped>
.menu {
  position: relative;
  input {
    display: none;

    &:checked + svg {
      .line--1,
      .line--3 {
        --length: 22.627416998;
      }
      .line--2 {
        --length: 0;
      }
    }
  }

  .line--1,
  .line--3 {
    --total-length: 111.22813415527344;
    --offset: -50.22813415527344;
  }
  .line--2 {
    --total-length: 99;
  }
  input:checked + svg {
    path {
      transform: translateX(30px);
    }
    .line--1,
    .line--3 {
      --offset: -16.9705627485;
    }
    .line--2 {
      --offset: -20;
    }
  }

  label {
    display: block;
    cursor: pointer;
  }

  svg {
    path {
      fill: none;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      --length: 24;
      --offset: -38;
      stroke-dasharray: var(--length) var(--total-length);
      stroke-dashoffset: var(--offset);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
</style>
