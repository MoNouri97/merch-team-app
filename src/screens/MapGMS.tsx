import React from 'react';
import { Alert, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import AppText from '~/components/AppText';
import Btn from '~/components/Btn';
import { Subtitle } from '~/components/Forms/styles';
import styled from '~/config/styled-components';

const { width, height } = Dimensions.get('screen');
const MapGMS: React.FC = () => {
	// code here ...
	console.log('hello from MapGMS');
	return (
		<>
			<MapView
				showsMyLocationButton
				initialRegion={{
					latitude: 35.8146462228069,
					latitudeDelta: 0.0012900715168910892,
					longitude: 10.640393067151308,
					longitudeDelta: 0.0007533654570579529,
				}}
				style={{
					width,
					height,
				}}
			/>
			<Card>
				<Col>
					<Subtitle numberOfLines={2}>Aziza Swiss</Subtitle>
					<AppText>15min</AppText>
				</Col>
				<Col>
					<Btn primary onPress={() => Alert.alert('report page')}>
						Commencer
					</Btn>
				</Col>
			</Card>
		</>
	);
};
const Col = styled.View`
	flex: 1;
`;

const Card = styled.View`
	position: absolute;
	bottom: 10px;
	left: 10px;
	right: 10px;
	elevation: 5;
	background: ${({ theme }) => theme.colors.gray[1]};
	padding: 20px;
	border-radius: 25px;
	flex-direction: row;
	justify-content: space-between;
`;
export default MapGMS;
