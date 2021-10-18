<template>
  <v-app :theme="theme()">
    <v-navigation-drawer permanent expand-on-hover app>
      <v-list nav>
        <v-list-item-group color="primary">
          <v-list-item>
            <router-link to="/"><v-icon>mdi-download</v-icon> {{ $t("application.menu.download") }}</router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/favorites"><v-icon>mdi-star</v-icon> {{ $t("application.menu.favorites") }}</router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template #append>
        <v-list nav>
          <v-list-item>
            <router-link to="/settings"> <v-icon>mdi-cog</v-icon> {{ $t("application.menu.settings") }} </router-link>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import appModule, { AppModule } from "@/store/AppModule";
import { ILanguage, ITheme } from "./services/settings.service";

@Options({})
export default class App extends Vue {
  //#region methods/computed
  theme(): ITheme {
    return appModule.appTheme;
  }
  //#endregion

  //#region LifeCycle
  created(): void {
    appModule.initFromSettings();
    appModule.$watch(
      (module: AppModule) => module.language,
      (newLanguage: ILanguage) => {
        this.$i18n.locale = newLanguage;
      }
    );
  }
  //#endregion
}
</script>

<style lang="scss">
.v-navigation-drawer {
  padding: 0 25px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    margin: 0 5px;

    &.router-link-exact-active {
      color: #1697f6;
    }
  }
}

.v-main {
  margin: 10px;
}
</style>
