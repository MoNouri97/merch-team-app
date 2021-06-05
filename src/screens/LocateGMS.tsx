import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Circle, LatLng, Marker } from 'react-native-maps';
import AppText from '~/components/AppText';
import { ErrorMessage, GMSPicker, SubmitBtn } from '~/components/Forms';
import { Subtitle } from '~/components/Forms/styles';
import GMSMarker from '~/components/Map/GMSMarker';
import AppScreen from '~/components/Shared/AppScreen';
import Btn from '~/components/Shared/Btn';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';
import useLocation from '~/Helpers/useLocation';

const initial = {
	GMS: '',
	coord: undefined,
};
const validation = yup.object({
	GMS: yup.string().required(),
	coord: yup.object().required(),
});

// const getLocation = async () => {
// 	let location = await Location.getCurrentPositionAsync({});
// 	return location;
// };
const LocateGMS: React.FC = () => {
	const [pin, setPin] = useState<LatLng>();
	const { location, refresh } = useLocation();
	let region = useRef({
		longitude: 0,
		latitude: 0,
		latitudeDelta: 0.001,
		longitudeDelta: 0.001,
	});
	useEffect(() => {
		console.log('setting');

		region.current = {
			...region.current,
			...location,
		};
		setPin(region.current);
	}, [location]);

	return (
		<AppScreen navbar>
			<Formik
				initialValues={initial}
				validationSchema={validation}
				onSubmit={(values, { setSubmitting }) => {
					console.log(values);
					setSubmitting(false);
				}}
			>
				{({ setFieldValue }) => (
					<>
						<GMSPicker />
						<Subtitle>Détails</Subtitle>

						<AppText type="label">Carte</AppText>
						<Map>
							<MapView
								onPress={(e) => {
									setPin(e.nativeEvent.coordinate);
									setFieldValue('coord', e.nativeEvent.coordinate);
								}}
								region={region.current.latitude ? region.current : undefined}
								onRegionChangeComplete={(r) => {
									region.current = r;
								}}
								rotateEnabled={false}
								zoomEnabled={false}
								style={{
									flex: 1,
								}}
							>
								{pin && <GMSMarker coordinate={pin} text="GMS" />}
								{location && (
									<>
										<Circle
											center={location}
											radius={50}
											fillColor="rgba(78, 173, 254, 0.2)"
											strokeColor="rgba(78, 173, 254,0)"
										/>
										<Marker
											image={require('../../assets/standing-man-50.png')}
											coordinate={location}
											title="Votre Position"
										/>
									</>
								)}
							</MapView>
						</Map>
						<Btn
							onPress={() => {
								refresh();
								if (!location) {
									return;
								}
								region.current = {
									...location,
									latitudeDelta: 0.001,
									longitudeDelta: 0.001,
								};
								setPin(location);
							}}
						>
							Utiliser L'emplacement Actuel
						</Btn>
						<ErrorMessage name="coord" />
						<SubmitBtn>Soumettre</SubmitBtn>
					</>
				)}
			</Formik>
		</AppScreen>
	);
};
export default LocateGMS;

const Map = styled.View`
	border-radius: 20px;
	overflow: hidden;
	flex: 1;
	height: 400px;
	margin: 20px 0;
	border: solid 1px ${({ theme }) => theme.colors.gray[2]};
`;
