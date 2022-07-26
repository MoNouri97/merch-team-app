import { Feather } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';
import { ChatMessageModel } from '~/types/models/ChatMessage';

type ChatMessageProps = ChatMessageModel & {
	mine: boolean;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ content, mine }) => {
	// FIXME add document check
	const document = useMemo(() => false, []);

	return (
		<Container mine={mine}>
			{document && mine && <Icon mine={mine} size={20} name="arrow-down" />}
			<MSG {...{ document, mine }}>
				{document && <InlineIcon mine={mine} size={20} name="file" />}
				<MSGText
					numberOfLines={50}
					color={mine ? 'light' : 'dark'}
					mine={mine}
					document={document}
					size={18}
				>
					{content}
				</MSGText>
			</MSG>
			{document && !mine && <Icon mine={mine} size={20} name="arrow-down" />}
		</Container>
	);
};

const Container = styled.View<{ mine: boolean }>`
	flex-direction: row;
	align-self: ${({ mine }) => (mine ? 'flex-end' : 'flex-start')};
	margin-bottom: 2px;
	align-items: center;
`;
const MSG = styled.View<{ mine: boolean; document: boolean }>`
	max-width: 80%;
	overflow: hidden;
	padding: 15px 20px;
	flex-direction: row;
	align-items: center;
	text-decoration: ${({ document }) => (document ? 'underline' : 'none')};
	border-radius: 20px;
	background: ${({ theme, mine }) =>
		mine ? theme.colors.primary : theme.colors.gray[2]};
`;
const MSGText = styled(AppText)<{ mine: boolean; document: boolean }>`
	text-decoration: ${({ document }) => (document ? 'underline' : 'none')};
	border-radius: 20px;
`;
const Icon = styled(Feather)<{ mine: boolean }>`
	margin-horizontal: 5px;
	border-radius: 100px;
	padding: 10px;
	background: ${({ theme, mine }) =>
		mine ? theme.colors.primary : theme.colors.gray[2]};
	color: ${({ theme, mine }) =>
		!mine ? theme.colors.primary : theme.colors.gray[2]};
`;
const InlineIcon = styled(Feather)<{ mine: boolean }>`
	margin-horizontal: 5px;
	background: ${({ theme, mine }) =>
		mine ? theme.colors.primary : theme.colors.gray[2]};
	color: ${({ theme, mine }) =>
		!mine ? theme.colors.primary : theme.colors.gray[2]};
`;
export default React.memo(ChatMessage);
