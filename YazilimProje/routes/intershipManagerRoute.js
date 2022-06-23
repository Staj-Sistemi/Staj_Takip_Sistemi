const express = require("express");
const intershipManagerController = require("../controllers/intershipManagerController");

const router = express.Router();

router.route("/").get(intershipManagerController.getintershipManagerPage);
router.route("/studentlist").get(intershipManagerController.getStudentListPage);
router.route("/studentadd").get(intershipManagerController.getStudentAddPage);
router.route("/approvedintership").get(intershipManagerController.getapprovedIntershipPage);
router.route("/companylist").get(intershipManagerController.getcompanyListPage);
router.route("/studentedit/:ID").get(intershipManagerController.getstudentEditPage);
router.route("/studentintership").get(intershipManagerController.getstudentIntershipPage);
router.route("/intershipinformation").get(intershipManagerController.getintershipInformationPage);
router.route("/approve/:firma_ID").get(intershipManagerController.getApprove);
router.route("/delete/:firma_ID").get(intershipManagerController.getDelete);
router.route("/studentadd").post(intershipManagerController.addStudent);
router.route("/updatestudent/:ogrenci_ID").post(intershipManagerController.sendStudent);
router.route("/studentdelete/:ogrenci_ID").get(intershipManagerController.deleteStudent);

module.exports = router;