import { Icon } from "@lifo123/library";
import { $isAsideOpen } from "../aside/Aside.Store";
import AsideBtn from "../aside/AsideBtn";
interface HeaderLeftProps {

}

export default function HeaderLeft() {
    return (
        <div className="f-row g-3 f-center">
            <AsideBtn />
            <span className="icon iconBtns pointer d-flex f-center">
                <svg viewBox="0 0 24 24" height={24} stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20h20M5 20V8.2a.2.2 0 0 1 .2-.2h2.6a.2.2 0 0 1 .2.2V20m3 0V4.27c0-.15.09-.27.2-.27h2.6c.11 0 .2.12.2.27V20m3 0v-8.85c0-.08.09-.15.2-.15h2.6c.11 0 .2.07.2.15V20"  />
                </svg>
            </span>
        </div>
    )
}