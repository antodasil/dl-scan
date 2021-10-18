<template>
  <v-btn @click="show()" v-bind="buttonProps">
    <slot name="button"></slot>
  </v-btn>
  <v-dialog transition="dialog-bottom-transition" v-model="visible">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <slot>{{ message }}</slot>
      </v-card-text>
      <v-card-actions>
        <slot name="left-actions" :hide="hide"></slot>
        <div class="right-buttons">
          <v-btn @click="hide()" text>{{ $t("application.actions.cancel") }}</v-btn>
          <slot name="actions" :hide="hide"></slot>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Options, Prop, Watch } from "vue-property-decorator";

@Options({
  emits: ["hide-dialog"],
})
export default class DialogButton extends Vue {
  @Prop(String)
  readonly title = "";
  @Prop(String)
  readonly message = "";
  @Prop(Object)
  readonly buttonProps = {};

  visible = false;

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  @Watch("visible")
  visibleWatcher(): void {
    if (this.visible === false) {
      this.$emit("hide-dialog");
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  min-width: 500px;

  .v-card-actions {
    display: flex;

    .right-buttons {
      flex: 1 0 auto;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
