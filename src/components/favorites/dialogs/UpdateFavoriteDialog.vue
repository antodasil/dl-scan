<template>
  <dialog-button :title="$t('application.actions.update') + ' ' + name" @hide-dialog="resetInfos()">
    <template #button>
      <v-icon>mdi-cog</v-icon>
    </template>

    <template #default>
      <name-input v-model="nameTmp"></name-input>
      <url-input v-model="urlTmp"></url-input>
    </template>

    <template #left-actions>
      <v-btn @click="deleteFav()" color="red"><v-icon>mdi-delete</v-icon></v-btn>
    </template>

    <template #actions="{ hide }">
      <v-btn @click="updateFav(hide)" color="primary"> {{ $t("application.actions.save") }} </v-btn>
    </template>
  </dialog-button>
</template>

<script lang="ts">
import { Vue, Options, Prop, Emit } from "vue-property-decorator";
import DialogButton from "@/components/global/DialogButton.vue";
import { IFavoriteInfos } from "@/services/favorites.service";
import NameInput from "@/components/download/NameInput.vue";
import UrlInput from "@/components/download/UrlInput.vue";

@Options({
  components: {
    DialogButton,
    NameInput,
    UrlInput,
  },
})
export default class UpdateFavoriteDialog extends Vue {
  @Prop(String)
  readonly name: string = "";
  @Prop(String)
  readonly url: string = "";

  nameTmp = "";
  urlTmp = "";

  @Emit()
  deleteFav(): void {
    return;
  }

  @Emit()
  updateFav(hide: () => void): IFavoriteInfos {
    hide();
    return { name: this.nameTmp, url: this.urlTmp };
  }

  resetInfos(): void {
    this.nameTmp = this.name;
    this.urlTmp = this.url;
  }

  created(): void {
    this.resetInfos();
  }
}
</script>
