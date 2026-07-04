const { expect } = require("@playwright/test");
const { API_URL, accounts } = require("./test-data");

async function registerUser(request, overrides = {}) {
  const payload = {
    name: overrides.name || "HW02 Test User",
    email: overrides.email,
    password: overrides.password || "Test1234!"
  };
  const response = await request.post(`${API_URL}/register`, { data: payload });
  expect(response.ok()).toBeTruthy();
  return payload;
}

async function login(request, email, password) {
  const response = await request.post(`${API_URL}/login`, {
    data: { email, password }
  });
  expect(response.ok()).toBeTruthy();
  return response.json();
}

async function loginAsAdmin(request) {
  return login(request, accounts.admin.email, accounts.admin.password);
}

async function requestForgotPassword(request, email) {
  const response = await request.post(`${API_URL}/forgot-password`, {
    data: { email }
  });
  return response;
}

async function resetPassword(request, data) {
  return request.post(`${API_URL}/reset-password`, { data });
}

async function importProducts(request, token, products) {
  return request.post(`${API_URL}/admin/import-products`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { products }
  });
}

async function getProducts(request) {
  const response = await request.get(`${API_URL}/products`);
  expect(response.ok()).toBeTruthy();
  return response.json();
}

module.exports = {
  registerUser,
  login,
  loginAsAdmin,
  requestForgotPassword,
  resetPassword,
  importProducts,
  getProducts
};
