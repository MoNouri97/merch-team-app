import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFormikContext } from 'formik';
import React, { useContext, useMemo, useRef } from 'react';
import { Alert, Platform, ScrollView } from 'react-native';
import { ThemeContext } from 'styled-components';
import styled from '~/config/styled-components';
import InputBase from './InputBase';

interface Props {
	name: string;
	label?: string;
	multiple?: boolean;
}

const ImageInput: React.FC<Props> = ({ name, label, multiple = false }) => {
	const theme = useContext(ThemeContext);

	const { setFieldValue, values } = useFormikContext();
	const scrollRef = useRef<ScrollView>(null);
	const images: string[] = (values as any)[name];

	const displayedLabel = useMemo(() => {
		if (multiple) {
			return `${label ?? name} ( ${images.length} sélectionnées)`;
		}
		return label ?? name;
	}, [label, name, images]);

	const deleteImage = (idx: number) => {
		setFieldValue(
			name,
			images.filter((_, i) => i !== idx)
		);
	};
	const addImage = (uri: string) => {
		setFieldValue(name, [...images, uri]);
	};
	const pickImage = async (idx?: number) => {
		if (idx !== undefined && images[idx]) {
			Alert.alert('Supprimer', 'Supprimer cette image ?', [
				{
					text: 'Oui',
					onPress: () => {
						deleteImage(idx);
					},
				},
				{ text: 'Non' },
			]);
			return;
		}
		if (Platform.OS !== 'web') {
			const {
				status,
			} = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert('Permission requise');
				return;
			}
			const {
				status: camStatus,
			} = await ImagePicker.requestCameraPermissionsAsync();
			if (camStatus !== 'granted') {
				Alert.alert('Permission requise');
				return;
			}
		}

		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			// allowsEditing: true,
			// aspect: [4, 3],
			quality: 0.8,
		});
		if (result.cancelled) {
			return;
		}
		addImage(result.uri);
	};

	return (
		<InputBase container={false} label={displayedLabel} name={name}>
			<ScrollView
				horizontal
				// eslint-disable-next-line react-native/no-inline-styles
				contentContainerStyle={{ flexGrow: 1 }}
				ref={scrollRef}
				onContentSizeChange={() => {
					scrollRef.current?.scrollToEnd();
				}}
			>
				{images?.map((img, i) => (
					<Touchable key={img} onPress={() => pickImage(i)}>
						<Image source={{ uri: img }} />
					</Touchable>
				))}
				{(multiple || images.length < 1) && (
					<Touchable onPress={() => pickImage()}>
						<Feather name="upload" size={50} color={theme.colors.gray[3]} />
					</Touchable>
				)}
			</ScrollView>
		</InputBase>
	);
};

const Touchable = styled.TouchableOpacity`
	height: 200px;
	width: 200px;
	border-radius: ${({ theme }) => theme.borderRadius};
	/* width: 48%; */
	flex-grow: 1;
	align-items: center;
	justify-content: center;
	margin: 5px;
	/* margin: 1%; */
	background: ${({ theme }) => theme.colors.gray[2]};
	overflow: hidden;
`;
const Image = styled.Image`
	width: 200px;
	height: 200px;
`;
export default ImageInput;
