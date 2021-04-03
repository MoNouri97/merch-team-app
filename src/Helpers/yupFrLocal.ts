/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';
// ${path}
export const yupFrLocal = {
	mixed: {
		required: 'ce champ est requis',
	},
	string: {
		min: 'doit être au moins ${min} caractères',
		max: 'doit être au plus ${max} caractères',
		email: 'doit être une adresse e-mail valide',
	},
	array: {
		min: 'ce champ doit contenir au moins ${min} éléments',
		max: 'ce champ doit contenir au plus ${max} éléments',
		length: 'ce champ doit contenir ${length} éléments',
	},
};
yup.setLocale(yupFrLocal);
export { yup };
