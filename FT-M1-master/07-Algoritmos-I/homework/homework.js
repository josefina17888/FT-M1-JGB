'use strict'
// No cambies los nombres de las funciones.

function factorear(num) {
  // Factorear el número recibido como parámetro y devolver en un array
  // los factores por los cuales se va dividiendo a dicho número (De menor a mayor)
  // Ej: factorear(180) --> [1, 2, 2, 3, 3, 5] Ya que 1x2x2x3x3x5 = 180 y son todos números primos
  // Tu código:
// Para factorizar un número o descomponerlo en factores efectuamos sucesivas divisiones entre sus divisores primos hasta obtener un uno como cociente.

var myArray = [1]; //uno si o si va a ser uno de los divisores, ya lo pongo en el arreglo
let divisor = 2; //arranco dividiendo desde dos
while (num > 1) { //mientras que el numero a factorear sea mayor a uno
  if (num%divisor === 0) { //si el modulo de la división entre el numero y el divisor es cero
    myArray.push(divisor); //meto el divisor en el nuevo array
    num = num/divisor; //y ejecuto la división
  } else {
    divisor++; //si no es cero el modulo, incremento el divisor
  }
}
return myArray;
}

function bubbleSort(array) {
  // Implementar el método conocido como bubbleSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
let n = array.length; //guardo la longitud del arreglo en una variable para ir modificandola
let swap = true; //defino una variable para los intercambios
while (swap) { //mientras swap sea true
  swap = false; //pongo swap en false
for (let i = 0; i < n; i ++) { //recorro el arreglo
  if (array[i] > array [i + 1]) { // y si array[i] es mayor al que le sigue
    let temporal = array[i]; //guardo el valor de array[i] en una variable para no perderlo al reasignarlo
    array[i] = array[i + 1]; //le asigno el valor siguiente (que era menor según se comprobó en la fila 42)
    array[i + 1] = temporal;//y a la posición que seguía le asigno el array[i] que era mayor, que lo había guardado en temporal
    swap = true;//pongo swap en true para que el while vuelva a arrancar
  }
}
}
return array; //retorno el arreglo
}


function insertionSort(array) {
  // Implementar el método conocido como insertionSort para ordenar de menor a mayor
  // el array recibido como parámetro utilizando arreglos
  // Devolver el array ordenado resultante
  // Tu código:
  //let n = array.length;
  //let swap;
  //do {
  //  swap = false;
  //for (let i = 0; i < n; i ++) {
  //  if (array[i] > array [i + 1]) { //si array[i] es mayor al que le sigue
  //    let temporal = array[i];
  //    array[i] = array[i + 1];
  //    array[i + 1] = temporal;
  //    swap = true;
  //  }
  //}
  //--n;
  //} while (swap);
  //return array;
  //}
  for (let i = 1; i < array.length; i++) { //recorro el arreglo, OJO DESDE EL 1
    let j = i - 1; //defino una variable j para comparar i con su anterior
    let temporal = array[i]; //defino una variable auxiliar para guardar el contenido de i
    while (j >= 0 && array [j] > temporal) { //mientras que la variable j (la posición en array) sea mayor o igual a 0 y array[j] sea mayor que su siguiente (array[i] guardado en temporal)
      array [j+1] = array [j]; //le asigno j a su posicion siguiente
      j--; //decremento
    }
      array [j+1] = temporal; //cuando no se cumpla la condición del while, le asigno j+1 a i o temporal
  }
  return array;
}

function selectionSort(array) {
  // Implementar el método conocido como selectionSort para ordenar de menor a mayor
  // el array recibido como parámetro utilizando dos arreglos
  // Devolver el array ordenado resultante
  // Tu código:
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i+1; j < array.length; j++) {
      if (array[min]>array[j]) {
        min = j;
      }
    }
      if (i !== min) {
        let aux = array[i];
        array[i] = array[min];
        array[min] = aux;
      }  
    }
    return array;
}
//mientras n > 0 && > array.length + 1
//recorro el arreglo, encuentro el más chico
//lo copio en otro arreglo y lo saco del arreglo actual



// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
  factorear,
  bubbleSort,
  insertionSort,
  selectionSort,
};
