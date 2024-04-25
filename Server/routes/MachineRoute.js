import express from "express";
import {
  getMachines,
  getMachineById,
  createMachine,
  updateMachine,
  deleteMachine,
} from "../controllers/Machines.js";
import {
  getWires,
  getWireById,
  createWire,
  updateWire,
  deleteWire,
} from "../controllers/Wires.js";
import {
  getWeldings,
  getWeldingById,
  createWelding,
  updateWelding,
  deleteWelding,
} from "../controllers/Weldings.js";
import {
  getShrinkSleeves,
  getShrinkSleeveById,
  createShrinkSleeve,
  updateShrinkSleeve,
  deleteShrinkSleeve,
} from "../controllers/ShrinkSleeves.js";
import {
  getRingTerminals,
  getRingTerminalById,
  createRingTerminal,
  updateRingTerminal,
  deleteRingTerminal,
} from "../controllers/RingTerminals.js";
import { 
  createGlue, 
  deleteGlue, 
  getGlueById, 
  getGlues, 
  updateGlue }from "../controllers/glue.js";
  import { createPf } from '../controllers/pf.js';





// Multer configuration

import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();



router.get("/machines", verifyUser, getMachines);
router.get("/machines/:id", verifyUser, getMachineById);
router.post("/machines", verifyUser, createMachine);
router.patch("/machines/:id", verifyUser, updateMachine);
router.delete("/machines/:id", verifyUser, deleteMachine);

router.get("/wires", verifyUser, getWires);
router.get("/wires/:id", verifyUser, getWireById);
router.post("/wires", verifyUser, createWire);
router.patch("/wires/:id", verifyUser, updateWire);
router.delete("/wires/:id", verifyUser, deleteWire);

router.get("/weldings", verifyUser, getWeldings);
router.get("/weldings/:id", verifyUser, getWeldingById);
router.post("/weldings", verifyUser, createWelding);
router.patch("/weldings/:id", verifyUser, updateWelding);
router.delete("/weldings/:id", verifyUser, deleteWelding);

router.get("/shrinksleeves", verifyUser, getShrinkSleeves);
router.get("/shrinksleeves/:id", verifyUser, getShrinkSleeveById);
router.post("/shrinksleeves", verifyUser, createShrinkSleeve);
router.patch("/shrinksleeves/:id", verifyUser, updateShrinkSleeve);
router.delete("/shrinksleeves/:id", verifyUser, deleteShrinkSleeve);

router.get("/ringterminals", verifyUser, getRingTerminals);
router.get("/ringterminals/:id", verifyUser, getRingTerminalById);
router.post("/ringterminals", verifyUser, createRingTerminal);
router.patch("/ringterminals/:id", verifyUser, updateRingTerminal);
router.delete("/ringterminals/:id", verifyUser, deleteRingTerminal);


router.get("/glues", verifyUser, getGlues);
router.get("/glues/:id", verifyUser, getGlueById);
router.post("/glues", verifyUser, createGlue);
router.patch("/glues/:id", verifyUser, updateGlue);
router.delete("/glues/:id", verifyUser, deleteGlue);


router.post('/pf', createPf);


export default router;
