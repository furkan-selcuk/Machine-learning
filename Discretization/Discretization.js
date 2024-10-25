
                                        //Equal Width Discretization

function equalWidthDiscretization(A, k) {
    // Step 1
    A.sort((a, b) => a - b);

    // Step 2
    const amin = A[0];
    const amax = A[A.length - 1];

    // Step 3
    const interval = (amax - amin) / k;

    // Step 4
    const boundaries = [];
    for (let i = 1; i < k; i++) {
        boundaries.push(amin + i * interval);
    }

    // Step 5
    const D = A.map(value => {
        for (let i = 0; i < boundaries.length; i++) {
            if (value < boundaries[i]) {
                return i;
            }
        }
        return boundaries.length; 
    });

    return D;
}
                                        //Equal Frequency Discretization


function equalFrequencyDiscretization(A, k) {
    // Step 1
    A.sort((a, b) => a - b);

    const n = A.length;

    // Step 2
    const elementsPerBin = Math.ceil(n / k);

    // Step 3
    const D = new Array(n).fill(0); 
    let binIndex = 0;

    // Her aralıkta belli sayıda eleman olmasını sağladım
    for (let i = 0; i < n; i++) {
        D[i] = binIndex;

        if ((i + 1) % elementsPerBin === 0 && binIndex < k - 1) {
            binIndex++; 
        }
    }

    return D;
}
const A = [85, 90, 86, 96, 80, 70, 65, 95, 75, 91];
const k = 5;


const discretizedDataForFrequency = equalFrequencyDiscretization(A, k);

console.log("Discretized Data on frequency:", discretizedDataForFrequency);


const discretizedDataForWidth = equalWidthDiscretization(A, k);

console.log("Discretized Data on width:", discretizedDataForWidth);