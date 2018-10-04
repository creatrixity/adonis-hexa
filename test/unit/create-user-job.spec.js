"use strict";

const { test } = use("Test/Suite")("Create User Job");
const CreateUserJob = use("Src/Domains/User/Jobs/CreateUserJob");

const RANDOM_INT = Math.random() * 100;

const TEST_EMAIL = `john.doe${RANDOM_INT}@example.com`;
const TEST_USERNAME = `john.doe${RANDOM_INT}`;
const TEST_PASSWORD = "secretdecrypt";

const data = {
  username: TEST_USERNAME,
  email: TEST_EMAIL,
  password: TEST_PASSWORD
};

test("Should create a user object when passed data", async ({ assert }) => {
  const { username, email } = data;

  const user = await new CreateUserJob({ data }).handle();

  assert.containsAllKeys(user, ["username", "email"]);
});
