#!/usr/bin/env node

/**
 * Obtain a real JWT from the running SUT without placing credentials or tokens
 * in a JMX file. This script does not reset or modify the database directly.
 */

const fs = require("fs");
const path = require("path");

const baseUrl = process.env.SUT_BASE_URL || "http://localhost:3000";
const email = process.env.ESHOP_TEST_EMAIL || "test@eshop.com";
const password = process.env.ESHOP_TEST_PASSWORD || "Test1234!";
const outputPath = path.resolve(__dirname, "../data/runtime-auth.properties");

async function main() {
  const response = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const bodyText = await response.text();
  if (!response.ok) {
    throw new Error(`Login failed: HTTP ${response.status}: ${bodyText}`);
  }

  let payload;
  try {
    payload = JSON.parse(bodyText);
  } catch (error) {
    throw new Error(`Login did not return JSON: ${error.message}`);
  }

  if (!payload.token || typeof payload.token !== "string") {
    throw new Error("Login response does not contain a JWT token");
  }

  const safeToken = payload.token.replace(/[\r\n]/g, "");
  fs.writeFileSync(
    outputPath,
    `auth_token=${safeToken}\nauth_email=${email}\n`,
    { mode: 0o600 },
  );

  console.log(`Runtime auth properties written to ${outputPath}`);
  console.log(`Authenticated as ${email}; token value intentionally hidden.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

