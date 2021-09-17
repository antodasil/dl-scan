<template>
  <v-app :theme="theme">
    <v-navigation-drawer permanent expand-on-hover app>
      <v-list>
        <v-list-item>
          <router-link to="/">{{ $t("application.menu.download") }}</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/favorites">{{ $t("application.menu.favorites") }}</router-link>
        </v-list-item>
      </v-list>
      <template #append>
        <settings :theme="theme" @change-theme="changeTheme($event)"></settings>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import Settings from "@/components/application/Settings.vue";

@Options({ components: { Settings } })
export default class App extends Vue {
  theme = "light";

  changeTheme(theme: string): void {
    this.theme = theme;
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
