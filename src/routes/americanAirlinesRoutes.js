/*
const express = require("express");

const router = express.Router();

router.route("/").get((request, response) => {
  response.send("Hello AA from AA Router");
});

module.exports = router;
*/

const express = require("express");
const { check } = require("express-validator");

const americanAirlinesController = require("../controllers/americanAirlinesController");

const americanAirlinesRouter = express.Router();

function router() {
  const { getBidTypes, getPilots, postBidTypes } = americanAirlinesController();

  americanAirlinesRouter.route("/").get(getBidTypes);

  americanAirlinesRouter.route("/bidtypes").get(getBidTypes);

  americanAirlinesRouter.post("/bidtypes", [
    check("helloName").isLength({ min: 3 }).withMessage("Error: Name must be at least 3 characters."),
    check("numOfTimes").isNumeric().withMessage("Please enter a valid number.")
  ], postBidTypes);
  americanAirlinesRouter.route("/pilots").get(getPilots);

  return americanAirlinesRouter;
}

module.exports = router;
