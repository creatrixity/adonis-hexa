"use strict";

const { test } = use("Test/Suite")("Create User Feature");
const CreateUserFeature = use("Src/Services/Api/Features/CreateUserFeature");

const TEST_EMAIL = "john.doe@example.com";
const TEST_USERNAME = "john.doe";
const TEST_PASSWORD = "secretdecrypt";

const data = {
  username: TEST_USERNAME,
  email: TEST_EMAIL,
  password: TEST_PASSWORD
};

test("Should create a user object when passed data", async ({ assert }) => {
  const { username, email } = data;

  const userObject = await new CreateUserFeature({ data }).handle();

  assert.containsAllKeys(userObject.user, ["username", "email"]);
});
