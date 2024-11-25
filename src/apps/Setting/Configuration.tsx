import { _setting } from "@/Stores/Settings.Store";
import { Alert } from "@lifo123/library";
import { CloseBtn, DarkmodeDrop } from "@lifo123/library/components";
import { Local } from "@lifo123/library/utils";
import { useStore } from "@nanostores/react";

export default function Configuration() {
    const SETTING = useStore(_setting)


    return (
        <section className="setting-app f-col g-2 o-hidden">
            <div className="setting-cont f-col g-2 mx-auto mt-4">
                <div className="f-row f-justify-between f-align-center">
                    <span></span>
                    <CloseBtn size={26} onClick={() => Alert.dismiss('config')} />
                </div>
                <div className="f-col f-center">
                    <DarkmodeDrop storage="darkmode" />
                </div>
                <div className="f-col g-2 mt-3 f-center">
                    <input type="range" id="" max={10} min={4} defaultValue={SETTING.length || 5} onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        _setting.setKey('length', parseInt(target.value));
                        Local.set('wordguess-setting', SETTING)
                    }} />
                    <input type="range" id="" max={10} min={1} defaultValue={SETTING.tries || 6} onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        _setting.setKey('tries', parseInt(target.value));
                        Local.set('wordguess-setting', SETTING)
                    }} />
                </div>
            </div>
        </section>
    )
}