

class BitFlags {
    private inner: Uint8Array;
    length: number;
    constructor(bytes: number) {
        this.inner = new Uint8Array(bytes).map(() => Math.random() * 0x100);
        this.length = this.inner.length << 3;
    }

    get(index: number) {
        let poss = index >> 3;
        let bit = index & 0b111;
        return this.inner[poss] >> bit & 1;
    }

    toString(radix: 16 | 4 | 2 = 2) {
        const a: string[] = [];
        for (let i = this.inner.length - 1; i >= 0; i--) {
            a.push(this.inner[i].toString(radix).padStart(8 / Math.log2(radix), '0'))
        }
        return a.join('');
    }
}
// 100%/n (bit = number with n bits at 1) ==> salt & bit === bit
// 100%/size* (bit = number with n bits at 1) ==> salt & bit === bit

const flags = new BitFlags(4);
console.log(flags.toString(2));

console.log(Array(32).fill(undefined).map((_, i) => flags.get(i)).reverse().join(''));
