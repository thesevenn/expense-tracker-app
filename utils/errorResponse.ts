import {Messages, ServerMessages} from "../types/messages/message.type";

interface ErrorResponse {
	success?: boolean;
	message: Messages | ServerMessages;
	quote?: string;
}

export default function responseMessage(options: ErrorResponse) {
	const {message, quote} = options;
	const success = options.success || false;

	let response: ErrorResponse = {success, message};
	if (quote) {
		response.quote = quote;
	}
	return response;
}
