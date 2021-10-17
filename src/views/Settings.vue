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
        <select v-model="theme" @change="changeTheme()" id="select-theme">
          <option value="system">{{ $t("application.theme.system") }}</option>
          <option value="light">{{ $t("application.theme.light") }}</option>
          <option value="dark">{{ $t("application.theme.dark") }}</option>
        </select>
      </div>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { ISettings, loadSettings, ILanguage, ISelectTheme } from "@/services/settings.service";
import appModule from "@/store/AppModule";

export default class Settings extends Vue {
  theme: ISelectTheme = "system";
  language: ILanguage = "fr";

  changeTheme(): void {
    appModule.setSelectedTheme(this.theme);
  }

  changeLanguage(): void {
    appModule.setLanguage(this.language);
  }
  // #endregion

  // #region Life cycle
  async created(): Promise<void> {
    let settings: ISettings = await loadSettings();
    this.theme = settings.theme;
    this.language = settings.language;
  }
  // #endregion
}
</script>

<style lang="scss">
.v-theme--dark {
  select {
    border-bottom: solid 2px #fff;
    color: #fff;
  }
}

.v-theme--light {
  select {
    border-bottom: solid 2px #000;
    color: #000;
  }
}

.v-card {
  padding: 10px;

  .settings-row {
    label {
      display: inline-block;
      width: 100px;
    }
    select {
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
