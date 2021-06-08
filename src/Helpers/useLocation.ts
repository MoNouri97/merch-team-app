import { useNavigation } from '@react-navigation/core';
import * as Location from 'expo-location';
import { useContext, useEffect, useState } from 'react';
import ModalContext from '~/context/ModalContext';
import { HomeStackNav } from '~/types/navigation';

const useLocation = () => {
	const [location, setLocation] =
		useState<{
			longitude: number;
			latitude: number;
		}>();
	const [error, setError] = useState<string>();
	const getLocation = async () => {
		console.log('getting location ...');

		const { granted, ios } = await Location.requestForegroundPermissionsAsync();
		const { granted: bgGranted } =
			await Location.requestBackgroundPermissionsAsync();

		if (!granted) {
			return setError('location permission is required');
		}
		console.log({ ios });

		// on ios scope must be always for geofencing
		if ((ios && ios?.scope !== 'always') || !bgGranted) {
			return setError("'always' is required");
		}
		const lastKnownPos = await Location.getCurrentPositionAsync({
			accuracy: Location.LocationAccuracy.Highest,
		});
		if (!lastKnownPos) {
			return setError("can't get location");
		}
		const {
			coords: { latitude, longitude },
		} = lastKnownPos;
		if (lastKnownPos) {
			setLocation({
				latitude,
				longitude,
			});
		}
	};
	const { showText, hide } = useContext(ModalContext)!;
	const { navigate } = useNavigation<HomeStackNav>();

	useEffect(() => {
		if (error) {
			showText(error);
			navigate('Accueil');
		}
	}, [error]);

	useEffect(() => {
		getLocation();
	}, []);

	return { error, location, refresh: getLocation };
};
export default useLocation;
