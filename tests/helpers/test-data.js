const API_URL = "http://localhost:3000/api";
const WEB_URL = "http://127.0.0.1:5173";
const ADMIN_URL = "http://127.0.0.1:5174";

const accounts = {
  user: {
    email: "test@eshop.com",
    password: "Test1234!"
  },
  admin: {
    email: "admin@eshop.com",
    password: "Admin123!"
  }
};

function uniqueEmail(prefix = "hw02") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;
}

module.exports = {
  API_URL,
  WEB_URL,
  ADMIN_URL,
  accounts,
  uniqueEmail
};
