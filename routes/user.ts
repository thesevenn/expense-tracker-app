import {Router} from "express";

import verifyUserAccess from "../middlewares/verifyUserAccess";
import newRecord from "../controllers/newRecord";
import listRecords from "../controllers/listRecords";
import summary from "../controllers/summary";
import removeAccount from "../controllers/removeAccount";

const router: Router = Router();

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

// TODO => add description in new records
// csrf prevent
// validation of email and password and text counts of description
