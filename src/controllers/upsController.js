const { validationResult } = require("express-validator");


function upsController() {
  let errors = [];
  let score = 0;
  let answer = "";
  let firstNumber = "";
  let secondNumber = "";
  let operatorChoice = "";

  function getBidTypes(request, response) {
    errors = [];
    score = 0;
    const form = {
      name: "",
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
    };

    response.render("ups/bidTypes", {
      name: "",
      form,
      errors
    });
  }

  function postBidTypes(request, response) {
    const form = {
      name: request.body.quizName,
      question1: request.body.question1,
      question2: request.body.question2,
      question3: request.body.question3,
      question4: request.body.question4,
      question5: request.body.question5,
    };
    const validatorErrors = validationResult(request);
    errors = validatorErrors.array();
    if (request.body.question1 === "A. IRC") {
      score += 1;
    }
    if (request.body.question2 === "D. 802.11n") {
      score += 1;
    }
    if (request.body.question3 === "B. Datalink") {
      score += 1;
    }
    if (request.body.question4 === "D. All of the above") {
      score += 1;
    }
    if (request.body.question5 === "C. Rogue access point") {
      score += 1;
    }

    response.render("ups/bidTypes", {
      name: request.body.quizName,
      hideName: request.body.hideName,
      score,
      errors,
      form
    });
  }

  function getPilots(request, response) {
    answer = "";
    firstNumber = "";
    secondNumber = "";
    operatorChoice = "";
    response.render("ups/pilots", {
      errors,
      firstNumber,
      secondNumber,
      answer,
      operatorChoice
    });
  }

  function postPilots(request, response) {
    const validatorErrors = validationResult(request);
    errors = validatorErrors.array();
    const first = parseFloat(request.body.firstNumber);
    const second = parseFloat(request.body.secondNumber);

    answer = 0;
    if (request.body.operatorChoice === "+") {
      answer = first + second;
    }
    if (request.body.operatorChoice === "-") {
      answer = first - second;
    }
    if (request.body.operatorChoice === "*") {
      answer = first * second;
    }
    if (request.body.operatorChoice === "/") {
      answer = first / second;
    }
    response.render("ups/pilots", {
      errors,
      firstNumber: request.body.firstNumber,
      secondNumber: request.body.secondNumber,
      operatorChoice: request.body.operatorChoice,
      answer
    });
  }

  return {
    getBidTypes,
    postBidTypes,
    getPilots,
    postPilots
  };
}

module.exports = upsController;
