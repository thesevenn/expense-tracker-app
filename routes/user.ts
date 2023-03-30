import {Router} from "express";

import verifyUserAccess from "../middlewares/verifyUserAccess";
import newRecord from "../controllers/newRecord";
import listRecords from "../controllers/listRecords";
import summary from "../controllers/summary";
import removeAccount from "../controllers/removeAccount";

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

// auth middleware
router.use(verifyUserAccess);

// POST at - /records
// body - {amount,creditBool,userId}
router.route("/records").post(newRecord).get(listRecords);

// GET at - /records
// response shape => 10-20 recent records [...{record-row}]
// router.get("/records", listRecords);

// GET at - /summary
// response shape => {summary-row}
router.get("/summary", summary);

router.delete("/account", removeAccount);
//

export default router;
