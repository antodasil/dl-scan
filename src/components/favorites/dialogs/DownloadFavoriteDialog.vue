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
        <v-text-field type="number" v-model="firstChapter">
          <template #label>{{ $t("view.download.input-chapter.start") }}</template>
        </v-text-field>
      </div>
      <div class="form-row">
        <v-text-field type="number" v-model="lastChapter">
          <template #label>{{ $t("view.download.input-chapter.end") }}</template>
        </v-text-field>
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
import DialogButton from "@/components/global/DialogButton.vue";
import { IChaptersInfos } from "@/services/download.service";

@Options({
  components: {
    DialogButton,
  },
})
export default class DownloadFavoriteDialog extends Vue {
  @Prop(String)
  name = "";

  firstChapter = "1";
  lastChapter = "1";

  resetChapters(): void {
    this.firstChapter = "1";
    this.lastChapter = "1";
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
