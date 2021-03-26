import InputBase from './InputBase';
import React, { useContext } from 'react';
import { InputContainer } from './styles';
import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'styled-components';
import styled from '~/config/styled-components';

interface Props {}

const ImageInput: React.FC<Props> = ({}) => {
	const theme = useContext(ThemeContext);
	return (
		<InputBase name="image">
			<Touchable>
				<Feather name="image" size={50} color={theme.colors.gray[3]} />
			</Touchable>
		</InputBase>
	);
};

const Touchable = styled.TouchableOpacity`
	flex: 1;
	height: 200px;
	align-items: center;
	justify-content: center;
`;
const styles = StyleSheet.create({});
export default ImageInput;
