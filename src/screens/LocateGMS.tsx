import { Formik } from 'formik';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import AppText from '~/components/AppText';
import { GMSPicker, SubmitBtn } from '~/components/Forms';
import { Subtitle } from '~/components/Forms/styles';
import AppScreen from '~/components/Shared/AppScreen';
import Btn from '~/components/Shared/Btn';
import styled from '~/config/styled-components';

const initial = {};
const validation = {};

// const getLocation = async () => {
// 	let location = await Location.getCurrentPositionAsync({});
// 	return location;
// };
const LocateGMS: React.FC = () => {
	return (
		<AppScreen navbar>
			<Formik
				initialValues={initial}
				validationSchema={validation}
				onSubmit={() => {}}
			>
				{() => (
					<>
						<GMSPicker />
						<Subtitle>Détails</Subtitle>

						<AppText type="label">Carte</AppText>
						<Map>
							<MapView
								showsMyLocationButton
								initialRegion={{
									latitude: 35.8146462228069,
									latitudeDelta: 0.0012900715168910892,
									longitude: 10.640393067151308,
									longitudeDelta: 0.0007533654570579529,
								}}
								style={{
									flex: 1,
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
						</Map>
						<Btn>Utiliser L'emplacement Actuel</Btn>
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
