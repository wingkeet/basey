import { base16, base32, base32hex, base64, base64url } from './basey.js'

function testBaseN(baseN, v) {
    let result = ''

    const w = []
    for (const foobar of v) {
        const str = baseN.encode(foobar)
        console.log(str)
        w.push(str)
    }

    for (const [i, str] of w.entries()) {
        const foobar = baseN.decode(str, true)
        console.log(foobar)
        console.assert(foobar === v[i])
    }
}

function main() {
    // Test vectors from RFC 4648
    const v = ['', 'f', 'fo', 'foo', 'foob', 'fooba', 'foobar']
    console.log('[Testing Base64]'); testBaseN(base64, v)
    console.log('[Testing Base32]'); testBaseN(base32, v)
    console.log('[Testing Base32hex]'); testBaseN(base32hex, v)
    console.log('[Testing Base16]'); testBaseN(base16, v)
    console.log('-'.repeat(65))

    let baseNstr

    // Test UTF-8 emojis
    baseNstr = base64.encode('😉😜😱😺✉✈✌↩')
    console.log('Base64', baseNstr, base64.decode(baseNstr, true))

    // Test date and time
    baseNstr = base64.encode(new Date().toLocaleString())
    console.log('Base64', baseNstr, base64.decode(baseNstr, true))

    // Test languages with multibyte UTF-8 characters
    baseNstr = base32.encode('ありがとう') // japanese
    console.log('Base32', baseNstr, base32.decode(baseNstr, true))
    baseNstr = base32.encode('спасибо') // russian
    console.log('Base32', baseNstr, base32.decode(baseNstr, true))
    baseNstr = base32.encode('σας ευχαριστώ') // greek
    console.log('Base32', baseNstr, base32.decode(baseNstr, true))

    // Test JavaScript Uint8Array class
    baseNstr = base16.encode(Uint8Array.from([0, 1, 2, 255, 254, 253]))
    console.log('Base16', baseNstr, base16.decode(baseNstr))

    try {
        console.log(base32hex.decode('ABC07UVW')) // throws a RangeError object
    }
    catch (err) {
        console.error(err)
    }

    try {
        // Example taken from https://jwt.io/
        const header = { alg: 'HS256', typ: 'JWT' }
        const payload = { sub: '1234567890', name: 'John Doe', iat: 1516239022 }
        console.log(base64url.encode(JSON.stringify(header)))
        console.log(base64url.encode(JSON.stringify(payload)))
        console.log(base64url.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', true))
        console.log(base64url.decode('eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ', true))
    }
    catch (err) {
        console.error(err)
    }
}

main()
