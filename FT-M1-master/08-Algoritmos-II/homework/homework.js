'use strict'
// No cambies los nombres de las funciones.

function quickSort(array) {
  // Implementar el método conocido como quickSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
let pivote = array[Math.floor(Math.random()*array.length)]; //defino mi pivote, que es una posición en el array, un indice random, número entero
//ahora necesito dividir, todo lo que sea menor y todo lo que sea mayor a ese pivote
let right = [];
let left = [];
let equals = [];
if (array.length <= 1) return array; //esta es mi condición base
for (let i = 0; i < array.length; i++) {
  if (array[i]<pivote) {
    left.push(array[i]);
  } else if (array[i]>pivote) {
    right.push(array[i]);
  } else {
    equals.push(array[i]);
  }
}
  //lo dividí en tres subarrays, ahora necesito hacer sucesivamente lo mismo, necesito recursividad, en dónde llamo a la función?
  return quickSort(left).concat(equals).concat(quickSort(right));
}


function mergeSort(array) {
  // Implementar el método conocido como mergeSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
  if (array.length <= 1) return array; //condición de corte, si el array es de un elemento o menos
  let middle = Math.floor(array.length/2); //variable posición del medio
  let left = array.slice(0,middle); //array para guardar la mitad para un lado
  let right = array.slice(middle); //array para guardar la mitad para el otro lado
  return merge(mergeSort(left),mergeSort(right));
  }

  function merge (arrayUno, arrayDos){
    // llegan dos arrays ordenados y devuelve un array ordenado con todos los valores
    let unoIndex = 0;
    let dosIndex = 0;
    let array = [];
    //[1,2,4,7].concat([7,10]  ).concat([])
    //[4,7,10]    //[1,2,7]
   //    ^                  ^
    while(unoIndex < arrayUno.length && dosIndex < arrayDos.length){
      if(arrayUno[unoIndex] < arrayDos[dosIndex]){
        array.push(arrayUno[unoIndex])
        unoIndex = unoIndex + 1
      }else{
        array.push(arrayDos[dosIndex])
        dosIndex++
      }
    }
    return array.concat(arrayUno.slice(unoIndex)).concat(arrayDos.slice(dosIndex))
  }


// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
  quickSort,
  mergeSort,
};
