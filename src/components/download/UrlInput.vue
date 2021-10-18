<template>
  <v-tooltip bottom>
    <template #activator>
      <v-text-field placeholder="https://www.dragon-ball.com/chapter-${chapter}/${page}" v-model="value">
        <template #label>
          {{ $t("view.download.input-url") }}
          <!-- <v-icon v-on="on" v-bind="attrs"> mdi-information-outline </v-icon> -->
        </template>
      </v-text-field>
    </template>
    <template #default>
      <span>{{ $t("view.download.url-tooltip") }}</span>
    </template>
  </v-tooltip>
</template>

<script lang="ts">
import { Options, Vue, Model } from "vue-property-decorator";

@Options({})
export default class UrlInput extends Vue {
  @Model("modelValue")
  readonly value!: number;
}
</script>
