<template>
  <v-layout align-center justify-center>
    <v-card>
      <v-card-title> {{ $t("application.menu.download") }}</v-card-title>
      <form>
        <name-input v-model="name"></name-input>
        <url-input v-model="url"></url-input>
        <chapters v-model="chapters"></chapters>

        <v-card-actions>
          <v-btn @click="addFavorite()"><v-icon>mdi-star-outline</v-icon></v-btn>
          <v-btn color="primary" @click="download()"> {{ $t("view.download.btn-download") }} </v-btn>
          <v-btn @click="downloadTest()">test</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { dlChapters, downloadAlgorithm } from "@/services/download.service";
import { remote } from "electron";
import { toCamelCase } from "@/utils/string.utils";
import { v4 as uuid } from "uuid";
import { addFavorite } from "@/services/favorites.service";
import Chapters from "@/components/download/Chapters.vue";
import NameInput from "@/components/download/NameInput.vue";
import UrlInput from "@/components/download/UrlInput.vue";

@Options({
  components: {
    NameInput,
    UrlInput,
    Chapters,
  },
})
export default class Download extends Vue {
  name = "";
  url = "";
  chapters = {
    firstChapter: 1,
    lastChapter: 1,
  };

  async download(): Promise<void> {
    let res = await remote.dialog.showOpenDialog({ properties: ["openDirectory"] });
    if (!res.filePaths || !res.filePaths.length) {
      console.log("Aucun dossier selectionné");
      return;
    }

    return dlChapters(
      {
        name: toCamelCase(this.name),
        url: this.url,
        firstChapter: this.chapters.firstChapter.toString(),
        lastChapter: this.chapters.lastChapter.toString(),
      },
      res.filePaths[0]
    );
  }

  addFavorite(): Promise<void> {
    return addFavorite({
      id: uuid(),
      name: this.name,
      url: this.url,
    });
  }

  async downloadTest(): Promise<void> {
    (this.$refs.form as Vue & { validate: () => boolean }).validate();

    let res = await remote.dialog.showOpenDialog({ properties: ["openDirectory"] });
    if (!res.filePaths || !res.filePaths.length) {
      console.log("Aucun dossier selectionné");
      return;
    }

    return downloadAlgorithm(
      {
        name: this.name,
        firstChapter: this.chapters.firstChapter.toString(),
        lastChapter: this.chapters.lastChapter.toString(),
      },
      res.filePaths[0]
    );
  }
}
</script>

<style scoped lang="scss">
.v-card {
  width: 600px;
  padding: 10px;

  .v-card-actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
