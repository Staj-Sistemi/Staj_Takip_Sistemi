const express = require("express");
const indexController = require("../controllers/indexController");
const router = express.Router();


router.route("/").get(indexController.getIndexPage);
router.route("/studentlogin").get(indexController.getStudentLoginPage);
router.route("/internshiplogin").get(indexController.getInternshipLoginPage);
router.route("/loginCompany").get(indexController.getLoginCompanyPage);
router.route("/register").get(indexController.getregisterCompanyPage);

module.exports = router;