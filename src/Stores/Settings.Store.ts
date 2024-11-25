import { map } from 'nanostores'
import type { SettingInterface } from '@/Types/Settings.Types'
import { Local } from '@lifo123/library/utils'

const initialData: SettingInterface = {
    tries: 6,
    length: 5,
    lang: 'en'
}

const isBrowser = typeof window !== 'undefined'

export const _setting = map<SettingInterface>(isBrowser? Local.get('wordguess-setting') : initialData)