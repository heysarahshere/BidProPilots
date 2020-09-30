const sql = require("mssql");
const dateFormat = require("dateformat");

function alaskaAirlinesController() {
  // ***********************************
  // BidTypes
  // ***********************************

  async function getBidTypeData() {
    const request = new sql.Request();
    const bidTypes = [];

    const result = await request.query("select * from dbo.ASBidTypes");
    result.recordset.forEach((_bidType) => {
      const bidType = {
        bidTypeId: _bidType.BidTypeId,
        fleet: _bidType.Fleet,
        seat: _bidType.Seat,
        domicile: _bidType.Domicile,
        status: _bidType.Status === 0 ? "CURRENT" : "IMPORTING",
        imported: dateFormat(_bidType.Imported, "mm.dd.yy"),
      };
      bidTypes.push(bidType);
    });
    return bidTypes;
  }


  function getBidTypes(req, res) {
    (async () => {
      const bidTypes = await getBidTypeData();
      res.render("alaska-airlines/bidTypes", { bidTypes });
    })();
  }


  function getApiBidTypes(req, res) {
    (async () => {
      const bidTypes = await getBidTypeData();
      res.json({ bidTypes });
    })();
  }

  function getAddBidType(req, res) {
    res.render("alaska-airlines/add-bidtype", { csrftoken: req.csrfToken() });
  }

  function postAddBidType(req, res) {
    (async () => {
      const request = new sql.Request();
      await request
        .input("fleet", sql.NVarChar, req.body.fleetInput)
        .input("seat", sql.NVarChar, req.body.seatInput)
        .input("domicile", sql.NVarChar, req.body.domicileInput)
        .query(
          "insert into [dbo].[ASBidTypes](Fleet, Seat, Domicile, Status, Imported) values(@fleet, @seat, @domicile, 1, GETDATE());"
        );


      res.redirect("/alaska-airlines/bidTypes");
    })();
  }

  function getDeleteBidType(req, res) {
    (async () => {
      const request = new sql.Request();
      const bidTypeQuery = await request
        .input("id", sql.Int, req.params.bidTypeId)
        .query("select * from [ASBidTypes] where BidTypeId=@id");

      const bidType = bidTypeQuery.recordset[0];

      res.render("alaska-airlines/delete-bidtype", {
        csrftoken: req.csrfToken(),
        bidTypeId: bidType.BidTypeId,
        fleet: bidType.Fleet,
        seat: bidType.Seat,
        domicile: bidType.Domicile,
        imported: bidType.Imported,
        status: bidType.Status
      });
    })();
  }

  function postDeleteBidtype(req, res) {
    (async () => {
      const request = new sql.Request();
      await request
        .input("bidTypeId", sql.Int, req.body.bidTypeId)
        .query("delete from dbo.ASBidTypes where BidTypeId=@bidTypeId");
      res.redirect("/alaska-airlines/bidTypes");
    })();
  }

  function putImportBidType(req, res) {
    (async () => {
      const request = new sql.Request();
      await request
        .input("bidTypeId", sql.Int, req.params.bidTypeId)
        .query("update dbo.ASBidTypes set status=1 where BidTypeId=@bidTypeId");
      res.redirect("/alaska-airlines/bidTypes");
    })();
  }

  function putCancelImportBidType(req, res) {
    (async () => {
      const request = new sql.Request();
      await request
        .input("bidTypeId", sql.Int, req.params.bidTypeId)
        .query("update dbo.ASBidTypes set status=0 where BidTypeId=@bidTypeId");
      res.redirect("/alaska-airlines/bidTypes");
    })();
  }

  // ***********************************
  // Pilots
  // ***********************************

  function getPilots(req, res) {
    (async () => {
      const request = new sql.Request();
      const pilots = [];

      const result = await request.query("select * from dbo.ASPilots");
      result.recordset.forEach((_pilot) => {
        const pilot = {
          pilotId: _pilot.PilotId,
          fleet: _pilot.Fleet,
          seat: _pilot.Seat,
          domicile: _pilot.Domicile,
          status: _pilot.Status === 1 ? "ACTIVE" : "INACTIVE",
          hireDate: dateFormat(_pilot.HireDate, "mm.dd.yy"),
          email: _pilot.Email,
          crewId: _pilot.CrewId,
          firstName: _pilot.FirstName,
          lastName: _pilot.LastName,
        };
        pilots.push(pilot);
      });
      res.render("alaska-airlines/pilots", { pilots });
    })();
  }

  function postPilots(request, response) {
    response.render("alaska-airlines/pilots", {});
  }

  function putStatusPilot(req, res) {
    (async () => {
      const request = new sql.Request();
      await request
        .input("pilotId", sql.Int, req.params.pilotId)
        .query("update dbo.ASPilots set status=1 where PilotId=@pilotId");

      res.redirect(307, "/alaska-airlines/pilots");
    })();
  }

  function putCancelStatusPilot(req, res) {
    (async () => {
      const request = new sql.Request();
      await request
        .input("pilotId", sql.Int, req.params.pilotId)
        .query("update dbo.ASPilots set status=0 where PilotId=@pilotId");

      res.redirect("/alaska-airlines/pilots");
    })();
  }

  function getAddPilot(req, res) {
    res.render("alaska-airlines/add-pilot", { csrftoken: req.csrfToken() });
  }

  function postAddPilot(req, res) {
    (async () => {
      const request = new sql.Request();
      await request
        .input("firstName", sql.NVarChar, req.body.firstNameInput)
        .input("lastName", sql.NVarChar, req.body.lastNameInput)
        .input("email", sql.NVarChar, req.body.emailInput)
        .input("crewId", sql.NVarChar, req.body.crewIdInput)
        .input("hireDate", sql.NVarChar, req.body.hireDateInput)
        .input("fleet", sql.NVarChar, req.body.fleetInput)
        .input("seat", sql.NVarChar, req.body.seatInput)
        .input("domicile", sql.NVarChar, req.body.domicileInput)
        .query(
          "insert into [dbo].[ASPilots](FirstName, LastName, Email, CrewId, Fleet, Seat, Domicile, Status, HireDate) values(@firstName, @lastName, @email, @crewId, @fleet, @seat, @domicile, 1, GETDATE());"
        );

      res.redirect("/alaska-airlines/pilots");
    })();
  }

  function getDeletePilot(req, res) {
    (async () => {
      const request = new sql.Request();
      const pilotQuery = await request
        .input("id", sql.Int, req.params.pilotId)
        .query("select * from [ASPilots] where PilotId=@id");

      const pilot = pilotQuery.recordset[0];

      res.render("alaska-airlines/delete-pilot", {
        csrftoken: req.csrfToken(),
        pilotId: pilot.PilotId,
        firstName: pilot.FirstName,
        lastName: pilot.LastName,
        email: pilot.Email,
        crewId: pilot.CrewId,
        fleet: pilot.Fleet,
        seat: pilot.Seat,
        domicile: pilot.Domicile,
        status: pilot.Status === 1 ? "ACTIVE" : "INACTIVE",
        hireDate: dateFormat(pilot.HireDate, "mm.dd.yy"),
      });
    })();
  }

  function postDeletePilot(req, res) {
    (async () => {
      const request = new sql.Request();
      await request
        .input("pilotId", sql.Int, req.body.pilotId)
        .query("delete from [ASPilots] where PilotId=@pilotId");
      res.redirect("/alaska-airlines/pilots");
    })();
  }


  return {
    getBidTypes,
    getApiBidTypes,
    getAddBidType,
    postAddBidType,
    getDeleteBidType,
    postDeleteBidtype,
    putImportBidType,
    putCancelImportBidType,
    getPilots,
    postPilots,
    getAddPilot,
    postAddPilot,
    putStatusPilot,
    putCancelStatusPilot,
    getDeletePilot,
    postDeletePilot
  };
}

module.exports = alaskaAirlinesController;
