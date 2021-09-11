<template>
  <v-app :theme="theme">
    <v-app-bar app>
      <router-link to="/">{{ $t("application.menu.home") }}</router-link> |
      <router-link to="/about">{{ $t("application.menu.about") }}</router-link>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
export default class App extends Vue {
  theme = "light";

  // #region Methods
  setTheme(e: MediaQueryList | MediaQueryListEvent): void {
    if (e.matches) {
      this.theme = "dark";
    } else {
      this.theme = "light";
    }
  }

  initTheme(): void {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    this.setTheme(darkThemeMq);

    const updateTheme = this.setTheme.bind(this);
    darkThemeMq.addEventListener("change", (e) => {
      updateTheme(e);
    });
  }
  // #endregion

  // #region Life cycle
  created(): void {
    this.initTheme();
  }

  // #endregion
}
</script>

<style lang="scss">
.v-app-bar {
  padding: 0 25px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    margin: 0 5px;

    &.router-link-exact-active {
      color: #1697f6;
    }
  }
}
</style>
