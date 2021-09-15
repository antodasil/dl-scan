<template>
  <div class="flex">
    <h1>{{ $t("application.menu.favorites") }}</h1>
    <add-favorite-dialog @add-fav="addFav($event)"></add-favorite-dialog>
  </div>

  <div v-if="favoritesLoaded">
    <v-card class="none" v-if="favorites.length <= 0">{{ $t("view.favorites.none") }}</v-card>
    <div class="favorites-list" v-else>
      <favorite
        v-for="favorite in favorites"
        :key="favorite.id"
        :id="favorite.id"
        :name="favorite.name"
        :url="favorite.url"
        @delete-fav="deleteFav($event)"
        @update-fav="updateFav($event)"
      ></favorite>
    </div>
  </div>

  <div v-else>
    <div class="loader"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, Watch } from "vue-property-decorator";
import Favorite from "@/components/favorites/Favorite.vue";
import AddFavoriteDialog from "@/components/favorites/dialogs/AddFavoriteDialog.vue";
import { v4 as uuid } from "uuid";
import { IFavorite, loadFavorites, updateFavorites } from "@/services/favorites.service";

@Options({
  components: {
    Favorite,
    AddFavoriteDialog,
  },
})
export default class Favorites extends Vue {
  favorites: IFavorite[] = [];
  favoritesLoaded = false;

  addFav(data: IFavorite): void {
    this.favorites.push({
      id: uuid(),
      name: data.name,
      url: data.url,
    });
  }

  updateFav(data: IFavorite): void {
    const fav: IFavorite | undefined = this.favorites.find((value: IFavorite) => {
      return value.id === data.id;
    });
    if (!fav) {
      console.log("Une erreur est survenue lors de la modification");
      return;
    }
    fav.name = data.name;
    fav.url = data.url;
  }

  deleteFav(id: string): void {
    this.favorites = this.favorites.filter((value: IFavorite) => {
      return value.id !== id;
    });
  }

  async created(): Promise<void> {
    this.favorites = await loadFavorites();
    this.favoritesLoaded = true;
  }

  @Watch("favorites", { deep: true })
  updateFile(): void {
    updateFavorites(this.favorites);
  }
}
</script>

<style scoped lang="scss">
.v-card.none {
  width: 600px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.favorites-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.loader::after {
  content: " ";
  display: inline-block;
  width: 50px;
  height: 50px;
  border: solid 3px #ffffff;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.flex {
  display: flex;
}
</style>
