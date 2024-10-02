const fs = require("fs");
let arrayCol;
let arrayRow;
let arraypassenger = [];

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("An error occurred while reading the file:", err);
    return;
  }
  //take value in input.txt .
  const lines = data.split("\n").map((line) => line.trim());
  let array2D = lines.map((line) => line.split(","));
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
    .map(() => new Array(arrayCol - 1).fill(null));
  let sum = 0;
  let counter = 0;
  //found the mean for every class and colom and add the new array this values
  for (let e = 0; e < arraypassenger.length; e++) {
    for (let c = 0; c < arrayCol - 1; c++) {
      for (let r = 0; r < arrayRow; r++) {
        if (array2D[r][c] == "?") {
          continue;
        }
        if (array2D[r][arrayCol - 1] == arraypassenger[e]) {
          sum = sum + +array2D[r][c];
          counter++;
        }
      }
      tempmean[e][c] = sum / counter;
      sum = 0;
      counter = 0;
    }
  }
  //fill the missing value with mean
  for (let a = 0; a < arrayRow; a++) {
    for (let b = 0; b < arrayCol - 1; b++) {
      if (array2D[a][b] == "?") {
        for (let d = 0; d < arraypassenger.length; d++) {
          if (array2D[a][arrayCol - 1] == arraypassenger[d]) {
            array2D[a][b] = tempmean[d][b];
          }
        }
      }
    }
  }
  //if you want to write every solution
  //console.log(array2D);
  // console.log(arraypassenger);
  // console.log(tempmean);
  // write the solution in output.txt
  let dataString = array2D.map((row) => row.join(",")).join("\n");
  fs.writeFileSync("output.txt", "");
  fs.writeFileSync("output.txt", dataString);
});
