const express = require("express");
const companyController = require("../controllers/companyController");
const router = express.Router();

router.route("/").get(companyController.getCompanyPage);
router.route("/applicant/:staj_ID").get(companyController.getApplicantPage);
router.route("/certificate").get(companyController.getCertificatePage);
router.route("/evaluation").get(companyController.getEvaluationPage);
router.route("/internshipBook").get(companyController.getInternshipBookPage);
router.route("/applicant/studentReview/:staj_ID/:ogrenci_ID").get(companyController.getStudentReviewPage);
router.route("/internshipCreate").get(companyController.getInternshipCreatePage);
router.route("/internships").get(companyController.getInternshipsPage);
router.route("/sendinternship").post(companyController.sendinternship);
router.route("/deleteinternships/:staj_ID").get(companyController.getDeleteInternships);
router.route("/internshipview/:staj_ID").get(companyController.getInternshipView);
router.route("/approved/:staj_ID").get(companyController.getApprovedPage);
router.route("/approved/certificate/:staj_ID/:ogrenci_ID").get(companyController.getCertificatePage);
router.route("/approved/evaluation/:staj_ID/:ogrenci_ID").get(companyController.getEvaluationPage);
router.route("/approved/internshipBook/:staj_ID/:ogrenci_ID").get(companyController.getInternshipBookPage);
router.route("/approved/:staj_ID").get(companyController.getApprovedPage);
router.route("/approved/internshipBook/internshipBookAccept/:staj_ID/:ogrenci_ID/:staj_defteri_ID").get(companyController.internshipBookAccept);
router.route("/approved/internshipBook/internshipBookReject/:staj_ID/:ogrenci_ID/:staj_defteri_ID").get(companyController.internshipBookReject);

module.exports = router;