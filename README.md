# basey
JavaScript implementation of RFC 4648.

### Introduction
Basey (pronounced base-see) is a JavaScript module that implements the
Base16, Base32, Base32hex, Base64 and Base64url encoding schemes described
in [RFC 4648](https://tools.ietf.org/html/rfc4648). The APIs are designed
to be developer-friendly with sensible defaults.

### Prerequisites
- The file `basey.js` has zero external dependencies.

### Getting Started
Base32 is primarily used to encode binary data. One example of its usage is in
Google Authenticator, where the shared secret key is stored using Base32
encoding. The Node.js snippet to do that is shown below.
```
const { base32 } = require('./basey')
const secret = Uint8Array.from([0, 1, 2, 255, 254, 253]) // Uint8Array(6) [0, 1, 2, 255, 254, 253]
const base32str = base32.encode(secret) // AAAQF7767U
const decoded = base32.decode(base32str) // Uint8Array(6) [0, 1, 2, 255, 254, 253]
```

Base32 can also be used to encode UTF-8 strings. By default, the `decode` function returns a
Uint8Array. If you want a string, pass a truthy value to the second (`toString`) argument.
```
const { base32 } = require('./basey')
const message = '😘ありがとう😪' // arigatō, “thank you”
const base32str = base32.encode(message) // 6CPZRGHDQGBOHAUK4OAYZY4BVDRYDBXQT6MKU
const decoded = base32.decode(base32str, true) // 😘ありがとう😪
```

Any of the `base16`, `base32`, `base32hex`, `base64` and `base64url` objects can be
imported into your own program or script.
```
const { base32hex } = require('./basey')
const { base32, base64 } = require('./basey')
const { base16, base32, base32hex, base64, base64url } = require('./basey')
```

### Additional Notes
- While RFC 4648 specifies that the encode functions should return "=" padding characters,
these padding characters are commonly removed in real-world applications. Therefore, by
default, the encode functions in this library do *not* include the padding characters.
If you want them, pass a truthy value to the second (`includePadding`) argument.
- The file `basey.js` is heavily documented with code comments as well as JSDoc comments.
You should be able to understand the code quite easily.
- The file `main.js` has more test cases, including the test vectors from RFC 4648. Type
`npm start` on the command line to run the tests.

### Authors
* **Steve Leong** - *Initial work*

### License
This project is licensed under the MIT License - see the LICENSE file for details.
