'use client'
import React from "react";
import GameLoader from "@/apps/Game/GameLoader";
import { _game, initialData } from "@/Stores/Game.Store";
import { _setting } from "@/Stores/Settings.Store";
import { GameUtils } from "@/utils/Game.Utils";
import { useStore } from "@nanostores/react";


export default function DefaultGame() {
    const SETTING = useStore(_setting)


    React.useEffect(() => {
        GameUtils.validatePrevData('default', SETTING.lang, SETTING.length)
    }, [])

    return (
        <GameLoader />
    )
}