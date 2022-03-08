//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// eventos 

addEventListener();
function addEventListener(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto );

    formulario.addEventListener('submit', agregarGasto)

}; // Te pregunta apenas se carga el documento Tu presupuesto

//Clases 

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}


class UI {

    insertarPresupuesto (cantidad) {
       
       //Tomamos los valores del Presupuesto
        const {presupuesto, restante } = cantidad;
       
        
        //Agregamos esto en  HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta() {
        
    }
}














//Instanciar
const ui = new UI();
let presupuesto

//Funciones 

//Con esta primera funcio nos vamos a encargar que rellenen el primer campo con informacion valida 

function preguntarPresupuesto () {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');

/*Ahora comprobamos si se cumplen las condiciones
 1. Si es un resultado vacio
 2-3-4 Si son resultados invalidos como letras o numeros negativos*/
   
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ){
        window.location.reload() // Esto recarga la pagina
    }

    //Mostramos el Presupuesto Valido
    presupuesto = new Presupuesto(presupuestoUsuario);

    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}

//Añade Gastos

function agregarGasto(e) {
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value
    const cantidad = document.querySelector('#cantidad').value

    if(nombre === '' ||  cantidad === '' ) {
        ui.imprimirAlerta();
    }

}

//Cambios en GitHub
//Cambios en el codigo desde la CANAIAMA