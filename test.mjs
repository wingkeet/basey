import { base16, base32, base32hex, base64 } from './basey.mjs'

// Where to send messages to
let log
if (typeof self === 'undefined') {
    // Node.js
    log = function(...args) {
        console.log(...args)
    }
}
else {
    // Web browser
    log = function(...args) {
        const text = document.getElementById('text')
        text.append(args.join(' ') + '\n')
    }
}

function testBaseN(baseN, v) {
    let result = ''

    const w = []
    for (const foobar of v) {
        const str = baseN.encode(foobar)
        log(str)
        w.push(str)
    }

    for (const [i, str] of w.entries()) {
        const foobar = baseN.decode(str, true)
        log(str)
        console.assert(foobar === v[i])
    }

    return result
}

function main() {
    // Test vectors from RFC 4648
    const v = ['', 'f', 'fo', 'foo', 'foob', 'fooba', 'foobar']
    log('[Testing Base64]'); testBaseN(base64, v)
    log('[Testing Base32]'); testBaseN(base32, v)
    log('[Testing Base32hex]'); testBaseN(base32hex, v)
    log('[Testing Base16]'); testBaseN(base16, v)
    log('-'.repeat(65))

    let baseNstr

    // Test UTF-8 emojis
    baseNstr = base64.encode('😉😜😱😺✉✈✌↩')
    log('Base64', baseNstr, base64.decode(baseNstr, true))

    // Test date and time
    baseNstr = base64.encode(new Date().toLocaleString())
    log('Base64', baseNstr, base64.decode(baseNstr, true))

    // Test languages with multibyte UTF-8 characters
    baseNstr = base32.encode('ありがとう') // japanese
    log('Base32', baseNstr, base32.decode(baseNstr, true))
    baseNstr = base32.encode('спасибо') // russian
    log('Base32', baseNstr, base32.decode(baseNstr, true))
    baseNstr = base32.encode('σας ευχαριστώ') // greek
    log('Base32', baseNstr, base32.decode(baseNstr, true))

    // Test JavaScript Uint8Array class
    baseNstr = base16.encode(Uint8Array.from([0, 1, 2, 255, 254, 253]))
    log('Base16', baseNstr, base16.decode(baseNstr))

    try {
        log(base32hex.decode('ABC07UVW')) // throws a RangeError object
    }
    catch (err) {
        log(err)
    }
}

main()
