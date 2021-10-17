import { readFilePromised, writeFilePromised } from "@/utils/promisedFunc.utils";
import { resolve } from "path";

const SETTINGS_FILEPATH = resolve("resources/config/settings.json");

export type ITheme = "light" | "dark";
export type ISelectTheme = ITheme | "system";
export type ILanguage = "fr" | "en";

export interface ISettings {
  theme: ISelectTheme;
  language: ILanguage;
  [key: string]: string | number;
}

export async function loadSettings(): Promise<ISettings> {
  const file = await readFilePromised(SETTINGS_FILEPATH, {});
  return JSON.parse(file.toString());
}

// TODO Debounce function
export function updateSettings(settings: ISettings): void {
  writeFilePromised(SETTINGS_FILEPATH, JSON.stringify(settings), {});
}

export async function updateSetting(key: string, value: string | number): Promise<void> {
  const settings = await loadSettings();
  settings[key] = value;
  updateSettings(settings);
}
