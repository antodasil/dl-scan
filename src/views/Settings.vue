<template>
  <v-layout align-center justify-center>
    <v-card>
      <v-card-title> {{ $t("application.menu.settings") }}</v-card-title>
      <div class="settings-row">
        <language-select></language-select>
      </div>
      <div class="settings-row">
        <theme-select></theme-select>
      </div>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import ThemeSelect from "@/components/settings/ThemeSelect.vue";
import LanguageSelect from "@/components/settings/LanguageSelect.vue";

@Options({
  components: {
    ThemeSelect,
    LanguageSelect,
  },
})
export default class Settings extends Vue {}
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
      width: 150px;
      margin: 0 10px;
      padding: 0 5px;

      option {
        color: #000;
      }
    }
  }
}
</style>
