require('colors')
const Tarea = require('./tarea')

class Tareas {
    _listado = {}

    get listadoArr () {
        const listado = []

        Object.keys(this._listado).forEach(key => listado.push(this._listado[key]))

        return listado
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea(id) {
        if(this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea(descripcion){
        const tarea = new Tarea(descripcion)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.map(({desc, compleadoEn}, index) => {
            console.log(`${(index + 1).toString().green}${'.'.green} ${desc} ::::> ${compleadoEn ? 'Completado'.green : 'Pendiente'.red}`);
        })
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0
        this.listadoArr.map(({desc, compleadoEn}) => {
            if (completadas && compleadoEn) {
                contador += 1
                console.log(`${contador.toString().green}${'.'.green} ${desc} ::::> ${compleadoEn.green}`);
            }
            if (!completadas && !compleadoEn) { 
                contador += 1
                console.log(`${contador.toString().green}${'.'.green} ${desc} ::::> ${'Pendiente'.red}`);
            }
        })
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id]
            if( !tarea.compleadoEn ){
                tarea.compleadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].compleadoEn = null
            }
        })
    }
}

module.exports = Tareas