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
    nuevoGasto(gasto) {

        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();

    }

    calcularRestante () {
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0);
        this.restante  = this.presupuesto - gastado;

        console.log(this.restante);
    }


}


class UI {

    insertarPresupuesto (cantidad) {
       
        this.limpiarHTML(); // Elimina el Html previo


       //Tomamos los valores del Presupuesto
        const {presupuesto, restante } = cantidad;
       
        
        //Agregamos esto en  HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            divMensaje.classList.add ('alert-danger');
        } else {
            divMensaje.classList.add ('alert-success');
        }

        //Mensaje de Error
        divMensaje.textContent = mensaje;

        //insertar en el html

        document.querySelector('.primario').insertBefore (divMensaje, formulario);

        setTimeout(() => {
            divMensaje.remove();
        },3000);
    }

    agregarGastoListado(gastos) {
        
        this.limpiarHTML();
        //iterar sobre los gastos
        gastos.forEach ( gasto => {

            const {cantidad, nombre, id } = gasto;
            //Crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;
            //Agregar al HTML del gasto
            nuevoGasto.innerHTML = `
            ${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
            `            // BOTON PARA BORRAR EL GASTO
            const btnBorrar = document.createElement('buton');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times'
            nuevoGasto.appendChild(btnBorrar);
            //Agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        })
    }

        limpiarHTML() {
            while( gastoListado.firstChild ) {
                gastoListado.removeChild(gastoListado.firstChild);
            }
        }

        actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
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
    ui.insertarPresupuesto(presupuesto);
}

//Añade Gastos

function agregarGasto(e) {
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);
    //Validar 
    if(nombre === '' ||  cantidad === '' ) {
        ui.imprimirAlerta('Ambos Campos son obligatorios', 'error');
        
        return;
    }else if (cantidad <= 0 || isNaN (cantidad)) {
        ui.imprimirAlerta('Cantidad no Válida', 'error');
        return;
    }

    //generar un objeto con el gasto
    const gasto = { nombre, cantidad, id: Date.now() }

    //añade un nuevo gasto
    presupuesto.nuevoGasto (gasto);

    //Mensaje de todo bien
    ui.imprimirAlerta('Gasto Agregado Correctamente');

    //Imiprimir los gastos 
    const { gastos,restante } = presupuesto;
    ui.agregarGastoListado(gastos);
    ui.actualizarRestante(restante);

    //Reinicia el formulario
    formulario.reset();

}

