import './css/Profile.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCookie } from '../utilities/Helpers';

//Component Imports
import Background from '../components/Background';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Table from '../components/Table';

//Image imports
import pfp from '../images/profile-pics/example.png'; //Example Profile Picture

export default function Profile() {

    const loggedIn = useSelector(state => state.login) || undefined;
    const backend = useSelector(state => state.backend);

    const [username, setUsername] = useState("Username");
    const [personaName, setPersonaName] = useState("");
    const [balance, setBalance] = useState(0);
    const [avatar, setAvatar] = useState(0);
    const [tradeLink, setTradeLink] = useState("");

    const [profileThead, setProfileThead] = useState(["Game", "Bet Amount", "Time", "Return"]);

    //These datas will be received from backend (probably) so I'm using useState hook
    //I would put placeholders temporary but this will make everything much easier especially while integrating backend with frontend
    const [profileTableDatas, setProfileTableDatas] = useState([]);

    useEffect(() => {
        setProfileTableDatas([ // <------ TEST
            ["Dice", "1337.37", "14/09/2021", <span className="loss-return">-5000</span>],
            ["Dice", "1337.37", "14/09/2021", <span className="profit-return">+5000</span>],
            ["Dice", "1337.37", "14/09/2021", <span className="loss-return">-5000</span>],
            ["Dice", "1337.37", "14/09/2021", <span className="profit-return">+5000</span>],
            ["Dice", "1337.37", "14/09/2021", <span className="loss-return">-5000</span>],
            ["Dice", "1337.37", "14/09/2021", <span className="profit-return">+5000</span>],
            ["Dice", "1337.37", "14/09/2021", <span className="loss-return">-5000</span>],
            ["Dice", "1337.37", "14/09/2021", <span className="profit-return">+5000</span>],
            ["Dice", "1337.37", "14/09/2021", <span className="loss-return">-5000</span>],
            ["Dice", "1337.37", "14/09/2021", <span className="profit-return">+5000</span>],
            ["Dice", "1337.37", "14/09/2021", <span className="loss-return">-5000</span>],
        ]);

        if (loggedIn) {
            setUsername(loggedIn.username);
            setPersonaName(loggedIn.personaName);
            setBalance(loggedIn.balance);
            setAvatar(loggedIn.avatar);
            setTradeLink(loggedIn.tradeLink);
        } else window.location.href = "/"
    }, []);

    function setTradelink() {
        fetch(backend+"/api/set-tradelink/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                secret: getCookie("secret"),
                public: getCookie("public"),
                url: tradeLink
            })
        });
    }

    return (
        <div>
            <Background />
            <Header title="Profile" />
            <Navigation />
            
            <main className="profile-page-main">
                <div className="container-fluid max-width-1920">
                    <div className="row">
                        <div className="col-12 col-xxl-9 profile-column">
                            <div className="profile-container">
                                <div className="profile-header">
                                    <div className="profile-pic-container">
                                        <img src={avatar} />
                                    </div>
                                    <div className="profile-info-container">
                                        <div>
                                            <h5>{username}</h5>
                                        </div>
                                        <div>
                                            <input placeholder="Tradelink" defaultValue={tradeLink} onChange={(event) => setTradeLink(event.target.value)} />
                                            <button onClick={setTradelink}>SAVE</button>
                                            <p>Find your tradelink <a target="_blank" href={"https://steamcommunity.com/id/"+personaName+"/tradeoffers/privacy#trade_offer_access_url"}>here</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-navbar">
                                    <a href="#" className="active">Transactions</a>
                                    <a href="#">Bet History</a>
                                    <a href="#">Returns</a>
                                </div>
                                <div className="profile-table">
                                    <Table 
                                        theadArray = {profileThead}
                                        dataArray = {profileTableDatas}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}
