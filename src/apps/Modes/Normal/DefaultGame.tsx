'use client'
import GameLoader from "@/apps/Game/GameLoader";
import { _setting } from "@/Stores/Settings.Store";
import { _user } from "@/Stores/User.Store";
import { Local } from "@lifo123/library/utils";
import React from "react";

export default function DefaultGame() {

    React.useEffect(() => {
        const SETTING = Local.get(`wordguess-default`)?.setting
        const USER = Local.get('wordguess-user')

        if (SETTING) {
            _setting.set(SETTING)
        }

        if (USER) {
            _user.set(USER)
        }
    }, [])

    return (
        <GameLoader path='default' />
    )
}