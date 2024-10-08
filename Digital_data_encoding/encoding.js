const fs = require('fs');
let arrayCol;
let arrayRow;
let arraypassenger = [];
//data extraction process.
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Dosya okunurken bir hata oluştu:', err);
    return;
  }
  //transferring the captured data to the array.
  const lines = data.split('\n').map(line => line.trim());
  let array2D = lines.map(line => line.split(','));
  arrayCol = array2D[0].length;
  arrayRow = array2D.length;
//Learning columns that do not contain numerical values
  for (let j = 0; j < arrayCol - 1; j++) {
    if (isNaN(array2D[0][j])) {
      for (let k = 0; k < arrayRow; k++) {
        if (!arraypassenger.includes(array2D[k][j])) {
          arraypassenger.push(array2D[k][j]);
        }
      }
      //converting non-numeric values ​​to numeric values.
      for (let i = 0; i < arrayRow; i++) {
        array2D[i][j] = arraypassenger.indexOf(array2D[i][j]) + 1;
      }
      arraypassenger = [];
    }
  }
  //Finding out how many different classes there are
  for (let l = 0; l < arrayRow; l++) {
    if (!arraypassenger.includes(array2D[l][arrayCol - 1])) {
      arraypassenger.push(array2D[l][arrayCol - 1]);
    }
  }
  //create new array
  let newarray = Array.from(Array(arrayRow), () => new Array(arrayCol + arraypassenger.length - 1));
  //Transferring all properties except the class to the new array
  for (let a = 0; a < arrayRow; a++) {
    for (let b = 0; b < arrayCol-1; b++) {
      newarray[a][b] = array2D[a][b];
    }
  }
  //Transferring classes to a new array by expressing them as 0 and 1
  for(let c= 0;c < arraypassenger.length;c++){
    for(let d = 0;d <arrayRow;d++){
      if(array2D[d][arrayCol-1] == arraypassenger[c]){
        newarray[d][arrayCol-1+c] = 1
      }else{
        newarray[d][arrayCol-1+c] = 0
      }
    }
  }
  
 // console.log(array2D);
 // console.log(newarray);
  
 //printing the result
  let dataString = newarray.map(row => row.join(',')).join('\n');
  fs.writeFileSync('output.txt', '');
  fs.writeFileSync('output.txt', dataString);
});
