<template>
  <v-layout align-center justify-center>
    <v-card>
      <v-card-title> {{ $t("application.menu.download") }}</v-card-title>
      <form>
        <div class="form-row">
          <label for="input-name">{{ $t("view.download.input-name") }}</label>
          <input type="text" id="input-name" placeholder="Dragon ball" v-model="name" />
        </div>
        <div class="form-row">
          <label for="input-url"
            >{{ $t("view.download.input-url") }}
            <v-icon>
              mdi-information-outline
              <v-tooltip bottom>{{ $t("view.download.url-tooltip") }}</v-tooltip>
            </v-icon>
          </label>
          <input
            type="text"
            class="v-text-field"
            id="input-url"
            placeholder="https://www.dragon-ball.com/chapter-${chapter}/${page}"
            v-model="url"
          />
        </div>
        <div class="form-row">
          <label for="input-chapter-start">{{ $t("view.download.input-chapter.start") }} </label>
          <input type="number" class="v-text-field" id="input-chapter-start" v-model="firstChapter" />
        </div>
        <div class="form-row">
          <label for="input-chapter-end">{{ $t("view.download.input-chapter.end") }} </label>
          <input type="number" class="v-text-field" id="input-chapter-end" v-model="lastChapter" />
        </div>

        <v-card-actions>
          <v-btn @click="addFavorite()"><v-icon>mdi-star-outline</v-icon></v-btn>
          <v-btn color="primary" @click="download()"> {{ $t("view.download.btn-download") }} </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Options, Vue, Watch } from "vue-property-decorator";
import { dlChapters } from "@/services/download.service";
import { remote } from "electron";
import { toCamelCase } from "@/utils/string.utils";
import { v4 as uuid } from "uuid";
import { addFavorite } from "@/services/favorites.service";

@Options({})
export default class Download extends Vue {
  name = "";
  url = "";
  firstChapter = 1;
  lastChapter = 1;

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
        firstChapter: this.firstChapter,
        lastChapter: this.lastChapter,
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

<style scoped lang="scss">
.v-card {
  width: 600px;
  height: 300px;
  padding: 10px;

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

  .v-card-actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
