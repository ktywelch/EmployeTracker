const dept = require("../lib/department");


 test("Test to list new departments", done => {
  const e = dept.getAllDept;
  try {
    e.arrayContaining('departmet');
  done();
  }
  catch (error) {
    done(error);
  }
 });



