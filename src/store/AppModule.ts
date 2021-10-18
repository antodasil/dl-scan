import { ILanguage, ISelectTheme, ISettings, ITheme, loadSettings, updateSetting } from "@/services/settings.service";
import { Action, Module, Mutation, VuexModule } from "vuex-class-modules";

@Module
export class AppModule extends VuexModule {
  protected theme: ITheme = "light";
  protected lang: ILanguage = "fr";

  //#region Getters
  public get appTheme(): ITheme {
    return this.theme;
  }

  public get language(): ILanguage {
    return this.lang;
  }
  //#endregion

  //#region Mutations
  @Mutation
  private setAppTheme(theme: ITheme): void {
    this.theme = theme;
  }

  @Mutation
  public setLanguage(language: ILanguage): void {
    this.lang = language;
    updateSetting("language", language);
  }
  //#endregion

  //#region Action
  @Action
  public setSelectedTheme(theme: ISelectTheme): void {
    if (theme === "system") {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) {
        this.setAppTheme("dark");
      } else {
        this.setAppTheme("light");
      }
    } else {
      this.setAppTheme(theme);
    }

    updateSetting("theme", theme);
  }

  @Action
  public async initFromSettings(): Promise<void> {
    const settings: ISettings = await loadSettings();
    this.setSelectedTheme(settings.theme);
    this.setLanguage(settings.language);
  }
  //#endregion
}

import store from "./";
export default new AppModule({ store, name: "app" });
