const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();

router.route("/").get(studentController.getStudentPage);
router.route("/profile").get(studentController.getProfilePage);
router.route("/educationinformation").get(studentController.getEducationInformationPage);
router.route("/project").get(studentController.getProjectPage);
router.route("/companies").get(studentController.getCompaniesPage);
router.route("/approvedappeal").get(studentController.getApprovedAppealPage);
router.route("/expectedappeal").get(studentController.getExpectedAppealPage);
router.route("/rejectedappeal").get(studentController.getRejectedAppealPage);
router.route("/internshipsnotebook").get(studentController.getInternshipsNotebookPage);
router.route("/reportadd").get(studentController.getReportAddPage);
router.route("/reportedit/:staj_defteri_ID").get(studentController.getReportEditPage);
router.route("/result").get(studentController.getResultPage);
router.route("/participation").get(studentController.getParticipationPage);
router.route("/companyinformation/:id").get(studentController.getCompanyInformationPage);
router.route("/updateproject").post(studentController.sendUpdateProject);
router.route("/updateprofile").post(studentController.sendUpdateProfile);
router.route("/apply/:firma/:basvuru/:ogrenci").get(studentController.getApply);
router.route("/delete/:basvuru_ID").get(studentController.getDelete);
router.route("/approve/:basvuru_ID/:firma_ID/:ogrenci_ID").get(studentController.getApprove);
router.route("/sendreport/:ID").post(studentController.sendReport);
router.route("/deletereport/:staj_defteri_ID").get(studentController.getDeleteReport);
router.route("/updatereport/:staj_defteri_ID").post(studentController.sendUpdateReport);

module.exports = router;
