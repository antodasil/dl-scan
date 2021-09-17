<template>
  <dialog-button :btnColor="'primary'" :title="$t('view.favorites.add-popin-title')" @hide-dialog="resetTmp()">
    <template #button><v-icon>mdi-plus</v-icon></template>

    <template #default>
      <div class="form-row">
        <v-text-field v-model="name">
          <template #label>{{ $t("view.download.input-name") }}</template>
        </v-text-field>
      </div>
      <div class="form-row">
        <v-text-field v-model="url">
          <template #label>{{ $t("view.download.input-url") }}</template>
        </v-text-field>
      </div>
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
import DialogButton from "@/components/application/DialogButton.vue";
import { IFavoriteInfos } from "@/services/favorites.service";

@Options({
  components: {
    DialogButton,
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
