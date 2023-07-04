const { Router } = require("express");
const router = Router();
const controller = require("./controller");

router.get("/", controller.getCandidates);
router.post("/", controller.addCandidate);
router.get("/:id", controller.getCandidatesById);
router.delete("/:id", controller.deleteCandidate);
router.put("/:id", controller.updateCandidate);
module.exports = router;
