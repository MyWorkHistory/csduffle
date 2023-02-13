import './css/Navigation.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* Image imports */
import img_logo from '../images/logo-76x66.svg';
import text_logo from '../images/logo-text.svg';

//Gray icon images
import img_50x from '../images/icons/gray/50x.svg';
import img_crash from '../images/icons/gray/crash.svg';
import img_dice from '../images/icons/gray/dice.svg';
import img_roulette from '../images/icons/gray/roulette.svg';
import img_towers from '../images/icons/gray/towers.svg';
import img_twitter from '../images/icons/gray/twitter.svg';
import img_dc from '../images/icons/gray/discord.svg';

//White icon images
import wimg_50x from '../images/icons/white/50x.svg';
import wimg_crash from '../images/icons/white/crash.svg';
import wimg_dice from '../images/icons/white/dice.svg';
import wimg_roulette from '../images/icons/white/roulette.svg';
import wimg_towers from '../images/icons/white/towers.svg';
import wimg_twitter from '../images/icons/white/twitter.svg';
import wimg_dc from '../images/icons/white/discord.svg';

export default function Navigation({homePage = false, activePage = ""}) {

    const [customSpanStyling, setCustomSpanStyling] = useState({});

    useEffect(() => {
        if (homePage) {
            //If Navigation bar component called in HomePage.js
            setCustomSpanStyling({"fontFamily": "Montserrat", "fontWeight":"bold", "color":"#FFFFFFB2"});
        }
    }, [homePage])
    
    return(
        <div className="nav-container">
            <Link to="/">
                <img 
                    className={homePage ? "logo home-page-nav-logo" : "logo nav-logo"}
                    src={homePage ? text_logo : img_logo} 
                    style={homePage ? {"marginLeft":"27px", "marginTop":"25px"} : {}}
                />
            </Link>
            <ul>
                <li className={activePage == "50x" ? "active-page" : ""}>
                    <Link to="/50x">
                        <img src={homePage ? wimg_50x : img_50x} />
                        <span style={customSpanStyling}>50x</span>
                    </Link>
                </li>
                <li className={activePage == "towers" ? "active-page" : ""}>
                    <Link to="/towers">
                        <img src={homePage ? wimg_towers : img_towers} />
                        <span style={customSpanStyling}>Towers</span>
                    </Link>
                </li>
                <li className={activePage == "crash" ? "active-page" : ""}>
                    <Link to="/crash">
                        <img 
                            style={homePage 
                                ? {"width": "35px", "height": "40px", "marginBottom":"-4px", "marginTop":"-12px"} //homePage = true
                                : {"marginBottom":"-15px", "marginTop":"-17px", "height":"60px", "width":"40px"}} //homePage = false
                            src={homePage ? wimg_crash : img_crash} 
                        />
                        <span style={customSpanStyling}>Crash</span>
                    </Link>
                </li>
                <li className={activePage == "roulette" ? "active-page" : ""}>
                    <Link to="/roulette">
                        <img src={homePage ? wimg_roulette : img_roulette} />
                        <span style={customSpanStyling}>Roulette</span>
                    </Link>
                </li>
                <li className={activePage == "dice" ? "active-page" : ""}>
                    <Link to="/dice">
                        <img src={homePage ? wimg_dice : img_dice} />
                        <span style={customSpanStyling}>Dice</span>
                    </Link>
                </li>
            </ul>
            <ul className="social-links">
                <li>
                    <a href="#">
                        <img src={homePage ? wimg_twitter : img_twitter} />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src={homePage ? wimg_dc : img_dc} />
                    </a>
                </li>
            </ul>
        </div>
    );
}