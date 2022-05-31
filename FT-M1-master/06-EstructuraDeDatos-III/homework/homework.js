"use strict";

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, 
  según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

function BinarySearchTree(value) {
  this.value = value; //los tests hablaban de tree.value, por eso uso value y no root...
  this.left = null;
  this.right = null;
}

BinarySearchTree.prototype.insert = function (value) {
  if (this.value > value) { // en this.value inicial hay valor siempre, porque con esa root se inicializa el binary, ahora tengo que preguntar si el parámetro es mayor o menor que this.value, para ver si lo coloco a la derecha o a la izquierda
    if (this.left === null) this.left = new BinarySearchTree(value); //si el parametro es menor que el this.value, va a la izquierda, si la izquierda esta vacía, lo meto (esa es mi condicion de corte)
    else this.left.insert(value); //si no está vacía, corro de nuevo la función
    } 
  else if (this.value < value) { //si el parametro es mayor a this.value, va a la derecha del mismo
    if (this.right === null) this.right = new BinarySearchTree(value); //si this.right está vacío puedo meter el nuevo arbol (esa es mi condición de corte)
    else this.right.insert(value); //si no está vacío, hay que volver a correr la función
    }
    return new BinarySearchTree(value); 
};
BinarySearchTree.prototype.contains = function (value) {
  if (value === this.value) return true ; //si el parametro es igual a this.value ya puedo retornar true (esta es mi condicion de corte principal)
  
  if (value > this.value) { //si no son iguales, tengo que chequear si el parametro es mayor o menor que this.value, si es mayor va a su derecha
      if (this.right === null) return false; //si en this.right no hay valor, significa que recorrí todo derecha y no encontré el parametro, retornar falso (esta es mi condición de corte alternativa)
      else return this.right.contains(value); //si hay valor en this.right, tengo que correr de nuevo la funcion para ver si, ahora sí, es igual al parametro
    }

  if (value < this.value){ //si el parametro es menor que this.value, va a su izquierda
      if (this.left === null) return false; //si en this.left no hay valor, significa que recorrí todo izquierda y no encontré el parametro, retornar falso (esta es mi condición de corte alternativa)
      else return this.left.contains(value); //si hay valor en this.left, tengo que correr de nuevo la función para ver si, ahora si, el this.value es igual al parámetro
    }
}
;
BinarySearchTree.prototype.size = function () {
  var contador = 1;
  if (this.left) {
    contador += this.left.size();
  } 
  if (this.right) {
    contador += this.right.size();
  }  
  return contador
};
BinarySearchTree.prototype.depthFirstForEach = function (cb, order = "in-order") {
  //esto se podría haber hecho con solo cb y order en los argumentos y con 
  //if (order === pre-order) else if (order === postorder) y else ((y acá poner el in order así es siempre por defecto))
  switch (order) {
    case "in-order": {
      if (this.left) this.left.depthFirstForEach(cb, order);
      cb(this.value);
      if (this.right) this.right.depthFirstForEach(cb, order);
      break;
    }
    case "pre-order": {
      cb(this.value);
      if (this.left) this.left.depthFirstForEach(cb, order);
      if (this.right) this.right.depthFirstForEach(cb, order);
      break;
    };
    case "post-order": {
      if (this.left) this.left.depthFirstForEach(cb, order);
      if (this.right) this.right.depthFirstForEach(cb, order);
      cb(this.value);
      break;
    };
  }

};
BinarySearchTree.prototype.breadthFirstForEach = function(cb, array = []) {
  //Para pasarle un array a una recursiva, hay que meterlo en los argumentos
  //Arranco por la raiz y luego a los siguientes niveles
  cb (this.value)
  //Si tengo izq lo agrego al array
  if (this.left) array.push(this.left)
  //Si tengo der lo agrego al array
  if (this.right) array.push(this.right)
  //Mientras tenga algo en el array, va sacando el primero del array y corriendole la funcion para ir recorriendo sus niveles
  if (array.length) {
    array.shift().breadthFirstForEach(cb, array)
  }
}


// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  BinarySearchTree,
};
