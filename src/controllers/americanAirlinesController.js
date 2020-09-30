const { validationResult } = require("express-validator");

function americanAirlinesController() {
  let errors = [];


  // ***********************************
  // BidTypes
  // ***********************************
  function getBidTypes(request, response) {
    errors = [];
    response.render("american-airlines/bidTypes", {
      name: "",
      numOfTimes: 0,
      errors
    });
  }

  function postBidTypes(request, response) {
    const validatorErrors = validationResult(request);
    errors = validatorErrors.array();
    response.render("american-airlines/bidTypes", {
      name: request.body.helloName,
      numOfTimes: request.body.numOfTimes,
      errors
    });
  }

  // ***********************************
  // Pilots
  // ***********************************
  function getPilots(request, response) {
    response.render("american-airlines/pilots");
  }

  return {
    getBidTypes,
    getPilots,
    postBidTypes
  };
}

module.exports = americanAirlinesController;
