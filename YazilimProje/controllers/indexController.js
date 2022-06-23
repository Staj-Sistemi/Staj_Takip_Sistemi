exports.getIndexPage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.getLoginCompanyPage = (req, res) => {
  res.status(200).render("logincompany", {
    page_name: "logincompany",
  });
};

exports.getregisterCompanyPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getStudentLoginPage = (req, res) => {
  res.status(200).render("studentlogin", {
    page_name: "studentlogin",
  });
};

exports.getInternshipLoginPage = (req, res) => {
  res.status(200).render("internshiplogin", {
    page_name: "internshiplogin",
  });
};
