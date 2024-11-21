import type { SettingInterface } from '@/Types/Settings.Types'
import { map } from 'nanostores'

export const _setting = map<SettingInterface>({
    tries: 6,
    length: 5,
    lang: 'en'
})