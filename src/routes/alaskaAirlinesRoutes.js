
const express = require("express");
const csrf = require("csurf");
// const session = require("express-session");
// { cookie: true }
const csrfProtection = csrf();

const alaskaAirlinesController = require("../controllers/alaskaAirlinesController");

const alaskaAirlinesRouter = express.Router();
alaskaAirlinesRouter.use(csrfProtection);

function router() {
  const {
    getBidTypes, getAddBidType, postAddBidType, getDeleteBidType, putImportBidType,
    putCancelImportBidType, postDeleteBidtype, getApiBidTypes,
    getPilots, postPilots, putStatusPilot, putCancelStatusPilot, getAddPilot, postAddPilot,
    getDeletePilot, postDeletePilot
  } = alaskaAirlinesController();

  alaskaAirlinesRouter.route("/").get(getBidTypes);
  alaskaAirlinesRouter.route("/bidtypes").get(getBidTypes);
  alaskaAirlinesRouter.route("/bidtypes/api").get(getApiBidTypes);
  alaskaAirlinesRouter.route("/bidtype/add").get(getAddBidType).post(postAddBidType);
  alaskaAirlinesRouter.route("/bidtype/import/:bidTypeId").get(putImportBidType);
  alaskaAirlinesRouter.route("/bidtype/import/:bidTypeId/cancel").get(putCancelImportBidType);
  alaskaAirlinesRouter.route("/bidtype/delete/:bidTypeId").get(getDeleteBidType);
  alaskaAirlinesRouter.route("/bidtype/delete").post(postDeleteBidtype);

  alaskaAirlinesRouter.route("/pilots").get(getPilots).post(postPilots);
  alaskaAirlinesRouter.route("/pilot/add").get(getAddPilot).post(postAddPilot);
  alaskaAirlinesRouter.route("/pilot/status/:pilotId").get(putStatusPilot);
  alaskaAirlinesRouter.route("/pilot/status/:pilotId/cancel").get(putCancelStatusPilot);
  alaskaAirlinesRouter.route("/pilot/delete/:pilotId").get(getDeletePilot);
  alaskaAirlinesRouter.route("/pilot/delete").post(postDeletePilot);

  return alaskaAirlinesRouter;
}

module.exports = router;
