import {Router} from "express";

const router: Router = Router();

import login from "../controllers/login";
import logout from "../controllers/logout";
import signup from "../controllers/signup";
import newAccess from "../controllers/newAccess";

// TODO =>
/* 
create new user with email and password or (email only login) = w/ JWT.
store that user in db.
setup login route,
logout route,
generate new access for refresh valid refresh token
*/

// GET at - /logout
//  logs user out and invadlidates the access-token
router.get("/logout", logout);

// POST at - /login
//  logins existing user using email login w/ jwt or email and password login.
//  body contains - email and password(if pass implemeneted).
router.post("/login", login);

// POST at - /sign-up
//  registers new user with email.
//  body contains - email, dob, username, pass(?), store status
router.post("/sign-up", signup);

// GET at - /revalidate
//  generates a new access token for given valid refresh token.
//  body contains - refresh token.
router.get("/new-access", newAccess);

export default router;
