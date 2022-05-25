
# Homework JavaScript Avanzado I

## Scope & Hoisting

Determiná que será impreso en la consola, sin ejecutar el código.

> Investiga cuál es la diferencia entre declarar una variable con `var` y directamente asignarle un valor.

```javascript
x = 1;
var a = 5;
var b = 10;
var c = function(a, b, c) { //el hoisting la ve primero como declaración de variable, pero después busca su valor en la función que la define (si fuese directamente una función expresada, se guardaría directamente en el hoisting)
  var x = 10;
  console.log(x); //10
  console.log(a); //8
  var f = function(a, b, c) {
    b = a; 
    console.log(b); //8
    b = c; 
    var x = 5;
  }
  f(a,b,c); 
  console.log(b); //9
}
c(8,9,10);
console.log(b);//10
console.log(x);//1 
```

```javascript
console.log(bar); //undefined (está en el hoisting pero todavía no tomó valor)
console.log(baz); //baz is not defined (no está en el hoisting por no estar definido con var)
foo(); // Hola! (ojo acá, se debería romper antes de ejecutarse por el error de baz)
function foo() { console.log('Hola!'); }
var bar = 1;
baz = 2;
```

```javascript
var instructor = "Tony";
if(true) {
    var instructor = "Franco";
}
console.log(instructor); //Franco (el if es el mismo contexto de ejecución por eso redefine instructor... si adentro del if instructor estuviera definido como let, no hubiera trascendido las llaves del if -el let nace y muere entre llaves-)
```

```javascript
var instructor = "Tony";
console.log(instructor); //Tony
(function() {
   if(true) {
      var instructor = "Franco";
      console.log(instructor); //Franco
   }
})(); //Immediately invoked functions
console.log(instructor); //Tony
```

```javascript
var instructor = "Tony";
let pm = "Franco";
if (true) {
    var instructor = "The Flash";
    let pm = "Reverse Flash";
    console.log(instructor); //The Flash
    console.log(pm); //Reverse Flash (aca adentro es una variable distinta de la de afuera)
}
console.log(instructor); //The Flash (como es var la redefinimos al correr el if)
console.log(pm); // Franco (como es let se mantuvo)
```
### Coerción de Datos

¿Cuál crees que será el resultado de la ejecución de estas operaciones?:

```javascript
6 / "3" // 2
"2" * "3" //6
4 + 5 + "px" //9px (leemos de izquierda a derecha, por eso arrancó resolviendo la suma)
"$" + 4 + 5 //$45 (leemos de izquierda a derecha, por eso arrancó resolviendo en forma string)
"4" - 2 //2
"4px" - 2 //NaN
7 / 0 //0 (me dio Infinity, ¿qué significa?)
{}[0] // el {} es un scope vacio, no genera nada, el [0] es un arreglo con una única posición, la consola lo devuelve.
parseInt("09") //9 (es lo mismo que hacer el Number -parseInt, devuelve Integer, numero entero)
5 && 2 // 2 !!! ver nota en clover 
2 && 5 // 5 !!! ver nota en clover
5 || 0 // como 5 es true lo devuelve, ni evalua lo que viene despues
0 || 5 // como 0 es false, evalua 5 y, como es true, lo devuelve
[3]+[3]-[10] // 23 (son arreglos que se suman tipo string primero -siempre gana la suma de strings a la suma de números- y despues convierte a numero para poder hacer la resta -que esta solo definida para operaciones matemáticas, con números-)
3>2>1 // 3>2 da true y true>1 da false, devuelve false
[] == ![] // boolean de corchetes da true, boolean de no corchetes da false, no son estrictamente lo mismo pero como hay doble igual y no triple igual, el doble igual convierte los valores a number y ambos dan 0
```

> Si te quedó alguna duda repasá con [este artículo](http://javascript.info/tutorial/object-conversion).


### Hoisting

¿Cuál es el output o salida en consola luego de ejecutar este código? Explicar por qué:
// undefined y 2
// undefined porque le asigna valor a A luego de ya haber corrido el console log
// cuando hace el console.log de la funcion foo, la funcion pasa al stack, se corre el return 2 y luego vuelve al console.log de foo

```javascript
function test() {
   console.log(a);
   console.log(foo());

   var a = 1;
   function foo() {
      return 2;
   }
}

test();
```

Y el de este código? :
// undefined porque pide return snack adentro de la function get food, en esa function se corrió la creation phase, guardando var snack como undefined y como if es false, no entramos en esas llaves y no pudimos redefinir var snack (si el var snack de la funcion getfood hubiera sido un let snack, no se guardaría en hoisting y al pedir el valor de snack la funcion lo iría a buscar al contexto siguiente, encontrandolo como Meow Mix)
```javascript
var snack = 'Meow Mix';

function getFood(food) {
    if (food) {
        var snack = 'Friskies';
        return snack;
    }
    return snack; // undefined
}

getFood(false);
```


### This

¿Cuál es el output o salida en consola luego de ejecutar esté código? Explicar por qué:
// Aurelio de Rosa, scope de prop
// Juan Perez, ezplicación abajo
```javascript
var fullname = 'Juan Perez';
var obj = {
   fullname: 'Natalia Nerea',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname()); //invocando función

var test = obj.prop.getFullname; //asignando a obj una función

console.log(test()); //estamos ejecutando en el objeto global, test recibe la funcion "this.fullname" y busca full name primeramente en el objeto global en el que se está ejecutando, como ese objeto tiene fullname, es Juan Perez 
//!!! OJO, esto si lo hacemos en navegador, si lo hacemos en terminal node el contenido del objeto this no se muestra, this.fullname no encuentra full name y da undefined
```

### Event loop

Considerando el siguiente código, ¿Cuál sería el orden en el que se muestra por consola? ¿Por qué?
//console.log 1    1
//console.log 4    4
//settimeout 0     3
//settimeout 1000  2
```javascript
function printing() {
   console.log(1);
   setTimeout(function() { console.log(2); }, 1000);
   setTimeout(function() { console.log(3); }, 0);
   console.log(4);
}

printing();
```
