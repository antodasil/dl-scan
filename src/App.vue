<template>
  <v-app :theme="themeApp">
    <v-navigation-drawer permanent expand-on-hover app>
      <v-list>
        <v-list-item>
          <router-link to="/">{{ $t("application.menu.download") }}</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/favorites">{{ $t("application.menu.favorites") }}</router-link>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="settings-row">
          <label for="select-lang">{{ $t("application.language") + " : " }}</label>
          <select v-model="language" @change="changeLanguage()" id="select-lang">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
        <div class="settings-row">
          <label for="select-theme">{{ $t("application.theme.theme") + " : " }}</label>
          <select v-model="themeSelected" id="select-theme">
            <option value="system">{{ $t("application.theme.system") }}</option>
            <option value="light">{{ $t("application.theme.light") }}</option>
            <option value="dark">{{ $t("application.theme.dark") }}</option>
          </select>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Watch } from "vue-property-decorator";

export default class App extends Vue {
  themeSystem = "light";
  themeSelected = "system";
  themeApp = "light";
  language = "fr";

  // #region Methods
  setThemeSystem(e: MediaQueryList | MediaQueryListEvent): void {
    if (e.matches) {
      this.themeSystem = "dark";
    } else {
      this.themeSystem = "light";
    }
  }

  initThemeSystem(): void {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    this.setThemeSystem(darkThemeMq);

    const updateThemeSystem = this.setThemeSystem.bind(this);
    darkThemeMq.addEventListener("change", (e) => {
      updateThemeSystem(e);
    });
  }

  changeLanguage(): void {
    this.$i18n.locale = this.language;
  }
  // #endregion

  // #region Life cycle
  created(): void {
    this.initThemeSystem();
  }

  // #endregion

  // #region Watchers

  @Watch("themeSelected")
  themeWatcher(): void {
    if (this.themeSelected === "system") {
      this.themeApp = this.themeSystem;
      return;
    }

    this.themeApp = this.themeSelected;
  }

  @Watch("themeSystem")
  themeSystemWatcher(): void {
    if (this.themeSelected === "system") {
      this.themeApp = this.themeSystem;
    }
  }
  // #endregion
}
</script>

<style lang="scss">
.v-navigation-drawer {
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

.v-main {
  margin: 10px;
}
.settings-row {
  label {
    display: inline-block;
    width: 85px;
  }
  select {
    border-bottom: solid 2px #fff;
    color: #fff;
    width: 110px;

    &#select-lang,
    &#select-theme {
      width: 100px;
      margin: 0 10px;
      padding: 0 5px;
    }

    option {
      color: #000;
    }
  }
}
</style>
