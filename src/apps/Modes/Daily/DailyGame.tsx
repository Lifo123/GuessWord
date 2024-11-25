'use client'
import GameLoader from "@/apps/Game/GameLoader";
import { _game } from "@/Stores/Game.Store";

export default function DefaultGame() {


    return (
        <GameLoader path='daily'/>
    )
}