export type ChatMessageModel = {
	id: number;
	content: string;
	senderId: number;
	date: string;
};

export type ChatMessagePayload = {
	sender: number;
	content: string;
};
