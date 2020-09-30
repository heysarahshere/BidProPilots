const { validationResult } = require("express-validator");

function jetsuiteController() {
  let errors = [];
  let score = 0;

  function getBidTypes(request, response) {
    score = 0;
    response.render("jetsuite/bidTypes", {
      name: ""
    });
  }

  function postBidTypes(request, response) {
    // const { question1 } = request.body.question1;
    if (request.body.question1 === "correct") {
      score += 1;
    }
    if (request.body.question2 === "correct") {
      score += 1;
    }
    if (request.body.question3 === "correct") {
      score += 1;
    }
    if (request.body.question4 === "correct") {
      score += 1;
    }
    if (request.body.question5 === "correct") {
      score += 1;
    }
    response.render("jetsuite/bidTypes", {
      name: request.body.quizName,
      hideName: request.body.hideName,
      score
    });
  }


  function getPilots(request, response) {
    errors = [];
    response.render("jetsuite/pilots", {
      name: "",
      numOfTimes: "",
      errors
    });
  }

  function postPilots(request, response) {
    const validatorErrors = validationResult(request);
    errors = validatorErrors.array();

    response.render("jetsuite/pilots", {
      name: request.body.name,
      numOfTimes: request.body.numOfTimes,
      errors
    });
  }

  return {
    getBidTypes,
    getPilots,
    postBidTypes,
    postPilots
  };
}

module.exports = jetsuiteController;
