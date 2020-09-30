
const express = require("express");
const { check } = require("express-validator");

const jetsuiteController = require("../controllers/jetsuiteController");


const jetsuiteRouter = express.Router();

function router() {
  const {
    getBidTypes, getPilots, postBidTypes, postPilots
  } = jetsuiteController();

  jetsuiteRouter.route("/").get(getBidTypes);

  jetsuiteRouter.route("/bidtypes").get(getBidTypes).post(postBidTypes);

  jetsuiteRouter.route("/pilots").get(getPilots);

  jetsuiteRouter.post("/pilots", [
    check("name").not().isEmpty().withMessage("You must enter a name."),
    check("name").not().isLength({ min: 2, max: 4 }).withMessage("You must enter at least 5 characters."),
    check("name").isLength({ max: 25 }).withMessage("You can not enter a name with more than 25 characters."),
    check("numOfTimes").isNumeric({ max: 999 }).withMessage("You must enter a number.")
  ], postPilots);

  return jetsuiteRouter;
}

module.exports = router;
