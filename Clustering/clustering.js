const fs = require("fs");
let arrayCol;
let arrayRow;
let arraypassenger = [];

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("An error occurred while reading the file:", err);
    return;
  }
  //take value in input.txt.
  const lines = data.split("\n").map((line) => line.trim());
  let array2D = lines.map((line) => line.split(","));
  
  //delete nonclass
  array2D = array2D.filter(row => row[array2D[0].length - 1] !== "?");

  //find array length
  arrayCol = array2D[0].length;
  arrayRow = array2D.length;
  arraypassenger = [];

  //find how many classes are in the series.
  for (let l = 0; l < arrayRow; l++) {
    if (!arraypassenger.includes(array2D[l][arrayCol - 1])) {
      arraypassenger.push(array2D[l][arrayCol - 1]);
    }
  }

  //create new array for mean
  let tempmean = new Array(arraypassenger.length)
    .fill()
    .map(() => new Array(arrayCol - 1).fill(0)); 

  let sum = 0;
  let counter = 0;

  //found the mean for every class and column and add the new array this values
  for (let e = 0; e < arraypassenger.length; e++) {
    for (let c = 0; c < arrayCol - 1; c++) {
      sum = 0;
      counter = 0; 
      for (let r = 0; r < arrayRow; r++) {
        if (array2D[r][c] === "?") {
          continue; 
        }
        if (array2D[r][arrayCol - 1] === arraypassenger[e]) {
          sum += +array2D[r][c]; 
          counter++;
        }
      }
      if (counter > 0) { 
        tempmean[e][c] = sum / counter;
      }
    }
  }

  //fill the missing value with mean
  for (let a = 0; a < arrayRow; a++) {
    for (let b = 0; b < arrayCol - 1; b++) {
      if (array2D[a][b] === "?") {
        for (let d = 0; d < arraypassenger.length; d++) {
          if (array2D[a][arrayCol - 1] === arraypassenger[d]) {
            array2D[a][b] = tempmean[d][b];
          }
        }
      }
    }
  }

  // classtring------------------------------------------------------------------------------------------
  let K = -2;

  let clusterDistance = new Array(arrayRow).fill().map(() => new Array(K).fill(0)); 
  let clusterCenter = new Array(K).fill().map(() => new Array(arrayCol - 1).fill(0)); 
  let centerCommitment = new Array(arrayRow).fill(0);
  let centerCommitmentpast = new Array(arrayRow).fill(0);
  let randomNumbers = [];

  for (let n = 0; n < K; n++) {
    let randomNum = Math.floor(Math.random() * arrayRow);
    randomNumbers.push(randomNum);
  }

  for (let f = 0; f < 1000; f++) {
    if (f === 0) {
      for (let h = 0; h < randomNumbers.length; h++) {
        clusterCenter[h] = array2D[randomNumbers[h]].slice(0, arrayCol - 1);
      }
    }
    
    // Mesafelerin ölçüldüğü yer
    for (let m = 0; m < clusterCenter.length; m++) {
      for (let o = 0; o < arrayRow; o++) {
        clusterDistance[o][m] = 0; 
        for (let p = 0; p < arrayCol - 1; p++) {
          clusterDistance[o][m] += Math.abs(array2D[o][p] - clusterCenter[m][p]);
        }
      }
    }

    centerCommitmentpast = [...centerCommitment]; 

    // Kümelemelerin belirlendiği yer
    for (let e = 0; e < arrayRow; e++) {
      centerCommitment[e] = clusterDistance[e].indexOf(Math.min(...clusterDistance[e]));
    }

    // Önceki kümelemeyle karşılaştırma
    if (JSON.stringify(centerCommitmentpast) === JSON.stringify(centerCommitment)) {
      console.log("last centers is :");
      console.log(clusterCenter);
      console.log("last commitment is :");
      console.log(centerCommitment);
      console.log("number of cycles :");
      console.log(f);
      break;
    }

    // Merkezlerin güncellenmesi.
    for (let m = 0; m < K; m++) {
      let summean = 0;
      let counter = 0;
      for (let o = 0; o < arrayCol - 1; o++) {
        summean = 0;
        counter = 0; 
        for (let p = 0; p < arrayRow; p++) { 
          if (centerCommitment[p] === m) {
            summean += +array2D[p][o]; 
            counter++;
          }
        }
        if (counter > 0) { 
          clusterCenter[m][o] = summean / counter;
        }
      }
    }
  }

  //console.log(centerCommitment);
  //console.log(centerCommitmentpast);

  // Write the solution in output.txt
  let dataString = array2D.map((row) => row.join(",")).join("\n");
  fs.writeFileSync("output.txt", dataString);
});
