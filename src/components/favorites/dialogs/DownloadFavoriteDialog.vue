<template>
  <dialog-button
    :title="$t('application.menu.download') + ' ' + name"
    :btnColor="'primary'"
    @hide-dialog="resetChapters()"
  >
    <template #button>
      <v-icon>mdi-download</v-icon>
    </template>

    <template #default>
      <div class="form-row">
        <label for="input-chapter-start">{{ $t("view.download.input-chapter.start") }} </label>
        <input type="number" class="v-text-field" id="input-chapter-start" v-model="firstChapter" />
      </div>
      <div class="form-row">
        <label for="input-chapter-end">{{ $t("view.download.input-chapter.end") }} </label>
        <input type="number" class="v-text-field" id="input-chapter-end" v-model="lastChapter" />
      </div>
    </template>

    <template #actions="{ hide }">
      <v-btn
        color="primary"
        @click="
          downloadFav();
          hide();
        "
        >{{ $t("view.download.btn-download") }}</v-btn
      >
    </template>
  </dialog-button>
</template>

<script lang="ts">
import { Vue, Options, Emit, Watch, Prop } from "vue-property-decorator";
import DialogButton from "@/components/application/DialogButton.vue";
import { IChaptersInfos } from "@/services/download.service";

@Options({
  components: {
    DialogButton,
  },
})
export default class DownloadFavoriteDialog extends Vue {
  @Prop(String)
  name = "";

  firstChapter = 1;
  lastChapter = 1;

  resetChapters(): void {
    this.firstChapter = 1;
    this.lastChapter = 1;
  }

  @Emit()
  downloadFav(): IChaptersInfos {
    return {
      firstChapter: this.firstChapter,
      lastChapter: this.lastChapter,
    };
  }

  @Watch("firstChapter")
  firstChapterWatch(): void {
    if (this.lastChapter < this.firstChapter) {
      this.lastChapter = this.firstChapter;
    }
  }

  @Watch("lastChapter")
  lastChapterWatch(): void {
    if (this.lastChapter < this.firstChapter) {
      this.firstChapter = this.lastChapter;
    }
  }
}
</script>

<style lang="scss" scoped>
.form-row {
  display: flex;

  label {
    display: inline-block;
    width: 130px;
    margin-left: 5px;
    line-height: 40px;
  }

  input {
    display: inline-block;
    color: #ffffff;
    border-bottom: solid 2px #ffffff;
    margin: 5px;
    padding: 2px 5px;
    flex: 1 0 auto;
  }
}
</style>
