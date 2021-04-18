/* eslint-disable no-shadow */
import 'styled-components';
import { DefaultTheme } from 'styled-components';
// import original module declarations

// and extend them!
declare module 'styled-components' {
	export interface DefaultTheme {
		borderRadius: string;
		colors: {
			primary: string;
			secondary: string;
			black: string;
			white: string;
			green: string;
			yellow: string;
			red: string;
			gray: {
				1: string;
				2: string;
				3: string;
				4: string;
			};
		};
	}
}
const myTheme: DefaultTheme = {
	borderRadius: '5px',
	colors: {
		primary: '#9D3D8E',
		secondary: '#8947CB',
		black: '#111',
		white: '#FFFFFF',
		green: '#24CE85',
		yellow: '#FFB84E',
		red: '#EA5D5D',
		gray: {
			1: '#F6F6F6',
			2: '#E8E8E8',
			3: '#BDBDBD',
			4: '#666666',
		},
	},
};
export { myTheme };
