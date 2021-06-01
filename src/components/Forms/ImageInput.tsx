import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useField } from 'formik';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { Alert, Platform, ScrollView } from 'react-native';
import { ThemeContext } from 'styled-components';
import styled from '~/config/styled-components';
import { Action } from '~/types/data';
import { FileType } from '~/types/models/formData/FileType';
import AppText from '../AppText';
import ActionList from '../Shared/ActionList';
import BottomSheet from '../Shared/BottomSheet';
import InputBase from './InputBase';

interface Props {
	name: string;
	label?: string;
	multiple?: boolean;
}

const ImageInput: React.FC<Props> = ({ name, label, multiple = false }) => {
	const theme = useContext(ThemeContext);
	const [modal, setModal] = useState(false);
	const [{ value }, , { setValue, setTouched }] = useField<FileType[]>(name);
	const scrollRef = useRef<ScrollView>(null);
	const images: FileType[] = value ?? [];

	const displayedLabel = useMemo(() => {
		if (multiple) {
			return `${label ?? name} ( ${images.length} sélectionnées)`;
		}
		return label ?? name;
	}, [label, name, images]);

	const deleteImage = (idx: number) => {
		if (images.length <= 1) {
			setValue([], true);
			return;
		}
		setValue(
			images.filter((_, i) => i !== idx),
			true
		);
	};

	const addImage = (uri: string) => {
		const fileNameSuffix = multiple ? `.${images.length}` : '';
		const image: FileType = {
			uri: uri,
			type: 'image/png',
			name: `${name}${fileNameSuffix}`,
		};
		// const
		setValue([...images, image], true);
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
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert('Permission requise');
				return;
			}
			const { status: camStatus } =
				await ImagePicker.requestCameraPermissionsAsync();
			if (camStatus !== 'granted') {
				Alert.alert('Permission requise');
				return;
			}
		}
		setModal(true);
	};

	const imageFromGallery = React.useCallback(async () => {
		setModal(false);
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0.8,
		});
		if (!result.cancelled) {
			addImage(result.uri);
		}
	}, [addImage, setModal]);

	const imageFromCamera = React.useCallback(async () => {
		setModal(false);
		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0.5,
		});
		if (!result.cancelled) {
			addImage(result.uri);
		}
	}, [addImage, setModal]);

	const closeModal = React.useCallback(() => {
		setModal(false);
		setTouched(true);
	}, [setModal]);

	const ACTIONS: Action[] = useMemo(
		() => [
			{ title: 'Camera', onPress: imageFromCamera, icon: 'camera' },
			{ title: 'Gallerie', onPress: imageFromGallery, icon: 'image' },
		],
		[imageFromCamera, imageFromGallery]
	);
	return (
		<InputBase container={false} label={displayedLabel} name={name}>
			<BottomSheet
				modalProps={{
					animationType: 'fade',
					visible: modal,
					onRequestClose: closeModal,
				}}
			>
				<ActionList actions={ACTIONS} />
			</BottomSheet>
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
					<Touchable key={img.uri} onPress={() => pickImage(i)}>
						<Image source={{ uri: img.uri }} />
					</Touchable>
				))}
				{(multiple || images.length < 1) && (
					<Touchable onPress={() => pickImage()}>
						<Feather name="upload" size={50} color={theme.colors.gray[3]} />
						<AppText color="dimmed">Choisir une Image</AppText>
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
