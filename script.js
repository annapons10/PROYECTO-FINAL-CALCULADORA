class Calculadora{

    constructor(){ //Atributos
        this.resultado = 0;
        this.displayValue = '0'; //string porque es mas fácil de manejar. 
        this.ultimoOperador = null; 
    }

    digitoDeEntrada(boton){
       
        if (this.displayValue === '0' || this.displayValue === undefined){
            this.displayValue = boton;
            console.log(this.displayValue);
        }else{
            this.displayValue = this.displayValue + boton;
        }
        return this.displayValue;
    }


    reestablecerNumero (){
        this.displayValue = '0';
    }

    reestablecerNumeroDePorcentaje(){ //para el porcentaje. 
        this.displayValue = undefined; 
    }


    cambiarSigno (){
        //Primero manejar cambio signo. 
        return this.displayValue = -this.displayValue; //el - cambia el signo al número dependiendo de como entre.   
    } 
 

   calcularTotal(operador){
        //Suma, resta, multiplicación, división, porcentaje. 
        let valor = Number(this.displayValue);
        if(this.resultado === 0 && this.ultimoOperador === null){
            this.resultado = valor;
        }else if(this.ultimoOperador !== null){
            switch (this.ultimoOperador) {
                case '+':
                    this.resultado += valor;
                    break;
                case '-':
                    this.resultado -= valor;
                    break;
                case 'x':
                    this.resultado *= valor;
                    break;
                case '÷':
                    this.resultado /= valor; //lo paso a número al ponerle un + delante de la variable.
                    break;
                case '%':
                    if(this.displayValue === undefined){
                        this.resultado = this.resultado / 100;
                    }else{
                        this.resultado = (this.resultado * valor) / 100;
                    }
                break;
            }

        } 
        this.ultimoOperador = operador;
    }

    calcularIgual() {
        return String(this.resultado);
    }

   reestablecerCalculadora(){ //AC
        this.resultado = 0;
        this.displayValue = '0';
        return this.displayValue;
    }

}


//INTERACCIÓN DOM. 

//Primero guardo los botones en variables. 
const display = document.getElementById("display");
//Instancio una calculadora.
const calculadora = new Calculadora();

const botonesNum = document.querySelectorAll(".button-num")
const botonReset = document.getElementById("reset");
const botonNegativo = document.getElementById("negative");
const botonDividir = document.getElementById("dividir");
const botonMultiplicar = document.getElementById("multiplicar");
const botonRestar = document.getElementById("restar");
const botonSumar = document.getElementById("sumar");
const botonPunto= document.getElementById("spot");
const botonIgual = document.getElementById("equal");
const botonesOperador = document.querySelectorAll(".botonesOperador");
const botonPorcentaje = document.getElementById("percentage");
const todosLosCirculos = document.getElementById("circulos");
const primerCirculo = todosLosCirculos.children[0];
const segundoCirculo = todosLosCirculos.children[1];
const tercerCirculo = todosLosCirculos.children[2];
let operador;
let valoraEnviar; //trabajar siempre con el mismo para todas las funciones? 
let valorCero;
let valorTotal;

function cambiarColorTemporal(circulo, clase, tiempo){
    circulo.classList.add(clase);
    setTimeout(() =>{
        circulo.classList.remove(clase);
    }, tiempo);
}

//Itero sobre los botones numero para actualizar la pantalla en display con los números que se clicken. 
botonesNum.forEach(boton => {
    boton.addEventListener('click', () =>{
        valoraEnviar = calculadora.digitoDeEntrada(boton.textContent);
        display.textContent = valoraEnviar;
    }); 
});

botonesOperador.forEach(boton =>{ //cada vez que un usuario le de algun operador, será cuando agregé el número en el array.
    boton.addEventListener('click', () =>{
        operador = boton.textContent;
        calculadora.calcularTotal(operador);
        calculadora.reestablecerNumero(); //para que el nuevo número empiece de 0 y no se una al anterior. 
        display.textContent = operador;
        cambiarColorTemporal(segundoCirculo, 'circleCambiar', 500);
    });

});

botonPorcentaje.addEventListener('click', () =>{
    calculadora.calcularTotal(botonPorcentaje.textContent); //se lo asigno asi para que en la función pueda distinguir entre las dos opciones y calcular correctamente el porcentaje.
    calculadora.reestablecerNumeroDePorcentaje(); //para que el nuevo número empiece de 0 y no se una al anterior. 
    display.textContent = botonPorcentaje.textContent;
    cambiarColorTemporal(segundoCirculo, 'circleCambiar', 500);
});



botonPunto.addEventListener('click', () =>{
    calculadora.digitoDeEntrada(botonPunto.textContent);//valor. mostrarlo aqui.
});

botonIgual.addEventListener('click', () =>{ //Se resuelve el total.
    calculadora.calcularTotal(null); // ya se quedará null.
    valorTotal = calculadora.calcularIgual();
    display.textContent = valorTotal;
    calculadora.reestablecerNumero(); //limpiar display.value.
    cambiarColorTemporal(tercerCirculo, 'circleCambiar', 500);
}); 



botonReset.addEventListener('click', () =>{
    valorCero = calculadora.reestablecerCalculadora(); //trabajar siempre con la misma variable de valor?
    display.textContent = valorCero;
    cambiarColorTemporal(primerCirculo, 'circleCambiar', 500); 
});

botonNegativo.addEventListener('click', () =>{ //Llama primero a cambiar signo, lo hace y luego lo agrega y calcula. 
    valoraEnviar = calculadora.cambiarSigno();
    display.textContent = valoraEnviar;
}); 