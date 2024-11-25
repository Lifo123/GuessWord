'use client'
import { useStore } from "@nanostores/react"
import { $isAsideOpen, ManageAside } from "./Aside.Store"
import { Icon } from "@lifo123/library"
import React from "react"


export default function AsideBtn() {
    const STATE = useStore($isAsideOpen)
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        isVisible && (
            <span className={`d-flex asidebtn f-center iconBtns pointer ${STATE ? 'active' : ''}`} onClick={() => ManageAside.toggle()}>
                <Icon
                    icon="sidebar"
                    className={`icon sidebar-header no-select`}
                    size={20}
                />
            </span>
        )
    )
}