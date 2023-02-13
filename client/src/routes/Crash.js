import { useEffect, useState } from "react";

import Background from '../components/Background';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Chat from '../components/Chat';
import BetPlacement from '../components/BetPlacement';
import GameInfo from '../components/GameInfo';

import wimg_crash from '../images/icons/white/crash.svg';

import './css/Crash.scss';

export default function Crash() {

    return (
        <div>
            <Background />
            <Header title={<><img src={wimg_crash} /><span>Crash</span></>} />
            <Navigation activePage="crash" />
            <Chat />

            <main className="crash-game">
                <div className="container-fluid">
                    <div className="row">
                        {/* Game Info container for Desktop */}
                        <div className="col-xl-9 col-xxl-3 game-info-desktop">
                            <GameInfo />
                        </div>
                        {/* Game Screen */}
                        <div className="col-xl-9 col-xxl-7">
                            <div className="row">
                                <div className="game-screen">
                                    INSERT CRASH GAME SCRIPT HERE!
                                </div>
                            </div>
                            <div className="row">
                                <BetPlacement />
                            </div>
                        </div>
                        {/* Game Info container for Laptop */}
                        <div className="col-xl-9 col-xxl-3 d-none px-0 game-info-laptop">
                            <GameInfo />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}