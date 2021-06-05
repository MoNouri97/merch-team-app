import React from 'react';
import { LatLng, Marker } from 'react-native-maps';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';

interface GMSMarkerProp {
	coordinate: LatLng;
	text?: string;
}

const GMSMarker: React.FC<GMSMarkerProp> = ({ coordinate, text }) => {
	return (
		<Marker
			draggable
			image={require('../../../assets/shop-50.png')}
			coordinate={coordinate}
			anchor={{ x: 0.2, y: 1 }}
		>
			{text && <Title>{text}</Title>}
		</Marker>
	);
};
const Title = styled(AppText)`
	margin-left: 30px;
`;
export default GMSMarker;
