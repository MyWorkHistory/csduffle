import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from "../stores/login";
import { setCookie } from '../utilities/Helpers';

export default function Login() {

    const dispatch = useDispatch();

    const [loginFailed, setLoginFailed] = useState(false);
    const [loginDone, setLoginDone] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("data")) {
            let data = JSON.parse(atob(searchParams.get("data")));
            console.log(data);

            if (data.status) {
                //Get secret id and public id
                let sID = data.secret_id;
                let pID = data.public_id;

                //Set them as cookie
                setCookie("secret", sID, "60");
                setCookie("public", pID, "60");

                //Set Redux state
                dispatch(setLogin({
                    username: data.displayName,
                    personaName: data._json.personaname,
                    avatar: data._json.avatar,
                    balance: data.balance
                }));
                
                setLoginDone(true);
            } else setLoginFailed(true);
        } else setLoginFailed(true);

    }, []);

    if (loginFailed || loginDone) return <Navigate replace to="/" />
    return <></>;
}