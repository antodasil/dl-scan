<template>
  <dialog-button :btnColor="'primary'" :title="$t('view.favorites.add-popin-title')" @hide-dialog="resetTmp()">
    <template #button><v-icon>mdi-plus</v-icon></template>

    <template #default>
      <div class="form-row">
        <label for="input-name">{{ $t("view.download.input-name") }} </label>
        <input type="text" id="input-name" v-model="name" />
      </div>
      <div class="form-row">
        <label for="input-url">{{ $t("view.download.input-url") }} </label>
        <input type="text" class="v-text-field" id="input-url" v-model="url" />
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
