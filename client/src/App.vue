<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/cv">CV</router-link>
  </nav>
  <router-view class="main-content"></router-view>
</template>
<style lang="scss" scoped>
nav {
  display: flex;
  padding: 1rem;

  a {
    color: var(--c1);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background 0.3s;

    &:hover {
      background: var(--hc1);
    }
  }
}

.main-content {
  padding: 5dvh 5dvw;
  background: var(--c2);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @include media.respond-to(md) {
    grid-template-columns: 1fr;
  }
}
</style>
