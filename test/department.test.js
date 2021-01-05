const d = require("../lib/department");

test("Test add a test departments", done => {
 d.addDept("Test", e => {
  expect(e).toBe('Department Added');
  done();
  })
 });


 test("Test to list new departments", done => {
  d.getAllDept(e => {
    console.log(e);
    expect(e).toContain('Test');
    done();
  });
 });


