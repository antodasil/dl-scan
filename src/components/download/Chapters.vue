<template>
  <div class="chapters">
    <chapter-input v-model="value.firstChapter" :label="$t('view.download.input-chapter.start')"></chapter-input>
    <chapter-input v-model="value.lastChapter" :label="$t('view.download.input-chapter.end')"></chapter-input>
  </div>
</template>

<script lang="ts">
import { IChaptersInfos } from "@/services/download.service";
import { Model, Options, Vue, Watch } from "vue-property-decorator";
import ChapterInput from "./chapters/ChapterInput.vue";

@Options({
  components: {
    ChapterInput,
  },
})
export default class Chapters extends Vue {
  @Model("modelValue")
  readonly value!: IChaptersInfos;

  @Watch("value.firstChapter")
  firstChapterWatch(): void {
    if (this.value.lastChapter < this.value.firstChapter) {
      this.$emit("update:modelValue", {
        firstChapter: this.value.firstChapter,
        lastChapter: this.value.firstChapter,
      });
    }
  }

  @Watch("value.lastChapter")
  lastChapterWatch(): void {
    if (this.value.lastChapter < this.value.firstChapter) {
      this.$emit("update:modelValue", {
        firstChapter: this.value.lastChapter,
        lastChapter: this.value.lastChapter,
      });
    }
  }
}
</script>

<style scoped lang="scss">
.chapters {
  display: flex;
  .v-text-field + .v-text-field {
    padding-left: 10px;
  }
}
</style>
