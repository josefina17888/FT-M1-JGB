const {
    Queue,
    Node,
    LinkedList,
    BinarySearchTree
} = require('./DS.js')

// Implementar la función countArray: a partir de un array en el cual cada posición puede ser un único
// número u otro array anidado de números, determinar la suma de todos los números contenidos en el array.
// El array será recibido por parámetro.
// Ejemplo:
//    const array = [1, [2, [3,4]], [5,6], 7];
//    countArray(array); --> Debería devolver 28 (1 + 2 + 3 + 4 + 5 + 6 + 7)
// Pista: utilizar el método Array.isArray() para determinar si algun elemento de array es un array anidado
// [Para más información del método: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/isArray]

var countArray = function(array) {
    // Tu código aca:
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            suma = suma + countArray(array[i]);
        } else {
            suma = suma + array[i];
        }
    }
    return suma;
}


// Implementar la función countProps: a partir de un objeto en el cual cada propiedad puede contener
// cualquier tipo de dato, determinar la cantidad de propiedades de objetos en cualquier nivel, ya sea el inicial
// u objetos anidados
// Ejemplo:
// var obj = {
//   a: {
//     a1: 10,
//     a2: 'Franco',
//     a3: {f: 'r', a: 'n', c: {o: true}}
//   },
//   b: 2,
//   c: [1, {a: 1}, 'Franco']
// } //!el a de adentro del array de c, no la voy a contar, porque solo cuento si estoy mirando un objeto, el c es un array
// countProps(obj)--> Deberia devolver 10 ya que el objeto inicial tiene 3 propiedades, pero a su vez
// dentro de a tenemos 3 propiedades mas, luego a3 tiene otras 3 y por ultimo c tiene una extra.
// Propiedades: a, a1, a2, a3, f, a, c, o, b, c --> 10 en total

var countProps = function(obj) {
    // Tu código aca:
    let total = Object.keys(obj).length; //object keys devuelve en un array todos las propiedades de un objeto, le pongo el .length y estoy sumandolas
    for (const prop in obj){ //ahora, necesito ver si las propiedades tienen objetos anidados, por lo que recorro el objeto
       if (typeof obj[prop] === 'object' && !Array.isArray(obj[prop])) { //corroboro que lo que contiene cada propiedad sea un objeto y no sea un array
       total = total + countProps(obj[prop]) //si en efecto es un objeto y no un array, llamo a la recursión porque, nuevamente, necesito contar las propiedades que tiene ese objeto (y sumarselas al total)
       }
    }
    return total;
}


// Implementar el método changeNotNumbers dentro del prototype de LinkedList que deberá cambiar
// aquellos valores que no puedan castearse a numeros por 'Kiricocho' y devolver la cantidad de cambios que hizo
// Aclaracion: si el valor del nodo puede castearse a número NO hay que reemplazarlo
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> ['2'] --> [false] --> ['Franco']
//    lista.changeNotNumbers();
//    Ahora la lista quedaría: Head --> [1] --> ['2'] --> [false] --> ['Kirikocho] y la función debería haber devuelto el valor 1

LinkedList.prototype.changeNotNumbers = function(){
    // Tu código aca:
    // poder revisar si se puede castear a numeros
    // solo reemplazar los que no se pueden castear por Kiricocho
    // recorrer toda la list
    let current = this.head; //defino un current para moverme
    let sumar = 0; //defino variable para ir sumando reemplazados por kiricocho
    while (current) { //mientras haya un current
        if (Number.isNaN(Number(current.value))) { //uso el metodo Number.isNan para chequear si el currentvalue es un number (el metodo requiere adentro poner Number)
            current.value = "Kiricocho"; //si es NaN, reemplazo por Kiricocho
            sumar = sumar + 1; //sumo a la variable que cuenta los reemplazos
        }
        current = current.next;//muevo el current
    }
    return sumar;
}


// Implementar la función mergeQueues que a partir de dos queues recibidas por parametro
// debe devolver una nueva Queue que vaya mergeando los nodos de las anteriores.
// Ejemplo:
// - queueOne: [7,3,5]
// - queueTwo: [2,4,6]
// mergeQueues(queueOne, queueTwo) --> [7,2,3,4,5,6]
// IMPORTANTE: NO son arreglos sino que son Queues.

var mergeQueues = function(queueOne, queueTwo) {
    // Tu código aca:
    // ir haciendo entrar una posición de cada una de las colas
    // necesito devolver una nueva Queue/cola, por lo cual necesito crearla
    let newQueue = new Queue();
    while (queueOne.size() || queueTwo.size()){
        if (queueOne.size()) {
         newQueue.enqueue(queueOne.dequeue())//a mi nueva cola le agrego lo que le saco a la fila uno
         }
        if (queueTwo.size()) {
         newQueue.enqueue(queueTwo.dequeue())//a mi nueva cola le agrego lo que le saco a la fila uno
         }
    }
    return newQueue;
} //entran de a uno porque el while corre primero el primer if, despues el segundo y luego vuelve a arrancar


// Implementar la funcion closureMult que permita generar nuevas funciones que representen
// las tablas de multiplicación de distintos numeros
// Ejemplo: 
// - var multByFour = closureMult(4);
// - multByFour(2) --> 8 (2 * 4)
// - multByFour(5) --> 20
// - var multBySix = closureMult(6);
// - multBySix(4) --> 24

var closureMult = function(multiplier) {
    // Tu código aca:
    return function(num){
       return num * multiplier; //multiplier está en el hoisting, no necesito llamarla de nuevo o declararla acá
    }
}

// Implementar el método sum dentro del prototype de BinarySearchTree
// que debe retornar la suma total de los valores dentro de cada nodo del arbol
BinarySearchTree.prototype.sum = function() {
    // Tu código aca:
    //voy a dejar de sumar cuando no tenga left o right
    let suma = this.value;
    if (this.left) {
        suma = suma + this.left.sum() //cuando tenga izquierda, le va a preguntar cuanto suma, y así sucesivamente hasta que no tenga izquierda
    }
    if (this.right) {
        suma = suma + this.right.sum() //lo mismo con la derecha
    }
    return suma;
}

module.exports = {
    countArray,
    countProps,
    mergeQueues,
    closureMult
}