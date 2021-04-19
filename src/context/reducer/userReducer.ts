import { User } from '~/types/models/User';

export const initialValue = {
	userToken: null as string | null,
	isLoading: true,
	isSignedIn: false,
	user: null as User | null,
};
// types
export type UserState = typeof initialValue;
export type SignInPayload = {
	userToken: string | null;
	user: User | null;
};
type Action =
	| ({
			type: 'RESTORE_TOKEN' | 'SIGN_IN';
	  } & SignInPayload)
	| {
			type: 'SIGN_OUT';
	  };
export const userReducer = (
	prevState: UserState,
	action: Action
): UserState => {
	console.log(action);
	switch (action.type) {
		case 'RESTORE_TOKEN':
			return {
				...prevState,
				userToken: action.userToken,
				isLoading: false,
				user: action.user,
				isSignedIn: action.user !== null,
			};
		case 'SIGN_IN':
			return {
				...prevState,
				isSignedIn: true,
				userToken: action.userToken,
				user: action.user,
			};
		case 'SIGN_OUT':
			return {
				...prevState,
				isSignedIn: false,
				userToken: '',
				user: null,
			};
		default:
			return prevState;
	}
};
