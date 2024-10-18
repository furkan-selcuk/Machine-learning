const fs = require("fs");
const { isNumber } = require("util");
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
  array2D = array2D.filter((row) => row[array2D[0].length - 1] !== "?");

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

            //over sampling

  //determine the arrays ​​to use

  let mins = new Array(arraypassenger.length)
    .fill()
    .map(() => new Array(arrayCol - 1).fill(20));
  let maxs = new Array(arraypassenger.length)
    .fill()
    .map(() => new Array(arrayCol - 1).fill(0));

  //min ve max değerlerin bulunması
  for (let a = 0; a < arraypassenger.length; a++) {
    for (let b = 0; b < arrayCol - 1; b++) {
      for (let c = 0; c < arrayRow; c++) {
        if (arraypassenger[a] == array2D[c][arrayCol - 1]) {
          if (array2D[c][b] <= mins[a][b]) {
            mins[a][b] = array2D[c][b];
          }
          if (array2D[c][b] >= maxs[a][b]) {
            maxs[a][b] = array2D[c][b];
          }
        }
      }
    }
  }
  // determine the values ​​to use.
  let clastooversampling = "x";
  let countTosampling = 3;

  //controls
  if (countTosampling < 0 || isNaN(countTosampling))
    return console.log("you entered invalid number for count to sampling");
  if (!arraypassenger.includes(clastooversampling))
    return console.log("please enter a valid class");

  //our samples add to array
  for (let c = 0; c < countTosampling; c++) {
    let temparray = new Array(arrayCol);
    for (let a = 0; a < arraypassenger.length; a++) {
      for (let b = 0; b < arrayCol - 1; b++) {
        if (clastooversampling == arraypassenger[a]) {
          temparray[arrayCol - 1] = arraypassenger[a];
          let randomValue =
            Math.random() * (maxs[a][b] - mins[a][b]) + mins[a][b];
          temparray[b] = Math.round(randomValue * 100) / 100;
        }
      }
    }
    array2D.push(temparray);
  }

  //check the arrays are fill true value
  //console.log(mins);
  //console.log(maxs);

  // Write the solution in output.txt
  let dataString = array2D.map((row) => row.join(",")).join("\n");
  fs.writeFileSync("output.txt", dataString);
});
