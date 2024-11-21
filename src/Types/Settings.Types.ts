export type LanguageTypes = 'en' | 'es'
export type LengthTypes = number

export interface SettingInterface {
    tries: number;
    length: LengthTypes;
    lang: LanguageTypes;
}
