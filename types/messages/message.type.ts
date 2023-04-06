export enum ServerMessages {
	server_error = "An error occured on our side, Try again later",
	service_unavailable = "Service is Currently Unavailable, Try again later",
}

export enum Messages {
	required_field = "Required fields cannot be empty",
	name_required = "Name is required",
	fields_cannot_empty = "email, password cannot be empty",
	account_already_exists = "An account with this email already exists, login or use diffenrent email",
	registerd_success = "Congratulations, Your account has been created",
	invalid_combination = "Email or password was not correct",
	login_success = "Welcome back! You have successfully logged in",
	logout_success = "You have successfully logged out!",
	token_required = "Authentication token is required",
	token_invalid = "Authentication token is invalid",
	access_granted = "You now have access",
	not_authenticated = "You need to be logged in to perform this action",
	token_expired = "Authetication Token is expired or invalid",
	not_found = "cannot find what you are looking for",
	account_deleted = "Your account has been deleted and all the associated data will be removed from our servers.",
	account_not_found = "We do not recognize your email or password on our systems",
	invalid_input = "Please provide right value for the field",
}

/* 
types of messages = 
1. Name is required
2. email password cannot be empty => required fields cannot be empty.
3. email already in use => account already exists
4. user registerd successfully - success 
5. An error occured on our side, try again later.
6. invalid email or password combination.
7. succesfull login
8. user logged out
9. token required
10. refresh token is invalid
11. access provided
12. Not authorized => user not authenticated
13. token is not valid or expired
14. invalid credentials
15. cannot find what you are looking for 404
16. account deleted, all associated data removed, sad loosing you
17. you are not authorized to perform this action
18. We do not recognize your email or password on our systems
*/
