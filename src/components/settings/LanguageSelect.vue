<template>
  <label for="select-lang">{{ $t("application.language") + " : " }}</label>
  <select v-model="language" id="select-lang">
    <option v-for="lang in supportedLang" :key="lang.code" :value="lang.code">
      {{ lang.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { Vue, Watch } from "vue-property-decorator";
import { ISettings, loadSettings, ILanguage } from "@/services/settings.service";
import appModule from "@/store/AppModule";

export default class Settings extends Vue {
  language: ILanguage = "fr";
  supportedLang = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
  ];

  @Watch("language")
  changeLanguage(): void {
    appModule.setLanguage(this.language);
  }
  // #endregion

  // #region Life cycle
  async created(): Promise<void> {
    let settings: ISettings = await loadSettings();
    this.language = settings.language;
  }
  // #endregion
}
</script>
