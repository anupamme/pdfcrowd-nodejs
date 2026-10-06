var assert = require('assert');
var pdf = require('../lib/pdfcrowd');
var isUrlAllowedForConversion = pdf.isUrlAllowedForConversion;

// rejected: private / local IPv4
assert.strictEqual(isUrlAllowedForConversion('http://127.0.0.1'), false);
assert.strictEqual(isUrlAllowedForConversion('http://10.0.0.1'), false);
assert.strictEqual(isUrlAllowedForConversion('http://172.16.0.1'), false);
assert.strictEqual(isUrlAllowedForConversion('http://192.168.1.1'), false);
assert.strictEqual(isUrlAllowedForConversion('http://169.254.169.254'), false);
assert.strictEqual(isUrlAllowedForConversion('http://0.0.0.0'), false);

// rejected: local / private IPv6 and localhost
assert.strictEqual(isUrlAllowedForConversion('http://localhost'), false);
assert.strictEqual(isUrlAllowedForConversion('http://[::1]'), false);
assert.strictEqual(isUrlAllowedForConversion('http://[fc00::1]'), false);
assert.strictEqual(isUrlAllowedForConversion('http://[fe80::1]'), false);

// rejected: unsupported protocol
assert.strictEqual(isUrlAllowedForConversion('ftp://example.com'), false);
assert.strictEqual(isUrlAllowedForConversion('file:///etc/passwd'), false);

// rejected: unparseable URL
assert.strictEqual(isUrlAllowedForConversion('not a url'), false);

// allowed: public hosts over http/https
assert.strictEqual(isUrlAllowedForConversion('http://example.com'), true);
assert.strictEqual(isUrlAllowedForConversion('https://example.com'), true);
assert.strictEqual(isUrlAllowedForConversion('https://8.8.8.8'), true);

console.log('url validation tests passed');
