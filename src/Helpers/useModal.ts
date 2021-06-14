import { useContext } from 'react';
import ModalContext from '~/context/ModalContext';

export const useModal = () => {
	const modal = useContext(ModalContext);
	return modal!;
};
