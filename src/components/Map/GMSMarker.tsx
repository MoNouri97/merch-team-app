import React from 'react';
import { LatLng, Marker } from 'react-native-maps';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';

interface MarkerProp {
	coordinate: LatLng;
	text?: string;
	icon?: 'GMS' | 'Person';
	draggable?: boolean;
}

const GMSMarker: React.FC<MarkerProp> = (props) => {
	return <AppMarker {...props} icon="GMS" />;
};
const PersonMarker: React.FC<MarkerProp> = (props) => {
	return <AppMarker {...props} icon="Person" />;
};
const AppMarker: React.FC<MarkerProp> = ({
	coordinate,
	text,
	icon,
	draggable = false,
}) => {
	const image = React.useMemo(() => {
		if (icon == 'GMS') {
			return require('../../../assets/shop-50.png');
		}
		if (icon == 'Person') {
			return require('../../../assets/standing-man-50.png');
		}
		return require('../../../assets/standing-man-50.png');
	}, []);
	return (
		<Marker
			draggable={draggable}
			image={image}
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
export { GMSMarker, PersonMarker, AppMarker };
