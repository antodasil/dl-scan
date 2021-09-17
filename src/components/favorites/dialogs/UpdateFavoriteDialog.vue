<template>
  <dialog-button :title="$t('application.actions.update') + ' ' + name" @hide-dialog="resetInfos()">
    <template #button>
      <v-icon>mdi-cog</v-icon>
    </template>

    <template #default>
      <div class="form-row">
        <v-text-field v-model="nameTmp">
          <template #label>{{ $t("view.download.input-name") }}</template>
        </v-text-field>
      </div>
      <div class="form-row">
        <v-text-field type="text" class="v-text-field" v-model="urlTmp">
          <template #label>{{ $t("view.download.input-url") }}</template>
        </v-text-field>
      </div>
    </template>

    <template #left-actions>
      <v-btn @click="deleteFav()" color="red"><v-icon>mdi-delete</v-icon></v-btn>
    </template>

    <template #actions="{ hide }">
      <v-btn
        color="primary"
        @click="
          updateFav();
          hide();
        "
        >{{ $t("application.actions.save") }}</v-btn
      >
    </template>
  </dialog-button>
</template>

<script lang="ts">
import { Vue, Options, Prop, Emit } from "vue-property-decorator";
import DialogButton from "@/components/application/DialogButton.vue";
import { IFavoriteInfos } from "@/services/favorites.service";

@Options({
  components: {
    DialogButton,
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
  updateFav(): IFavoriteInfos {
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
