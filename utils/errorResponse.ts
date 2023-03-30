import {Messages, ServerMessages} from "../types/messages/message.type";

interface ErrorResponse {
	success?: boolean;
	message: Messages | ServerMessages;
	quote?: string;
}

export default function responseMessage(options: ErrorResponse) {
	const {message, success = false, quote} = options;
	let response: ErrorResponse = {success, message};
	if (quote) {
		response.quote = quote;
	}
	return response;
}
