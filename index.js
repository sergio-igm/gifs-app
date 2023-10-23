var BitFlags = /** @class */ (function () {
    function BitFlags(bytes) {
        this.inner = new Uint8Array(bytes).map(function () { return Math.random() * 0x100; });
        this.length = this.inner.length << 3;
    }
    BitFlags.prototype.get = function (index) {
        var poss = index >> 3;
        var bit = index & 7;
        return this.inner[poss] >> bit & 1;
    };
    BitFlags.prototype.toString = function (radix) {
        if (radix === void 0) { radix = 2; }
        var a = [];
        for (var i = this.inner.length - 1; i >= 0; i--) {
            a.push(this.inner[i].toString(radix).padStart(8 / Math.log2(radix), '0'));
        }
        return a.join('');
    };
    return BitFlags;
}());
// 100%/n (bit = number with n bits at 1) ==> salt & bit === bit
// 100%/size* (bit = number with n bits at 1) ==> salt & bit === bit
var flags = new BitFlags(4);
console.log(flags.toString(2));
console.log(Array(32).fill(undefined).map(function (_, i) { return flags.get(i); }).reverse().join(''));
