/**
 * PKCE Helpers for Spotify Authentication
 * Includes a SHA-256 implementation that works in insecure contexts (non-HTTPS).
 */

export const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

/**
 * SHA-256 implementation with fallback for insecure contexts.
 */
export const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  // If crypto.subtle is available, use the native implementation
  if (window.crypto && window.crypto.subtle) {
    return window.crypto.subtle.digest('SHA-256', data);
  }

  // Fallback: Simple SHA-256 implementation in JavaScript
  // Source: https://geraintluff.github.io/sha256/
  return sha256_fallback(plain);
};

export const base64urlEncode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

// --- SHA-256 Fallback Implementation ---
// This is a minimal implementation to support PKCE in insecure dev environments.
function sha256_fallback(ascii) {
    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    };

    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length'
    var i, j; // Used as a counter across the whole file
    var result = ''

    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;
    
    //* caching results is optional - we can trade memory for speed
    var hash = sha256_fallback.h = sha256_fallback.h || [];
    //* round constants
    var k = sha256_fallback.k = sha256_fallback.k || [];
    var primeCounter = k[lengthProperty];

    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
            k[primeCounter++] = (mathPow(candidate, 1/3) * maxWord) | 0;
        }
    }
    
    ascii += '\x80' // Append Ɨ' to the end
    while (ascii[lengthProperty] % 64 - 56) ascii += '\x00' // padding with zeros
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8) return; // NOT_ASCII
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength | 0)

    // process each chunk
    for (j = 0; j < words[lengthProperty];) {
        var w = words.slice(j, j += 16); // The message is processed in blocks of 16 32-bit words
        var oldHash = hash;
        // This is where the number of rounds happens (64)
        hash = hash.slice(0, 8);

        for (i = 0; i < 64; i++) {
            var i2 = i + j;
            // Expand the message into 64 words
            // Used below if 
            var w15 = w[i - 15], w2 = w[i - 2];

            // Iterative constant extraction
            var a = hash[0], e = hash[4];
            var temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                + ((e & hash[5]) ^ ((~e) & hash[6])) // ch
                + k[i]
                // Expand the message schedule if needed
                + (w[i] = (i < 16) ? w[i] : (
                        w[i - 16]
                        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) // s0
                        + w[i - 7]
                        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) // s1
                    ) | 0
                );
            // This is arguably the most complex logic in SHA256.
            var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj
            
            hash = [(temp1 + temp2) | 0].concat(hash); // hash[0]
            hash[4] = (hash[4] + temp1) | 0;
        }

        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i]) | 0;
        }
    }

    // Convert words to buffer (equivalent to subtle.digest result)
    const buffer = new Uint8Array(32);
    for (i = 0; i < 8; i++) {
        buffer[i * 4] = (hash[i] >>> 24) & 0xFF;
        buffer[i * 4 + 1] = (hash[i] >>> 16) & 0xFF;
        buffer[i * 4 + 2] = (hash[i] >>> 8) & 0xFF;
        buffer[i * 4 + 3] = hash[i] & 0xFF;
    }
    return buffer;
}
