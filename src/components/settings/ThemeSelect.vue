<template>
  <label for="select-theme">{{ $t("application.theme.theme") + " : " }}</label>
  <select v-model="theme" id="select-theme">
    <option v-for="suppTheme in supportedThemes" :key="suppTheme.code" :value="suppTheme.code">
      {{ $t(suppTheme.name) }}
    </option>
  </select>
</template>

<script lang="ts">
import { Vue, Watch } from "vue-property-decorator";
import { ISettings, loadSettings, ISelectTheme } from "@/services/settings.service";
import appModule from "@/store/AppModule";

export default class ThemeSelect extends Vue {
  theme: ISelectTheme = "system";
  supportedThemes = [
    { code: "system", name: "application.theme.system" },
    { code: "light", name: "application.theme.light" },
    { code: "dark", name: "application.theme.dark" },
  ];

  //#region watchers
  @Watch("theme")
  changeTheme(): void {
    appModule.setSelectedTheme(this.theme);
  }
  // #endregion

  // #region Life cycle
  async created(): Promise<void> {
    let settings: ISettings = await loadSettings();
    this.theme = settings.theme;
  }
  // #endregion
}
</script>

<style lang="scss"></style>
