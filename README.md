# basey
JavaScript implementation of RFC 4648 with ECMAScript module.

### Introduction
The Base16, Base32, Base32hex and Base64 implementation described herein
complies with [RFC 4648](https://tools.ietf.org/html/rfc4648).

### Prerequisites
- The file `basey.mjs` has zero external dependencies.
- In order to run the test cases in `test.mjs` (without specifying the
--experimental-modules runtime flag), Node.js 13.2.0 and above is required.

### Getting Started
Base32 is primarily used to encode binary data. One example of its usage is in
Google Authenticator, where the shared secret key is stored using Base32
encoding. The Node.js snippet to do that is shown below.
```
import { base32 } from './basey.mjs'
const secret = Uint8Array.from([0, 1, 2, 255, 254, 253]) // Uint8Array(6) [0, 1, 2, 255, 254, 253]
const base32str = base32.encode(secret) // AAAQF7767U======
const decoded = base32.decode(base32str) // Uint8Array(6) [0, 1, 2, 255, 254, 253]
```

Base32 can also be used to encode UTF-8 strings. By default, the `decode` function returns a
Uint8Array. If you want a string, pass a `true` value to the second (`toString`) argument.
```
import { base32 } from './basey.mjs'
const message = '😘ありがとう😪' // arigatō, “thank you”
const base32str = base32.encode(message) // 6CPZRGHDQGBOHAUK4OAYZY4BVDRYDBXQT6MKU===
const decoded = base32.decode(base32str, true) // 😘ありがとう😪
```

To import any of the `base16`, `base32`, `base32hex` and `base64` objects
into your own program or script, use the `import` statement.
```
import { base32hex } from './basey.mjs'
import { base32, base64 } from './basey.mjs'
import { base16, base32, base32hex, base64 } from './basey.mjs'
```

### Additional Notes
- The file `basey.mjs` is heavily documented with code comments as well as JSDoc comments.
You should be able to understand the code quite easily.
- The file `test.mjs` has more test cases, including the test vectors from RFC 4648. Type
`node test.mjs` on the command line to run the tests.

### Authors
* **Steve Leong** - *Initial work*

### License
This project is licensed under the MIT License - see the LICENSE file for details.
