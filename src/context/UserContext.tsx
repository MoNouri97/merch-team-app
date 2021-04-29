import React, { createContext, useEffect, useReducer } from 'react';
import { TOKEN_KEY, USER_KEY } from '~/config/constants';
import {
	initialValue,
	SignInPayload,
	userReducer,
	UserState,
} from '~/context/reducer/userReducer';
import { loadFromStorage, saveToStorage } from '~/Helpers/asyncStorage';
import { User } from '~/types/models/User';

type UserContextState = {
	signIn: (data: SignInPayload) => Promise<void>;
	signOut: () => Promise<void>;
} & UserState;

const useUserState = () => {
	// const [user, setUser] = useState<AppUser>(null);
	const [state, dispatch] = useReducer(userReducer, initialValue);
	// const [token, setToken] = useState('');

	useEffect(() => {
		const initAsync = async () => {
			const userToken = await loadFromStorage<string>(TOKEN_KEY);
			const user = await loadFromStorage<User>(USER_KEY);

			dispatch({ type: 'RESTORE_TOKEN', userToken, user });
		};

		initAsync();
	}, []);

	const userMethods = React.useMemo(
		() => ({
			signIn: async (data: SignInPayload) => {
				saveToStorage(data.user, USER_KEY);
				saveToStorage(data.userToken, TOKEN_KEY);

				dispatch({
					type: 'SIGN_IN',
					user: data.user,
					userToken: data.userToken,
				});
			},
			signOut: async () => {
				saveToStorage(null, USER_KEY);
				saveToStorage(null, TOKEN_KEY);
				dispatch({ type: 'SIGN_OUT' });
			},
		}),
		[]
	);
	return { ...state, ...userMethods };
};

export const UserContext = createContext<UserContextState | null>(null);
export default UserContext;

export const UserContextProvider: React.FC = ({ children }) => {
	const userState = useUserState();

	return (
		<UserContext.Provider value={userState}>{children}</UserContext.Provider>
	);
};
