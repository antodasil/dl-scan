<template>
  <v-layout align-center justify-center>
    <v-card>
      <v-card-title> {{ $t("application.menu.settings") }}</v-card-title>
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
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Watch, Prop, Emit } from "vue-property-decorator";
import { ISettings, updateSettings, loadSettings } from "@/services/settings.service";

export default class Settings extends Vue {
  @Prop(String)
  readonly theme = "light";

  themeSystem = "light";
  themeSelected = "system";
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
    updateSettings(this.getSettings());
  }

  getSettings(): ISettings {
    return {
      language: this.language,
      theme: this.themeSelected,
    };
  }
  // #endregion

  // #region Life cycle
  @Emit("change-theme")
  async created(): Promise<void> {
    this.initThemeSystem();
    let settings: ISettings = await loadSettings();
    this.themeSelected = settings.theme;
    this.language = settings.language;
    this.themeSelectedWatcher();
  }
  // #endregion

  // #region Watchers
  @Watch("themeSelected")
  @Emit("change-theme")
  themeSelectedWatcher(): string {
    updateSettings(this.getSettings());
    if (this.themeSelected === "system") {
      return this.themeSystem;
    }

    return this.themeSelected;
  }

  @Watch("themeSystem")
  @Emit("change-theme")
  themeSystemWatcher(): string {
    if (this.themeSelected === "system") {
      return this.themeSystem;
    }
    return this.theme;
  }
  // #endregion
}
</script>

<style lang="scss">
.v-card {
  padding: 10px;
  
.settings-row {
  label {
    display: inline-block;
    width: 100px;
  }
  select {
    border-bottom: solid 2px #fff;
    color: #fff;

    &#select-lang,
    &#select-theme {
      width: 150px;
      margin: 0 10px;
      padding: 0 5px;
    }

    option {
      color: #000;
    }
  }
}
}
</style>
