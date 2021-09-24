<template>
  <v-app :theme="theme">
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
              <router-link :to="{ name: 'Settings', params: { theme: theme }, }" :theme="theme">
                <v-icon>mdi-cog</v-icon> {{ $t("application.menu.settings") }}
              </router-link>
            </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view @change-theme="changeTheme($event)" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import { ISettings, loadSettings } from "@/services/settings.service";

@Options({})
export default class App extends Vue {
  theme = "light";

  changeTheme(theme: string): void {
    this.theme = theme;
  }

  async initSettings(): Promise<void> {
    let settings: ISettings = await loadSettings();
    if(settings.theme === "system") {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      this.theme = "dark";
    } else {
      this.theme = "light";
    }
    } else {
      this.theme = settings.theme;
    }
    this.$i18n.locale = settings.language;
  }

  created(): void {
    this.initSettings();
  }
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
