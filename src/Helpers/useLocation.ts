import { useNavigation } from '@react-navigation/core';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { useModal } from '~/Helpers/useModal';
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
	const { show } = useModal();
	const { navigate } = useNavigation<HomeStackNav>();

	useEffect(() => {
		if (error) {
			show({ content: error });
			navigate('Accueil');
		}
	}, [error]);

	useEffect(() => {
		getLocation();
	}, []);

	return { error, location, refresh: getLocation };
};
export default useLocation;
