import {Router} from "express";

import newRecord from "../controllers/newRecord";
import isAuthenticated from "../middlewares/verifyUserAccess";

const router: Router = Router();

// TODO =>
/* 
User should be able to create new entry for expense or earnings √
list recent entries 10-20 √
then filter by month, year . if only month then year is current year.
summary of complete record for each user.
monthly summary.
yearly summary.
pagination for list.
*/
router.use(isAuthenticated);
// POST at - /records
// body - {amount,creditBool,userId}
router.post("/records", newRecord);

// GET at - /records
// response shape => 10-20 recent records [...{record-row}]
router.get("/records");

// GET at - /summary
// response shape => {summary-row}
router.get("/summary");

//

export default router;
