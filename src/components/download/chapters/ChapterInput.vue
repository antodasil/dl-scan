<template>
  <v-text-field type="number" v-model.number="value">
    <template #label> {{ label }} </template>
  </v-text-field>
</template>

<script lang="ts">
import { Options, Vue, Model, Prop } from "vue-property-decorator";

@Options({})
export default class ChapterInput extends Vue {
  @Model("modelValue")
  readonly value!: number;

  @Prop(String)
  readonly label = "Chapitre";
}
</script>
