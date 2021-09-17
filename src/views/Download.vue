<template>
  <v-layout align-center justify-center>
    <v-card>
      <v-card-title> {{ $t("application.menu.download") }}</v-card-title>
      <form>
        <div class="form-row">
          <v-text-field placeholder="Dragon ball" v-model="name">
            <template #label>
              {{ $t("view.download.input-name") }}
            </template>
          </v-text-field>
        </div>
        <div class="form-row">
          <v-tooltip bottom>
            <template #activator>
              <v-text-field placeholder="https://www.dragon-ball.com/chapter-${chapter}/${page}" v-model="url">
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
        </div>
        <div class="form-row">
          <v-text-field type="number" v-model="firstChapter">
            <template #label>
              {{ $t("view.download.input-chapter.start") }}
            </template>
          </v-text-field>
        </div>
        <div class="form-row">
          <v-text-field type="number" v-model="lastChapter">
            <template #label>
              {{ $t("view.download.input-chapter.end") }}
            </template>
          </v-text-field>
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
  firstChapter = "1";
  lastChapter = "1";

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
  padding: 10px;

  .v-card-actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
