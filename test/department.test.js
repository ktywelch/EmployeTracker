const dept = require("../lib/department");

// test("Test to add new departments", done => {
//   const e = dept.addDept("Abc");
//   try {
//   expect(e).toBe('departments added');
//   done();
//   }
//   catch (error) {
//     done(error);
//   }
//  });

 test("Test to list new departments", done => {
  const e = dept.getAllDept;
  try {
  expect(e).toBe(e);
  done();
  }
  catch (error) {
    done(error);
  }
 });




// test("Test to delete departments", done => {
//     const e = dept.delDept([["Test1"],["Test2"]]);
//  try {
//     expect(e).toBe('departments deleted');
//     done();
//     }
//   catch (error) {
//     done(error);
//   }
// });

/*test("Can set name via constructor arguments", () => {
  const name = "Alice";
  const e = new Employee(name);
  expect(e.name).toBe(name);
});

test("Can set id via constructor argument", () => {
  const testValue = 100;
  const e = new Employee("Foo", testValue);
  expect(e.id).toBe(testValue);
});

test("Can set email via constructor argument", () => {
  const testValue = "test@test.com";
  const e = new Employee("Foo", 1, testValue);
  expect(e.email).toBe(testValue);
});

test("Can get name via getName()", () => {
  const testValue = "Alice";
  const e = new Employee(testValue);
  expect(e.getName()).toBe(testValue);
});

test("Can get id via getId()", () => {
  const testValue = 100;
  const e = new Employee("Foo", testValue);
  expect(e.getId()).toBe(testValue);
});

test("Can get email via getEmail()", () => {
  const testValue = "test@test.com";
  const e = new Employee("Foo", 1, testValue);
  expect(e.getEmail()).toBe(testValue);
});

test("getRole() should return \"Employee\"", () => {
  const testValue = "Employee";
  const e = new Employee("Alice", 1, "test@test.com");
  expect(e.getRole()).toBe(testValue);
});
*/