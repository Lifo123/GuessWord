export type LanguageTypes = 'en' | 'es'
export type LengthTypes = number
export type ModeTypes = 'default' | 'daily' | 'timer' | 'custom'

export interface SettingInterface {
    tries: number;
    length: LengthTypes;
    lang: LanguageTypes;
}
