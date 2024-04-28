import express from "express";
import {
    createShrinkForm,
} from "../controllers/Forms.js";

import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();



// router.get("/machines", verifyUser, getMachines);
// router.get("/machines/:id", verifyUser, getMachineById);
router.post("/shrinkform", verifyUser, createShrinkForm);
// router.patch("/machines/:id", verifyUser, updateMachine);
// router.delete("/machines/:id", verifyUser, deleteMachine);


export default router;
