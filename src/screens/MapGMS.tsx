import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AppText from '~/components/AppText';
import { Subtitle } from '~/components/Forms/styles';
import Btn from '~/components/Shared/Btn';
import styled from '~/config/styled-components';
import { GMS } from '~/types/models/GMS';
import { HomeStackParams } from '~/types/navigation';

type MapGMSProps = {
	navigation: StackNavigationProp<HomeStackParams, 'MapGMS'>;
};

const { width, height } = Dimensions.get('screen');
const MapGMS: React.FC<MapGMSProps> = ({ navigation }) => {
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
			>
				<Marker
					coordinate={{
						latitude: 35.8146462228069,
						longitude: 10.640393067151308,
					}}
					title="marker.title"
					description="marker.description"
				/>
			</MapView>
			<FloatingBtn onPress={() => navigation.goBack()}>
				<Feather size={20} name="arrow-left" />
			</FloatingBtn>
			<Card>
				<Col>
					<Subtitle numberOfLines={2}>Aziza Ibn Khaldoun</Subtitle>
					<AppText>15min</AppText>
				</Col>
				<Col>
					<Btn
						primary
						onPress={() => {
							// FIXME
							navigation.navigate('Report', { GMS: {} as GMS });
						}}
					>
						Commencer
					</Btn>
				</Col>
			</Card>
		</>
	);
};
const Col = styled.View`
	flex: 1;
	justify-content: center;
`;
const FloatingBtn = styled.TouchableOpacity`
	position: absolute;
	top: 50px;
	left: 10px;
	padding: 10px;
	elevation: 5;
	border-radius: ${({ theme }) => theme.borderRadius};
	background: ${({ theme }) => theme.colors.white};
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
	opacity: 0.9;
`;
export default MapGMS;
