import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const useLocation = () => {
	const [location, setLocation] =
		useState<{
			longitude: number;
			latitude: number;
		}>();
	const [error, setError] = useState<string>();
	const getLocation = async () => {
		const { granted, ios } = await Location.requestForegroundPermissionsAsync();

		if (!granted) {
			return setError('location permission is required');
		}
		// on ios scope must be always for geofencing
		if (ios && ios?.scope !== 'always') {
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

	useEffect(() => {
		getLocation();
	}, []);

	return { error, location, refresh: getLocation };
};
export default useLocation;
