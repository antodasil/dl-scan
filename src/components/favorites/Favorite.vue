<template>
  <v-card>
    <v-card-title>{{ name }}</v-card-title>

    <v-card-actions>
      <update-favorite-dialog
        :name="name"
        :url="url"
        @update-fav="updateFav($event)"
        @delete-fav="deleteFav()"
      ></update-favorite-dialog>
      <download-favorite-dialog :name="name" @download-fav="download($event)"></download-favorite-dialog>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Options, Prop, Emit } from "vue-property-decorator";
import UpdateFavoriteDialog from "./dialogs/UpdateFavoriteDialog.vue";
import DownloadFavoriteDialog from "./dialogs/DownloadFavoriteDialog.vue";
import { remote } from "electron";
import { dlChapters, IChaptersInfos } from "@/services/download.service";
import { toCamelCase } from "@/utils/string.utils";
import { IFavorite, IFavoriteInfos } from "@/services/favorites.service";

@Options({
  components: {
    UpdateFavoriteDialog,
    DownloadFavoriteDialog,
  },
})
export default class Favorites extends Vue {
  @Prop(String)
  readonly id: string = "";
  @Prop(String)
  readonly name: string = "";
  @Prop(String)
  readonly url: string = "";

  @Emit()
  deleteFav(): string {
    return this.id;
  }

  @Emit()
  updateFav(data: IFavoriteInfos): IFavorite {
    return { id: this.id, name: data.name, url: data.url };
  }

  async download(data: IChaptersInfos): Promise<void> {
    let res = await remote.dialog.showOpenDialog({ properties: ["openDirectory"] });
    if (!res.filePaths || !res.filePaths.length) {
      console.log("Aucun dossier selectionné");
      return;
    }
    return dlChapters(
      {
        name: toCamelCase(this.name),
        url: this.url,
        firstChapter: data.firstChapter,
        lastChapter: data.lastChapter,
      },
      res.filePaths[0]
    );
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  width: 224px;
  height: 100px;
  margin: 5px;

  .v-card-actions {
    display: flex;
    justify-content: flex-end;
  }

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
}
</style>
