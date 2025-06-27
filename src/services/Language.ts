import { i18nService, t } from "./i18next";

export class Lang {
  private static instance: Lang;
  private lang: string;
  private constructor(lang?: string) {
    this.lang = lang || "en-US";
    i18nService.changeLanguage(this.lang);
  }

  public static getInstance(lang?: string): Lang {
    if (!Lang.instance) {
      Lang.instance = new Lang(lang);
    }
    return Lang.instance;
  }

  public getLang(): string {
    return this.lang;
  }

  public setLang(lang: string): void {
    this.lang = lang;
  }

  public getText({ key, args }: { key: string; args?: string[] }): string {
    return t(key, args);
  }
}
