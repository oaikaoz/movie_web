var express = require("express");
var router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.index);
router.get("/:id", movieController.show);
router.post("/", movieController.insert);
router.put("/:id", movieController.update);
router.delete("/:id", movieController.destroy);

module.exports = router;
