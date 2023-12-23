class Complex {
   constructor(real, imag) {
       this.real = real;
       this.imag = imag;
   }

   add(other) {
       return new Complex(this.real + other.real, this.imag + other.imag);
   }

   subtract(other) {
       return new Complex(this.real - other.real, this.imag - other.imag);
   }

   multiply(other) {
       return new Complex(
           this.real * other.real - this.imag * other.imag,
           this.real * other.imag + this.imag * other.real
       );
   }

   scale(scalar) {
       return new Complex(this.real * scalar, this.imag * scalar);
   }

   magnitude() {
       return Math.sqrt(this.real * this.real + this.imag * this.imag);
   }

   static fromPolar(r, theta) {
       return new Complex(r * Math.cos(theta), r * Math.sin(theta));
   }

   randomPhaseShift() {
       const maxShift = Math.PI / 4;
       const shift = quantum.getRandom(-maxShift, 0, maxShift);
       return this.multiply(Complex.fromPolar(1, shift));
   }

   toString() {
       return `(${this.real.toFixed(2)}, ${this.imag.toFixed(2)})`;
   }
}

const quantum = {
   getRandom: function(min, mid, max) {
       if (typeof min !== "number" || typeof mid !== "number" || typeof max !== "number") {
           throw new Error("min, mid, and max must be numbers");
       }
       if (min >= mid || mid >= max) {
           throw new Error("Values must be in order: min < mid < max");
       }

       const buffer = new Uint32Array(1);
       window.crypto.getRandomValues(buffer);
       const normalizedRandom = buffer[0] / (0xFFFFFFFF + 1);

       if (normalizedRandom < 0.33) {
           return this.cryptoRandom(min, mid);
       } else if (normalizedRandom < 0.67) {
           return this.cryptoRandom(mid, max);
       } else {
           return this.cryptoRandom(max, max + (max - mid));
       }
   },
   cryptoRandom: function(min, max) {
       const range = max - min;
       const buffer = new Uint32Array(1);
       window.crypto.getRandomValues(buffer);
       return (buffer[0] / (0xFFFFFFFF + 1)) * range + min;
   }
};

const quantumCircuit = {
   qutrits: [
       [new Complex(1, 0), new Complex(0, 0), new Complex(0, 0)],
       [new Complex(1, 0), new Complex(0, 0), new Complex(0, 0)],
       [new Complex(1, 0), new Complex(0, 0), new Complex(0, 0)]
   ],

   applyGeneralizedHadamard: function(qutritIndex) {
       console.log("Applying generalized Hadamard to qutrit " + qutritIndex);
       const sqrt3Inv = 1 / Math.sqrt(3);
       this.qutrits[qutritIndex] = [
           new Complex(sqrt3Inv, 0),
           new Complex(sqrt3Inv, 0),
           new Complex(sqrt3Inv, 0)
       ];
   },

   applyControlledPhase: function(controlQutrit, targetQutrit, phase) {
       console.log(`Applying controlled phase (${phase}) between qutrits ${controlQutrit} and ${targetQutrit}`);
       if (this.qutrits[controlQutrit][2].magnitude() > 0.5) {
           this.qutrits[targetQutrit] = this.qutrits[targetQutrit].map(amplitude =>
               amplitude.multiply(Complex.fromPolar(1, phase))
           );
       }
   },

   applyDecoherence: function(qutritIndex) {
       console.log(`Applying decoherence to qutrit ${qutritIndex}`);
       this.qutrits[qutritIndex] = this.qutrits[qutritIndex].map(amplitude =>
           amplitude.randomPhaseShift()
       );
   },

   performQFT: function() {
       console.log("Performing QFT on qutrits");
       for (let i = 0; i < this.qutrits.length; i++) {
           this.applyGeneralizedHadamard(i);
           for (let j = i + 1; j < this.qutrits.length; j++) {
               this.applyControlledPhase(i, j, Math.PI / (3 ** (j - i)));
           }
           this.applyDecoherence(i);
       }
   }
};

// Example usage
quantumCircuit.performQFT();
console.log(quantumCircuit.qutrits.map(q => q.map(c => c.toString())));
