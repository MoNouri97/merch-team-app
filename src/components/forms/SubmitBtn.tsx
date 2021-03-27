import Btn from '../Btn';
import React from 'react';
import { useFormikContext } from 'formik';

interface Props {}

const SubmitBtn: React.FC<Props> = ({}) => {
	const { handleSubmit } = useFormikContext();
	return <Btn onPress={() => handleSubmit()}>Submit</Btn>;
};
export default SubmitBtn;
