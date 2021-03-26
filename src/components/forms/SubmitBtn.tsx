import AppText from '../AppText';
import Btn from '../Btn';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFormikContext } from 'formik';

interface Props {}

const SubmitBtn: React.FC<Props> = ({}) => {
	const { handleSubmit } = useFormikContext();
	return <Btn onPress={() => handleSubmit()}>Submit</Btn>;
};
export default SubmitBtn;
