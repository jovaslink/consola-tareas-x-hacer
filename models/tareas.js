const { leerArchivo } = require("../helpers/guardarArchivo");
const Tarea = require("./tarea");

class Tareas {
    _listado = {};
    
    constructor(){
        this._listado = {};
    }

    get listadoArr () {
        const listado = [];
        let valores = Object.values(this._listado); 
        for(let i=0; i< valores.length; i++){
                listado.push(valores[i]);
        }
        return listado;
    }

    
    get archivoObjeto () {
        if (leerArchivo()) {
            const valores = Object.values(leerArchivo());
            valores.forEach((valor)=>{
                this._listado[valor.id] = valor;
            })
         }
    }

   crearTarea (desc) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea; 
    }

    listadoTareas () {
        const valores = Object.values(this._listado);
        let i=1;
        valores.forEach((valor)=>{
            const indice = `   ${i}-`.green;
            (valor.completadoEn) 
             ? console.log(`${indice} ${valor.desc} ${'COMPLETADA'.green}`)
             : console.log(`${indice} ${valor.desc} ${'PENDIENTE'.red}`);
            i++;    
        })
    }

    tareasCompletadas () {
        const valores = Object.values(this._listado);
        let i=1;
        valores.forEach((valor)=>{
            const indice = `   ${i}-`.green;
            if (valor.completadoEn) console.log(`${indice} ${valor.desc} ${'COMPLETADA'.green} en: ${valor.completadoEn}`);
            i++;    
        })
    }

    tareasPendientes () {
        const valores = Object.values(this._listado);
        let i=1;
        valores.forEach((valor)=>{
            if (!valor.completadoEn) {
                const indice = `   ${i}-`.green;
                console.log(`${indice} ${valor.desc} ${'PENDIENTE'.red}`);
                i++;
            }
        })
    }

    borrarTarea (id) {

        if(this._listado[id]) delete this._listado[id];
    }

    completarTareas (ids) {
        
        
        ids.forEach((id)=>{
            const tarea= this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn= new Date().toISOString();
            }        
        });

        this.listadoArr.forEach((tarea)=>{

            if (!ids.includes(tarea.id)) {

                this._listado[tarea.id].completadoEn=null;
            }
        })

        
    }


}

module.exports = Tareas;