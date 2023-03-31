"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = exports.ServerMessages = void 0;
var ServerMessages;
(function (ServerMessages) {
    ServerMessages["server_error"] = "An error occured on our side, Try again later";
    ServerMessages["service_unavailable"] = "Service is Currently Unavailable, Try again later";
})(ServerMessages = exports.ServerMessages || (exports.ServerMessages = {}));
var Messages;
(function (Messages) {
    Messages["required_field"] = "Required fields cannot be empty";
    Messages["name_required"] = "Name is required";
    Messages["fields_cannot_empty"] = "email, password cannot be empty";
    Messages["account_already_exists"] = "An account with this email already exists, login or use diffenrent email";
    Messages["registerd_success"] = "Congratulations, Your account has been created";
    Messages["invalid_combination"] = "Email or password was not correct";
    Messages["login_success"] = "Welcome back! You have successfully logged in";
    Messages["logout_success"] = "You have successfully logged out!";
    Messages["token_required"] = "Authentication token is required";
    Messages["token_invalid"] = "Authentication token is invalid";
    Messages["access_granted"] = "You now have access";
    Messages["not_authenticated"] = "You need to be logged in to perform this action";
    Messages["token_expired"] = "Authetication Token is expired or invalid";
    Messages["not_found"] = "cannot find what you are looking for";
    Messages["account_deleted"] = "Your account has been deleted and all the associated data will be removed from our servers.";
    Messages["account_not_found"] = "We do not recognize your email or password on our systems";
})(Messages = exports.Messages || (exports.Messages = {}));
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
