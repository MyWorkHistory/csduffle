import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

//Page Imports
import _404 from './routes/404';
import HomePage from './routes/HomePage';
import Login from './routes/Login';
import BlankTemplate from './routes/BlankTemplate';
import ComingSoon from './routes/ComingSoon';
import Maintenance from './routes/Maintenance';
import TermsOfService from './routes/ToS';
import ProvablyFair from './routes/ProvablyFair';

//Profile Related Pages
import Profile from './routes/Profile';
import Referral from './routes/Referral';
import Withdraw from './routes/Withdraw';
import Deposit from './routes/Deposit';

//Game Pages
import Towers from './routes/Towers';
import Crash from './routes/Crash';
import _50x from './routes/50x';
import Roulette from './routes/Roulette';
import Dice from './routes/Dice';
import { getCookie } from './utilities/Helpers';
import { useDispatch } from 'react-redux';
import { setLogin } from "./stores/login";

export default function App() {

	const dispatch = useDispatch();

	//Check login state
	const loggedIn = useSelector(state => state.login) || undefined;
	const backend = useSelector(state => state.backend);

	useState(() => {
		if (!loggedIn && getCookie("secret") && getCookie("public")) {
			fetch(backend+"/api/get-user/", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					secret: getCookie("secret"),
					public: getCookie("public")
				})
			})
			.then(data => data.json())
			.then(data => {
				if (data.status) {
					dispatch(setLogin({
						username: data.username,
						personaName: data.personaName,
						avatar: data.avatar,
						balance: data.balance,
						tradeLink: data.tradeLink
					}));
				}
			});
		}
	}, []);

	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="login/" element={loggedIn ? <Navigate replace to="/" /> : <Login />} />
			<Route path="blank/" element={<BlankTemplate />} />
			<Route path="terms-of-service/" element={<TermsOfService />} />
			<Route path="provably-fair/" element={<ProvablyFair />} />
			<Route path="coming/" element={<ComingSoon />} />
			<Route path="maintenance/" element={<Maintenance />} />
			<Route path="profile/" element={loggedIn ? <Profile /> : <Navigate replace to="/login" />} />
			<Route path="referral/" element={loggedIn ? <Referral /> : <Navigate replace to="/login" />} />
			<Route path="withdraw/" element={loggedIn ? <Withdraw /> : <Navigate replace to="/login" />} />
			<Route path="deposit/" element={loggedIn ? <Deposit /> : <Navigate replace to="/login" />} />
			<Route path="towers/" element={<Towers />} />
			<Route path="crash/" element={<Crash />} />
			<Route path="50x/" element={<_50x />} />
			<Route path="roulette/" element={<Roulette />} />
			<Route path="dice/" element={<Dice />} />
			<Route path="*" element={<_404 />} />
		</Routes>
	);
}