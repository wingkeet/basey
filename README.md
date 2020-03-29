# base-n
JavaScript implementation of RFC 4648.

### Introduction
The Base16, Base32, Base32hex and Base64 implementation described herein
complies with [RFC 4648](https://tools.ietf.org/html/rfc4648).

### Prerequisites
- The file `base-n.js` has zero external dependencies.
- In order to run the test cases in `test.js`, Node.js is required.

### Getting Started
Base32 is primarily used to encode binary data. One example of its usage is in
Google Authenticator, where the shared secret key is stored using Base32
encoding. The Node.js snippet to do that is shown below.
```
const { base32 } = require('./base-n')
const secret = Uint8Array.from([0, 1, 2, 255, 254, 253]) // Uint8Array(6) [0, 1, 2, 255, 254, 253]
const base32str = base32.encode(secret) // AAAQF7767U======
const decoded = base32.decode(base32str) // Uint8Array(6) [0, 1, 2, 255, 254, 253]
```

Base32 can also be used to encode UTF-8 strings. By default, the `decode` function returns a
Uint8Array. If you want a string, pass a `true` value to the second (`toString`) argument.
```
const { base32 } = require('./base-n')
const message = '😘ありがとう😪' // arigatō, “thank you”
const base32str = base32.encode(message) // 6CPZRGHDQGBOHAUK4OAYZY4BVDRYDBXQT6MKU===
const decoded = base32.decode(base32str, true) // 😘ありがとう😪
```

To import any of the `base16`, `base32`, `base32hex` and `base64` objects,
use the ES6 object destructuring assignment syntax.
```
const { base32hex } = require('./base-n')
const { base32, base64 } = require('./base-n')
const { base16, base32, base32hex, base64 } = require('./base-n')
```

### Additional Notes
- The file `base-n.js` is heavily documented with code comments as well as JSDoc comments.
You should be able to understand the code quite easily.
- The file `test.js` has more test cases, including the test vectors from RFC 4648. Type
`node test.js` on the command line to run the tests.

### Authors
* **Steve Leong** - *Initial work*

### License
This project is licensed under the MIT License - see the LICENSE file for details.
