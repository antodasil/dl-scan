<template>
  <dialog-button :title="$t('application.actions.update') + ' ' + name" @hide-dialog="resetInfos()">
    <template #button>
      <v-icon>mdi-cog</v-icon>
    </template>

    <template #default>
      <div class="form-row">
        <label for="input-name">{{ $t("view.download.input-name") }} </label>
        <input type="text" id="input-name" v-model="nameTmp" />
      </div>
      <div class="form-row">
        <label for="input-url">{{ $t("view.download.input-url") }} </label>
        <input type="text" class="v-text-field" id="input-url" v-model="urlTmp" />
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

<style lang="scss" scoped>
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
</style>
