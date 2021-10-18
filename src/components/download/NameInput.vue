<template>
  <v-text-field placeholder="Dragon ball" v-model="value" :rules="nameRules">
    <template #label> {{ $t("view.download.input-name") }} </template>
  </v-text-field>
</template>

<script lang="ts">
import { Options, Vue, Model } from "vue-property-decorator";

@Options({})
export default class NameInput extends Vue {
  @Model("modelValue")
  readonly value!: number;

  get nameRules(): unknown[] {
    return [(v: unknown) => !!v || "Name not empty"];
  }
}
</script>
