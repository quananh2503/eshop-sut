#!/usr/bin/env node
/* Generates test-design data and a Postman collection. It deliberately does
 * not manufacture any execution result. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const collectionPath = path.join(root, 'collections', '23127001_HW06_API.postman_collection.json');
const envPath = path.join(root, 'environments', 'local.postman_environment.json');
fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(path.dirname(collectionPath), { recursive: true });

const common = { studentId: '23127001', source: 'AI', audit: 'INCOMPLETE', auditReason: 'Awaiting student review against SRS and an execution result.' };
const login = [
  ['valid user credentials', 'test@eshop.com', 'Test1234!', '200', 'positive'],
  ['valid admin credentials', 'admin@eshop.com', 'Admin123!', '200', 'positive'],
  ['unknown well-formed email', 'unknown@eshop.com', 'Test1234!', '401', 'negative'],
  ['wrong password', 'test@eshop.com', 'Wrong123!', '401', 'negative'],
  ['empty email', '', 'Test1234!', '4xx', 'required'],
  ['empty password', 'test@eshop.com', '', '401', 'required'],
  ['missing email', undefined, 'Test1234!', '4xx', 'required'],
  ['missing password', 'test@eshop.com', undefined, '401', 'required'],
  ['null email', null, 'Test1234!', '4xx', 'type'],
  ['null password', 'test@eshop.com', null, '401', 'type'],
  ['numeric email', 12345, 'Test1234!', '4xx', 'type'],
  ['numeric password', 'test@eshop.com', 12345, '401', 'type'],
  ['malformed email no at-sign', 'test.eshop.com', 'Test1234!', '401', 'domain'],
  ['malformed email no domain', 'test@', 'Test1234!', '401', 'domain'],
  ['leading/trailing email spaces', ' test@eshop.com ', 'Test1234!', '401', 'boundary'],
  ['mixed-case email', 'TEST@ESHOP.COM', 'Test1234!', '401', 'domain'],
  ['password one character', 'test@eshop.com', 'T', '401', 'boundary'],
  ['password very long', 'test@eshop.com', 'A'.repeat(512), '401', 'boundary'],
  ['unicode password', 'test@eshop.com', 'MậtKhẩu123!', '401', 'domain'],
  ['SQL-like email', "' OR '1'='1", 'anything', '401', 'security'],
  ['SQL-like password', 'test@eshop.com', "' OR '1'='1", '401', 'security'],
  ['JSON object email', { value: 'test@eshop.com' }, 'Test1234!', '4xx', 'type'],
  ['JSON object password', 'test@eshop.com', { value: 'Test1234!' }, '401', 'type'],
  ['array email', ['test@eshop.com'], 'Test1234!', '4xx', 'type'],
  ['array password', 'test@eshop.com', ['Test1234!'], '401', 'type'],
  ['content-type text/plain', 'test@eshop.com', 'Test1234!', '415/4xx', 'protocol'],
  ['malformed JSON', 'MALFORMED_JSON', '', '400', 'protocol'],
  ['first failed attempt increments exactly one', 'test@eshop.com', 'Wrong123!', '401', 'lockout'],
  ['second failed attempt does not lock', 'test@eshop.com', 'Wrong123!', '401', 'lockout'],
  ['third consecutive failure locks account', 'test@eshop.com', 'Wrong123!', '401', 'lockout'],
  ['locked account blocks valid password', 'test@eshop.com', 'Test1234!', '403', 'lockout'],
  ['lock duration is 30 seconds', 'test@eshop.com', 'Test1234!', '200 after 30s', 'lockout'],
  ['valid login resets failed counter', 'test@eshop.com', 'Test1234!', '200', 'lockout'],
  ['success schema has token and user', 'test@eshop.com', 'Test1234!', '200', 'schema'],
  ['success response excludes password', 'test@eshop.com', 'Test1234!', '200', 'security'],
  ['JWT has three dot-separated segments', 'test@eshop.com', 'Test1234!', '200', 'schema'],
  ['error schema is JSON error object', 'unknown@eshop.com', 'x', '401', 'schema'],
  ['repeated valid login remains functional', 'admin@eshop.com', 'Admin123!', '200', 'reliability'],
  ['extra JSON property ignored safely', 'test@eshop.com', 'Test1234!', '200', 'security'],
  ['request without X-Student-Id is documented control', 'test@eshop.com', 'Test1234!', '200', 'observability'],
];

const cancelNames = [
  'pending owner cancels', 'confirmed owner cancels', 'shipping owner cannot cancel', 'delivered owner cannot cancel', 'canceled owner cannot cancel',
  'other user cannot cancel pending order', 'other user cannot cancel confirmed order', 'missing JWT rejected', 'malformed JWT rejected', 'tampered JWT rejected',
  'nonexistent numeric order returns not found', 'zero id rejected/not found', 'negative id rejected/not found', 'decimal id rejected/not found', 'non-numeric id rejected/not found',
  'SQL-like id cannot modify order', 'very large id does not overflow', 'empty path id routes safely', 'owner state persists after successful cancel', 'failed cancel preserves shipping state',
  'failed cancel preserves delivered state', 'failed cancel preserves canceled state', 'response success schema', 'response error schema', 'content-type irrelevant for empty PUT',
  'duplicate cancel is idempotently rejected', 'cancel A does not modify B', 'JWT user id determines ownership not body', 'extra body cannot change owner', 'concurrent cancel permits at most one transition',
  'cancel after admin confirmed is allowed', 'cancel after admin shipping is denied', 'cancel after admin delivered is denied', 'cancel after admin canceled is denied', 'method GET is not accepted as cancel',
  'method POST is not accepted as cancel', 'Authorization Bearer format required', 'case-sensitive bearer/token behavior safe', 'error does not leak another order data', 'X-Student-Id header present'
];
const adminNames = [
  'admin pending to confirmed', 'admin pending to canceled', 'admin confirmed to shipping', 'admin confirmed to canceled', 'admin shipping to delivered',
  'admin pending to shipping denied', 'admin pending to delivered denied', 'admin confirmed to delivered denied', 'admin shipping to confirmed denied', 'admin shipping to canceled denied',
  'admin delivered to pending denied', 'admin delivered to confirmed denied', 'admin delivered to shipping denied', 'admin delivered to canceled denied', 'admin canceled to pending denied',
  'admin canceled to confirmed denied', 'admin canceled to shipping denied', 'admin canceled to delivered denied', 'ordinary user JWT denied', 'missing JWT denied',
  'malformed JWT denied', 'tampered JWT denied', 'nonexistent numeric id not found', 'zero id rejected/not found', 'negative id rejected/not found',
  'decimal id rejected/not found', 'non-numeric id rejected/not found', 'SQL-like id safe', 'missing status rejected', 'null status rejected',
  'numeric status rejected', 'object status rejected', 'unknown status rejected', 'case variant status rejected', 'extra body cannot bypass state rules',
  'invalid transition preserves current state', 'success response schema', 'error response schema', 'no cross-order modification', 'X-Student-Id header present'
];

function makeCase(prefix, index, name, extra) {
  const human = index > 35;
  return { id: `${prefix}-${String(index).padStart(3, '0')}`, name, ...common, source: human ? 'Human' : 'AI', audit: human ? 'VALID' : 'INCOMPLETE', auditReason: human ? 'Added after risk review: security/state transition gap.' : common.auditReason, ...extra };
}
const cases = [];
login.forEach((v, i) => cases.push(makeCase('LOGIN', i + 1, v[0], { api: 'POST /api/login', frSec: i >= 34 ? 'FR-02, SEC-01' : 'FR-02, SEC-02, SEC-05', category: v[4], input: { email: v[1], password: v[2] }, expected: v[3] })));
cancelNames.forEach((name, i) => cases.push(makeCase('CANCEL', i + 1, name, { api: 'PUT /api/orders/:id/cancel', frSec: 'FR-10, SEC-02', category: i >= 35 ? 'human security/state' : 'state/security', input: { orderState: ['pending', 'confirmed', 'shipping', 'delivered', 'canceled'][i % 5] }, expected: name.includes('pending owner') || name.includes('confirmed owner') || name.includes('after admin confirmed') ? '200 and status canceled' : '4xx/no state change' })));
adminNames.forEach((name, i) => cases.push(makeCase('ADMINSTATUS', i + 1, name, { api: 'PUT /api/admin/orders/:id/status', frSec: 'FR-10, FR-18, SEC-02, SEC-03', category: i >= 35 ? 'human security/state' : 'state/security', input: { targetStatus: ['confirmed', 'canceled', 'shipping', 'delivered'][i % 4] }, expected: i < 5 ? '200 and target state persisted' : '4xx/no state change' })));

fs.writeFileSync(path.join(dataDir, 'test-cases.json'), JSON.stringify(cases, null, 2) + '\n');
fs.writeFileSync(path.join(dataDir, 'test-cases.csv'), ['id,api,source,audit,category,expected,name', ...cases.map(c => [c.id, c.api, c.source, c.audit, c.category, c.expected, JSON.stringify(c.name)].map(x => `"${String(x).replaceAll('"', '""')}"`).join(','))].join('\n') + '\n');

const header = [{ key: 'X-Student-Id', value: '{{studentId}}' }, { key: 'Content-Type', value: 'application/json' }];
function req(name, method, url, body, tests) { return { name, request: { method, header, url: '{{baseUrl}}' + url, body: body === undefined ? undefined : { mode: 'raw', raw: JSON.stringify(body) } }, event: [{ listen: 'test', script: { exec: tests } }] }; }
const collection = {
  info: { name: '23127001 HW06 API Testing', schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json' },
  variable: [{ key: 'studentId', value: '23127001' }],
  event: [{ listen: 'prerequest', script: { exec: ["pm.request.headers.upsert({ key: 'X-Student-Id', value: pm.variables.replaceIn('{{studentId}}') });", "console.log('HW06 pre-request: X-Student-Id=' + pm.variables.replaceIn('{{studentId}}'));" ] } }],
  item: [
    { name: 'Setup', item: [
      req('Login as user', 'POST', '/api/login', { email: 'test@eshop.com', password: 'Test1234!' }, ["pm.test('user login succeeds', () => pm.response.to.have.status(200));", "pm.environment.set('userToken', pm.response.json().token);"]),
      req('Login as admin', 'POST', '/api/login', { email: 'admin@eshop.com', password: 'Admin123!' }, ["pm.test('admin login succeeds', () => pm.response.to.have.status(200));", "pm.environment.set('adminToken', pm.response.json().token);"]),
      { name: 'Create owned pending order', request: { method: 'POST', header: [...header, { key: 'Authorization', value: 'Bearer {{userToken}}' }], url: '{{baseUrl}}/api/checkout', body: { mode: 'raw', raw: JSON.stringify({ total_amount: 100000, shipping_address: 'HW06 isolated test data' }) } }, event: [{ listen: 'test', script: { exec: ["pm.test('order setup succeeds', () => pm.response.to.have.status(200));", "pm.environment.set('orderId', pm.response.json().orderId);"] } }] }
    ] },
    { name: 'Login contract smoke', item: [
      req('LOGIN-001 valid user', 'POST', '/api/login', { email: 'test@eshop.com', password: 'Test1234!' }, ["pm.test('200', () => pm.response.to.have.status(200));", "pm.test('token/user contract', () => { const b=pm.response.json(); pm.expect(b.token).to.be.a('string').and.not.empty; pm.expect(b.user).to.be.an('object'); });", "pm.test('password not disclosed', () => pm.expect(pm.response.json().user).not.to.have.property('password'));"]),
      req('LOGIN-020 SQL-like email', 'POST', '/api/login', { email: "' OR '1'='1", password: 'x' }, ["pm.test('not authenticated', () => pm.expect(pm.response.code).to.be.oneOf([400,401]));"])
    ] },
    { name: 'Order API smoke', item: [
      req('CANCEL missing JWT', 'PUT', '/api/orders/1/cancel', undefined, ["pm.test('JWT required', () => pm.response.to.have.status(401));"]),
      { name: 'ADMINSTATUS ordinary user denied', request: { method: 'PUT', header: [...header, { key: 'Authorization', value: 'Bearer {{userToken}}' }], url: '{{baseUrl}}/api/admin/orders/{{orderId}}/status', body: { mode: 'raw', raw: JSON.stringify({ status: 'confirmed' }) } }, event: [{ listen: 'test', script: { exec: ["pm.test('ordinary user denied', () => pm.expect(pm.response.code).to.be.oneOf([401,403]));"] } }] }
    ] }
  ]
};
fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2) + '\n');
fs.writeFileSync(envPath, JSON.stringify({ name: 'HW06 local', values: [{ key: 'baseUrl', value: 'http://127.0.0.1:3000', enabled: true }, { key: 'studentId', value: '23127001', enabled: true }, { key: 'userToken', value: '', enabled: true }, { key: 'adminToken', value: '', enabled: true }], _postman_variable_scope: 'environment', _postman_exported_at: new Date().toISOString(), _postman_exported_using: 'HW06 generator' }, null, 2) + '\n');
console.log(`Generated ${cases.length} traceable test cases and Postman collection.`);
