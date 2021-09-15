import { readFilePromised, writeFilePromised } from "@/utils/promisedFunc.utils";
import { resolve } from "path";
import { v4 as uuid } from "uuid";

export const FAVORITES_FILEPATH = resolve("resources/config/favorites.json");

export interface IFavorite extends IFavoriteInfos {
  id: string;
}

export interface IFavoriteInfos {
  name: string;
  url: string;
}

export async function loadFavorites(): Promise<IFavorite[]> {
  const file = await readFilePromised(FAVORITES_FILEPATH, {});
  return JSON.parse(file.toString()).favorites;
}

export function updateFavorites(favorites: IFavorite[]): Promise<void> {
  const json = JSON.stringify({ favorites });
  return writeFilePromised(FAVORITES_FILEPATH, json, {});
}

export async function addFavorite(favorite: IFavorite): Promise<void> {
  try {
    // await accessPromised(path);
    const file = await readFilePromised(FAVORITES_FILEPATH, {});
    const json = JSON.parse(file.toString());

    if (!favorite.id) {
      favorite.id = uuid();
    }

    json.favorites.push(favorite);
    return writeFilePromised(FAVORITES_FILEPATH, JSON.stringify(json), {});
  } catch (e: any) {
    console.log(e);
  }
}
