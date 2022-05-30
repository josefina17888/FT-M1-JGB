"use strict";

/*
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo nodo al final de la lista;
  - remove: elimina el último nodo de la lista y retorna su valor (tener en cuenta el caso particular de una lista de un solo nodo y 
    de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro puede ser un valor o un callback. 
  En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado; en el segundo, buscamos un nodo cuyo valor, 
  al ser pasado como parámetro del callback, retorne true. 
  Ejemplo: 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, 
  busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/

function LinkedList() {
  this.head = null;
  this._length = 0;
}

function Node(value) {
  this.value = value;
  this.next = null;
}

LinkedList.prototype.add = function (param){
  let nodo = new Node(param); //creo un nuevo nodo para agregarlo
  let current = this.head; //defino un current como variable auxiliar para ir moviendome de posiciones en la lista, de manera de no afectar el this.head
  if (current === null){
    this.head = nodo; //si mi lista esta vacía (ergo, estoy arrancando y el único elemento es null) agrego mi nuevo nodo al head
    this._length++; // y se incrementa el length
    return; 
    } //acá siempre que un if no tenga un else le mando un return para que corte 
  while (current.next !== null){
    current = current.next //(ahora, si mi lista no esta vacía, necesito ir a recorrerla) mientras current.next no sea null (ergo, no estés al final de tu lista), segui moviendo current
  }
  current.next = nodo; //cuando se cortó ese while, el current está en el último nodo y ahí es donde agrego mi nuevo nodo
  this._length++;
  return nodo;
}

LinkedList.prototype.remove = function () {
  let current = this.head;
  if (current === null) return null;
  if (current.next === null) {
    let eliminado = current.value;
    this.head = null
    return eliminado;
    }
  while (current.next !== null) {
    if (current.next.next === null) {
      let eliminado = current.next.value;
      current.next = null;
      return eliminado;
    } 
  }
  
}

//- search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro puede ser un valor o un callback. 
  //En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado; en el segundo, buscamos un nodo cuyo valor, 
  //al ser pasado como parámetro del callback, retorne true. 
  //Ejemplo: 
  //search(3) busca un nodo cuyo valor sea 3;
  //search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, 
  //busca un nodo cuyo valor sea un número par.

LinkedList.prototype.search = function(arg) {
  let current = this.head; //variable auxiliar

  while (current !== null) { //mientras el busca anterior sea false y la posición no sea null, voy a estar buscando
    
    if (typeof arg === 'function'){ //si el parametro es una funcion
        if(arg(current.value) === true) { //si el valor de current.value o si el valor del nodo, al ser pasado como parametro del callback del parametro arg de esta funcion search, retorna true
          return current.value;
          }
   }
    else if (current.value === arg) {
      return current.value;
      } 

  current = current.next; //redefino current para que se vaya moviendo, esto es importantísimo!
  }
  return null;
}
   
    
  


/*
Implementar la clase HashTable.

Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir, posiciones posibles para almacenar la información), 
donde guardaremos datos en formato clave-valor (por ejemplo, {instructora: 'Ani'}).
Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). (Luego de haber pasado todos los tests, a modo de ejercicio adicional, 
  pueden modificar un poco la clase para que reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

La clase debe tener los siguientes métodos:
  - hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético, 
  suma el código numérico de cada caracter del input (investigar el método charCodeAt de los strings) 
  y calcula el módulo de ese número total por la cantidad de buckets; de esta manera determina la posición de la tabla en la que se almacenará el dato.
  - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash, 
  y almacena todo el conjunto en el bucket correcto.
  - get: recibe una clave por parámetro, 
  y busca el valor que le corresponde en el bucket correcto de la tabla.
  - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave (retorna un booleano).

Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla. Primero puedo chequear, con hasKey, si ya hay algo en la tabla con el nombre 'instructora'; 
luego, invocando set('instructora', 'Ani'), se almacenará el par clave-valor en un bucket específico (determinado al hashear la clave)
*/
function HashTable () { //implemento hashtable como un arreglo de 35 posiciones
  this.tabla = [];
  this.numBuckets = 35;
};

HashTable.prototype.hash = function (key) { 
  let hasheo = 0;
  for (let i = 0; i < key.length; i++) {
  hasheo += key.charCodeAt(i); 
  };
  return hasheo % this.numBuckets;
};

HashTable.prototype.hasKey = function (key){
  let bucket = this.hash(key) // tengo que generar una variable que me pueda representar los distintos buckets y hashearlos
  if (!this.tabla[bucket]) return false;
  return this.tabla[bucket].hasOwnProperty(key); //retorna el booleano de si tiene la propiedad o no
};

HashTable.prototype.set = function (key, value) {
    let buckety = this.hash(key);
    if (typeof key != "string") throw new TypeError("Keys must be strings"); //tiro el error que me pedía el test
    if (!this.tabla[buckety]) this.tabla[buckety] = {}; //si no existe el bucket con ese key, creo el bucket con ese key, como un objeto, Las colisiones las maneja haciendo que cada bucket de la HashTable sea un objeto
    this.tabla[buckety][key] = value; // y le asigno el valor
  };

HashTable.prototype.get = function (key) {
    let indice = this.hash(key);
    if (!this.tabla[indice]) return null;
    return this.tabla[indice][key];
  };




// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  Node,
  LinkedList,
  HashTable,
};
