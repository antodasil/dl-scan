<template>
  <dialog-button :btnColor="'primary'" :title="$t('view.favorites.add-popin-title')" @hide-dialog="resetTmp()">
    <template #button><v-icon>mdi-plus</v-icon></template>

    <template #default>
      <name-input v-model="name"></name-input>
      <url-input v-model="url"></url-input>
    </template>

    <template #actions="{ hide }">
      <v-btn
        color="primary"
        @click="
          addFav();
          hide();
        "
        >{{ $t("application.actions.add") }}</v-btn
      >
    </template>
  </dialog-button>
</template>

<script lang="ts">
import { Vue, Options, Emit } from "vue-property-decorator";
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
export default class AddFavoriteDialog extends Vue {
  name = "";
  url = "";

  closeDialog = false;

  @Emit()
  addFav(): IFavoriteInfos {
    return {
      name: this.name,
      url: this.url,
    };
  }

  resetTmp(): void {
    this.name = "";
    this.url = "";
  }
}
</script>
