"use strict";

const { test } = use("Test/Suite")("List Users Feature");
const CreateUserFeature = use("Src/Services/Api/Features/CreateUserFeature");
const ListUsersFeature = use("Src/Services/Api/Features/ListUsersFeature");

const RANDOM_INT = Math.random() * 100;

const TEST_EMAIL = `john.doe${RANDOM_INT}@example.com`;
const TEST_USERNAME = `john.doe${RANDOM_INT}`;
const TEST_PASSWORD = "secretdecrypt";

const data = {
  username: TEST_USERNAME,
  email: TEST_EMAIL,
  password: TEST_PASSWORD
};

test("Should fetch a list of users", async ({ assert }) => {
  const { username, email } = data;

  const createdUser = await new CreateUserFeature({ data }).handle();

  const users = await new ListUsersFeature().handle();

  assert.isAtLeast(users.length, 1);
  assert.isArray(users);
  assert.isObject(users[0]);
});
