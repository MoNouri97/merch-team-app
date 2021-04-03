import React from 'react';
import { Dimensions, View } from 'react-native';
import MapView from 'react-native-maps';
import AppText from '~/components/AppText';
import Btn from '~/components/Btn';
import { Subtitle } from '~/components/Forms/styles';
import styled from '~/config/styled-components';

const { width, height } = Dimensions.get('screen');
const MapGMS: React.FC = () => {
	// code here ...
	console.log('hello');
	return (
		<>
			<MapView style={{ width, height }} />
			{/* <Container> */}
			<Card>
				<View>
					<Subtitle>Sahloul</Subtitle>
					<AppText>30min</AppText>
				</View>
				<Btn primary onPress={() => alert('hhh')}>
					<AppText color="light">Commencer</AppText>
					<AppText color="light">Rapport</AppText>
				</Btn>
			</Card>
			{/* </Container> */}
		</>
	);
};
const Card = styled.View`
	position: absolute;
	bottom: 10px;
	left: 10px;
	right: 10px;
	elevation: 10;
	background: #fff;
	padding: 20px;
	border-radius: 25px;
	flex-direction: row;
	justify-content: space-between;
`;
export default MapGMS;
