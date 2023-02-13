const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const passport = require('passport');
const passportSteam = require('passport-steam');
const session = require('express-session');
const server = http.createServer(app);
const { uuid, isUuid   } = require('uuidv4');
const db = require("./db");

const mode = "development";
const SteamStrategy = passportSteam.Strategy;
const PORT = 6005;
const steamAPI = "1509E1C2B7CA6A1445787E3FA173E3BA";
const baseURL = (mode ? "http://localhost:" : "18.159.113.150:") + PORT.toString();
const clientURL = mode ? "http://localhost:4000" : "18.159.113.150:4000";

//Passport Methods
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.use(new SteamStrategy(
    {
        returnURL: baseURL + '/api/login/return',
        realm: baseURL + '/api/login',
        apiKey: steamAPI
    }, 
    function (identifier, profile, done) {
        process.nextTick(function () {
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
));

app.use(express.json());
app.use(cors({origin: "*"}));
app.use(session({
    secret: 'cSdUFfLe63',
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 3600000
    }
}));
app.use(passport.initialize());
app.use(passport.session());

//Backend Routes
app.get('/logged', (req, res) => {
    let userData = req.user;
    let steamID = req.user._json.steamid;

    userData.displayName = userData.displayName.replaceAll("'", " ");

    //Check database if steam_id exists
    db.Query(`SELECT * FROM users WHERE steam_id = '${steamID}'`).then(data => {
        if (!data.length) {
            //User does not exist
            userData.balance = 0;

            let secretID = uuid(), publicID = uuid();
            userData.secret_id = secretID, userData.public_id = publicID;

            db.Query(`INSERT INTO users (username, persona_name, avatar, balance, public_id, secret_id, steam_id) VALUES ('${userData.displayName}', '${userData._json.personaname}', '${userData._json.avatar}', '${0}', '${publicID}', '${secretID}', '${steamID}')`);
        } else {
            //User exist
            data = data[0]; //There'll be only 1 user with that specific steamID

            if (data.avatar != userData._json.avatar) db.Query(`UPDATE users SET avatar = '${userData._json.avatar}' WHERE steam_id = '${steamID}'`);
            if (data.username != userData.displayName) db.Query(`UPDATE users SET username = '${userData.displayName}' WHERE steam_id = '${steamID}'`);
        }

        userData.secret_id = data.secret_id, userData.public_id = data.public_id;
        userData.status = 1;

        res.redirect(clientURL + "/login?data=" + Buffer.from(JSON.stringify(userData)).toString("base64"));
    });
});
app.get('/api/login', passport.authenticate('steam', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/logged');
});
app.get('/api/login/return', passport.authenticate('steam', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/logged');
});

app.post("/api/get-user", (req, res) => {
    let public = req.body.public, secret = req.body.secret;
    
    if (isUuid(public) && isUuid(secret)) {
        db.Query(`SELECT * FROM users WHERE public_id = '${public}' and secret_id = '${secret}'`).then(data => {
            if (data.length) {
                data = data[0];
                res.send({
                    status: 1,
                    username: data.username,
                    personaName: data.persona_name,
                    avatar: data.avatar,
                    balance: data.balance,
                    tradeLink: data.trade_link
                });
            } else res.send({status: 0});
        });
    } else res.send({status: 0});
});

app.post("/api/set-tradelink", async (req, res) => {
    try {
        let rawURL = req.body.url;
        if (await userValid(req.body.secret, req.body.public) && !rawURL.includes("'")) {
            if (new URL(rawURL).hostname.includes("steamcommunity.com")) {
                db.Query(`UPDATE users SET trade_link = '${rawURL}'`).then(() => res.send({status: 1}));
            } else res.send({status: 0});
        } else res.send({status: 0});
    } catch(e) { res.send({status: 0}); console.log(e); }
})

async function userValid(s, p) {
    let valid = false;
    if (isUuid(s) && isUuid(p)) {
        await db.Query(`SELECT * FROM users WHERE public_id = '${p}' and secret_id = '${s}'`).then(data => {
            if (data.length == 1) valid = true;
        });
    }
    return valid;
}

server.listen(PORT);