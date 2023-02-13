import './css/Header.scss';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Image imports
import pfp from '../images/profile-pics/example.png'; //Example Profile Picture
import steam_login from '../images/steam-login.png';

export default function Header({title = "Title", homePage = false}) {

    const loggedIn = useSelector(state => state.login) || undefined;

    const [username, setUsername] = useState("Username");
    const [balance, setBalance] = useState(0);
    const [avatar, setAvatar] = useState(0);

    const [headerBackground, setHeaderBackground] = useState({backgroundColor: "transparent"});

    useEffect(() => {

        if (loggedIn) {
            setUsername(loggedIn.username);
            setBalance(loggedIn.balance);
            setAvatar(loggedIn.avatar);
        }
        
        //When scroll position is not 0, it is harder to read texts on header.
        //So I make header's background black when scrollY is not 0
        function checkScroll(y) {
            if (y > 0) setHeaderBackground({backgroundColor: "black"});
            else setHeaderBackground({backgroundColor: "transparent"});
        }

        window.onscroll = () => {
            let scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            checkScroll(scrollY);
        };
        
    }, [loggedIn]);

    return (
        <header style={headerBackground}>
            {title &&
                <div className="container-fluid max-width-1920 header-container">
                    <div className="row">
                        <div className="col-12">
                            <h1>{title}</h1>
                        </div>
                    </div>
                </div>
            }
            {
                //Logged In -- Show General Profile Info
                loggedIn ?
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="balance-container">
                        <div className="balance">
                            <span className="dollar-sign">$</span>
                            <span className="balance-text" style={homePage ? {"fontWeight": "700", "color": "white"} : {}}>{balance}</span>
                        </div>
                        <div className="add-balance">
                            <a href="#" style={homePage ? {color: "white"} : {}}>+</a>
                        </div>
                    </div>
                    <Link to="/profile">
                        <p className="username">{username}</p>
                    </Link>
                    <Link to="/profile">
                        <img className="profile-pic" src={avatar} />
                    </Link>
                </div> :
                //Not Logged In -- Show Steam Login Button
                <div style={{zIndex: "2", position: "relative"}}>
                    <a href={window.mode == "development" ? "http://localhost:6005/api/login" : "18.159.113.150:6005/api/login"}>
                        <img src={steam_login} style={{marginRight: "15px"}} />
                    </a>
                </div>
            }
        </header>
    );
}
