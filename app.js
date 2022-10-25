require('colors');
const { guardarArchivo, leerArchivo } = require('./helpers/guardarArchivo');
const { inquirerMenu, inquirePausa, inquireInputTarea, inquirerMenuBorrar, inquireConfirmacion, inquirerMenuCompletar } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
//const {mostrarMenu, pausa} = require('./helpers/mensajes'); //versión a mano
console.clear();

const main = async ()=>{
    
    
    let opcion = '';
    const tareas = new Tareas();
    tareas.archivoObjeto;

     do {
        //Versión a mano
        /*
        opcion = await mostrarMenu();
        await pausa();
        */
        opcion = await inquirerMenu(); 
        
        switch (opcion) {
            case '1':
                const {des} = await inquireInputTarea('Escriba la descripción de la tarea: ');
                tareas.crearTarea(des);                
            break;

            case '2':
                tareas.listadoTareas();
            break;
            
            case '3':
                tareas.tareasCompletadas();
            break;
            
            case '4':
                tareas.tareasPendientes();
            break;

            case '5':
                const ids= await inquirerMenuCompletar(tareas.listadoArr);
                tareas.completarTareas(ids);
                
            break;

            case '6':
                const id = await inquirerMenuBorrar(tareas.listadoArr);
                const confirmacion = await inquireConfirmacion('¿Está seguro de borrar esta tarea?');
                if(confirmacion) {
                    tareas.borrarTarea(id);
                    console.log('   Tarea borrada.'.green)
                }
            break;

            
        }
        guardarArchivo(tareas.listadoArr);
        await inquirePausa();

     } while ( opcion !== '0' );

     
}

main();