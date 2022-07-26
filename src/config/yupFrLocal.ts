/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';
// ${path}
export const yupFrLocal = {
	mixed: {
		required: 'ce champ est requis',
		notType: 'valeur invalide',
	},
	string: {
		min: 'doit être au moins ${min} caractères',
		max: 'doit être au plus ${max} caractères',
		email: 'doit être une adresse e-mail valide',
	},
	number: {
		min: 'doit être supérieur ou égale  ${min}',
		max: 'doit être inférieure ou égale  ${max}',
		positive: 'doit être un nombre positive',
	},
	array: {
		min: 'ce champ doit contenir au moins ${min} éléments',
		max: 'ce champ doit contenir au plus ${max} éléments',
		length: 'ce champ doit contenir ${length} éléments',
	},
	date: {
		min: 'la date doit être valide',
		max: 'la date doit être valide',
	},
};
yup.setLocale(yupFrLocal);
export { yup };
