import React, { createContext, useEffect, useState } from 'react';
import { TOKEN_KEY } from '~/config/constants';
import { saveToStorage } from '~/Helpers/asyncStorage';
import { User } from '~/types/models/User';

type AppUser = User | null;
type USER_STATE = {
	user: AppUser;
	setUser: null | ((u: AppUser) => void);
	token: string;
	setToken: null | ((t: string) => void);
};

const useUserState = () => {
	const [user, setUser] = useState<AppUser>(null);
	const [token, setToken] = useState('');

	useEffect(() => {
		if (token === '') return;
		saveToStorage(token, TOKEN_KEY);
	}, [token]);

	return { user, setUser, token, setToken };
};

export const UserContext = createContext<USER_STATE>({
	user: null,
	setUser: null,
	token: '',
	setToken: null,
});

export const UserContextProvider: React.FC = ({ children }) => {
	const userState = useUserState();

	return (
		<UserContext.Provider value={userState}>{children}</UserContext.Provider>
	);
};
