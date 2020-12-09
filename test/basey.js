const assert = require('assert')
const { base16, base32, base32hex, base64, base64url } = require('../basey')

describe('basey', function() {

    context('RFC 4648 test vectors (foobar)', function() {
        const foobar = ['', 'f', 'fo', 'foo', 'foob', 'fooba', 'foobar']

        it('encodes base64 test vectors', function() {
            const expected = [
                '', 'Zg==', 'Zm8=', 'Zm9v', 'Zm9vYg==', 'Zm9vYmE=', 'Zm9vYmFy']
            foobar.forEach(function(f, index) {
                assert.strictEqual(base64.encode(f, {includePadding: true}), expected[index])
                assert.strictEqual(base64url.encode(f, {includePadding: true}), expected[index])
            })
        })

        it('encodes base32 test vectors', function() {
            const expected = [
                '', 'MY======', 'MZXQ====', 'MZXW6===', 'MZXW6YQ=', 'MZXW6YTB', 'MZXW6YTBOI======']
            foobar.forEach(function(f, index) {
                assert.strictEqual(base32.encode(f, {includePadding: true}), expected[index])
            })
        })

        it('encodes base32hex test vectors', function() {
            const expected = [
                '', 'CO======', 'CPNG====', 'CPNMU===', 'CPNMUOG=', 'CPNMUOJ1', 'CPNMUOJ1E8======']
            foobar.forEach(function(f, index) {
                assert.strictEqual(base32hex.encode(f, {includePadding: true}), expected[index])
            })
        })

        it('encodes base16 test vectors', function() {
            const expected = [
                '', '66', '666F', '666F6F', '666F6F62', '666F6F6261', '666F6F626172']
            foobar.forEach(function(f, index) {
                assert.strictEqual(base16.encode(f, {includePadding: true}), expected[index])
            })
        })
    })

    context('UTF-8 emojis', function() {
        it('base64 encodes/decodes 😉😜😱😺✉✈✌↩', function() {
            assert.strictEqual(base64.encode('😉😜😱😺✉✈✌↩'), '8J+YifCfmJzwn5ix8J+YuuKcieKciOKcjOKGqQ')
            assert.strictEqual(base64.decode('8J+YifCfmJzwn5ix8J+YuuKcieKciOKcjOKGqQ', {toStr: true}), '😉😜😱😺✉✈✌↩')
        })
    })

    context('languages with multibyte UTF-8 characters', function() {
        it('base32 encodes/decodes ありがとう (japanese)', function() {
            assert.strictEqual(base32.encode('ありがとう'), '4OAYFY4CRLRYDDHDQGUOHAMG')
            assert.strictEqual(base32.decode('4OAYFY4CRLRYDDHDQGUOHAMG', {toStr: true}), 'ありがとう')
        })

        it('base32 encodes/decodes спасибо (russian)', function() {
            assert.strictEqual(base32.encode('спасибо'), '2GA5BP6QWDIYDUFY2CY5BPQ')
            assert.strictEqual(base32.decode('2GA5BP6QWDIYDUFY2CY5BPQ', {toStr: true}), 'спасибо')
        })

        it('base32 encodes/decodes σας ευχαριστώ (greek)', function() {
            assert.strictEqual(base32.encode('σας ευχαριστώ'), 'Z6B45MOPQIQM5NOPQXHYPTVRZ6A45OOPQPHYJT4O')
            assert.strictEqual(base32.decode('Z6B45MOPQIQM5NOPQXHYPTVRZ6A45OOPQPHYJT4O', {toStr: true}), 'σας ευχαριστώ')
        })
    })

    context('JWT https://jwt.io/', function() {
        const header = { alg: 'HS256', typ: 'JWT' }
        const payload = { sub: '1234567890', name: 'John Doe', iat: 1516239022 }
        it('base64url encode jwt header', function() {
            json = JSON.stringify(header)
            assert.strictEqual(base64url.encode(json), 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
        })
        it('base64url encode jwt payload', function() {
            json = JSON.stringify(payload)
            assert.strictEqual(base64url.encode(json), 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ')
        })
        it('base64url decode header', function() {
            expected = '{"alg":"HS256","typ":"JWT"}'
            assert.strictEqual(base64url.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', {toStr: true}), expected)
        })
        it('base64url decode payload', function() {
            expected = '{"sub":"1234567890","name":"John Doe","iat":1516239022}'
            assert.strictEqual(base64url.decode('eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ', {toStr: true}), expected)
        })
    })

    context('with no parameters to encode', function() {
        it('should throw TypeError', function() {
            assert.throws(() => { base32.encode() },
                { name: 'TypeError' }
            )
        })
    })

    context('with invalid input to encode', function() {
        it('should throw TypeError', function() {
            assert.throws(() => { base32.encode(12345) },
                { name: 'TypeError' }
            )
        })
    })

    context('with no parameters to decode', function() {
        it('should throw TypeError', function() {
            assert.throws(() => { base32.decode() },
                { name: 'TypeError' }
            )
        })
    })

    context('with invalid input to decode', function() {
        it('should throw TypeError', function() {
            assert.throws(() => { base32.decode(12345) },
                { name: 'TypeError' }
            )
        })
    })

    context('with invalid base32hex string to decode', function() {
        it('should throw RangeError', function() {
            assert.throws(() => { base32hex.decode('ABC07UVW') },
                { name: 'RangeError' }
            )
        })
    })

})
