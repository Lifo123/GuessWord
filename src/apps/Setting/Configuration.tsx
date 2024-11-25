import { _setting } from "@/Stores/Settings.Store";
import { Alert } from "@lifo123/library";
import { CloseBtn, DarkmodeDrop } from "@lifo123/library/components";
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
                <div>
                    <DarkmodeDrop storage="darkmode" />
                </div>
            </div>
        </section>
    )
}