
const express = require("express");
const { check } = require("express-validator");

const upsController = require("../controllers/upsController");

const upsRouter = express.Router();

function router() {
  const {
    getBidTypes, postBidTypes, getPilots, postPilots
  } = upsController();

  upsRouter.route("/").get(getBidTypes);

  upsRouter.route("/bidtypes").get(getBidTypes);

  upsRouter.post("/bidtypes", [
    check("quizName").isLength({ min: 3 }).withMessage("Error: Name must be at least 3 characters."),
    check("question1").isLength({ min: 1 }).withMessage("Please select an answer for question 1."),
    check("question2").isLength({ min: 1 }).withMessage("Please select an answer for question 2."),
    check("question3").isLength({ min: 1 }).withMessage("Please select an answer for question 3."),
    check("question4").isLength({ min: 1 }).withMessage("Please select an answer for question 4."),
    check("question5").isLength({ min: 1 }).withMessage("Please select an answer for question 5."),
  ], postBidTypes);

  upsRouter.route("/pilots").get(getPilots);


  upsRouter.post("/pilots", [
    check("firstNumber").isNumeric().withMessage("First number is invalid."),
    check("secondNumber").isNumeric().withMessage("Second number is invalid."),
    check("operatorChoice").isLength({ min: 1 }).withMessage("Please select an operator.")
  ], postPilots);

  return upsRouter;
}

module.exports = router;
