import { readFilePromised, writeFilePromised } from "@/utils/promisedFunc.utils";
import { resolve } from "path";

const SETTINGS_FILEPATH = resolve("resources/config/settings.json");

export interface ISettings {
  theme: string;
  language: string;
}

export async function loadSettings(): Promise<ISettings> {
  const file = await readFilePromised(SETTINGS_FILEPATH, {});
  return JSON.parse(file.toString());
}

// TODO Debounce function
export function updateSettings(settings: ISettings): void {
  const json = JSON.stringify(settings);
  writeFilePromised(SETTINGS_FILEPATH, json, {});
}
