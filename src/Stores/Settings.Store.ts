import { map } from 'nanostores'
import type { SettingInterface } from '@/Types/Settings.Types'

const initialData: SettingInterface = {
    tries: 6,
    length: 5,
    lang: 'en'
}


export const _setting = map<SettingInterface>(initialData)