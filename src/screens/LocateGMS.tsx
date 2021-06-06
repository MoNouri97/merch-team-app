import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Circle, LatLng } from 'react-native-maps';
import { useUpdateGMS } from '~/api/gmsAPI';
import AppText from '~/components/AppText';
import { ErrorMessage, GMSPicker, SubmitBtn } from '~/components/Forms';
import { Subtitle } from '~/components/Forms/styles';
import { GMSMarker, PersonMarker } from '~/components/Map/GMSMarker';
import AppScreen from '~/components/Shared/AppScreen';
import Btn from '~/components/Shared/Btn';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';
import useLocation from '~/Helpers/useLocation';

const initial = {
	GMS: '',
	coord: undefined as { longitude: number; latitude: number } | undefined,
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
	const { mutateAsync } = useUpdateGMS();
	const [pin, setPin] = useState<LatLng>();
	const { location, refresh } = useLocation();
	let region = useRef({
		longitude: 0,
		latitude: 0,
		latitudeDelta: 0.001,
		longitudeDelta: 0.001,
	});
	useEffect(() => {
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
					mutateAsync({ id: values.GMS, ...values.coord });
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
								maxZoomLevel={18.5}
								style={{
									flex: 1,
								}}
							>
								{pin && <GMSMarker draggable coordinate={pin} text="GMS" />}
								{location && (
									<>
										<Circle
											center={location}
											radius={50}
											fillColor="rgba(78, 173, 254, 0.2)"
											strokeColor="rgba(78, 173, 254,0)"
										/>
										<PersonMarker coordinate={location} />
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
								setFieldValue('coord', location);
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
