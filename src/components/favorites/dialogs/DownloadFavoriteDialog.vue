<template>
  <dialog-button
    :title="$t('application.menu.download') + ' ' + name"
    :buttonProps="{ color: 'primary' }"
    @hide-dialog="resetChapters()"
  >
    <template #button>
      <v-icon>mdi-download</v-icon>
    </template>

    <template #default>
      <chapters v-model="chapters"></chapters>
    </template>

    <template #actions="{ hide }">
      <v-btn color="primary" @click="downloadFav(hide)"> {{ $t("view.download.btn-download") }} </v-btn>
    </template>
  </dialog-button>
</template>

<script lang="ts">
import { Vue, Options, Emit, Prop } from "vue-property-decorator";
import DialogButton from "@/components/global/DialogButton.vue";
import { IChaptersInfos } from "@/services/download.service";
import Chapters from "@/components/download/Chapters.vue";

@Options({
  components: {
    DialogButton,
    Chapters,
  },
})
export default class DownloadFavoriteDialog extends Vue {
  @Prop(String)
  name = "";

  chapters = {
    firstChapter: 1,
    lastChapter: 1,
  };

  resetChapters(): void {
    this.chapters.firstChapter = 1;
    this.chapters.lastChapter = 1;
  }

  @Emit()
  downloadFav(hide: () => void): IChaptersInfos {
    hide();
    return {
      firstChapter: this.chapters.firstChapter.toString(),
      lastChapter: this.chapters.lastChapter.toString(),
    };
  }
}
</script>
