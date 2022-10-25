const inquirer = require('inquirer');
require('colors');



const inquirerMenu= async ()=>{

    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Qué desea hacer?',
            choices: [
                {
                    value: '1',
                    name: `${'1.'.green} Crear tarea`
                },
                {
                    value: '2',
                    name: `${'2.'.green} Listar tareas`
                },
                {
                    value: '3',
                    name: `${'3.'.green} Listar tareas completadas`
                },
                {
                    value: '4',
                    name: `${'4.'.green} Listar tareas pendientes`
                },
                {
                    value: '5',
                    name: `${'5.'.green} Completar tarea(s)`
                },
                {
                    value: '6',
                    name: `${'6.'.green} Borrar tarea`
                },
                {
                    value: '0',
                    name: `${'0.'.green} Salir`
                },
    
            ]
        }
    ];
    
    console.clear();
    console.log('======================='.magenta);
    console.log(' Seleccione una opción '.green);
    console.log('======================='.magenta);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const inquirePausa= async ()=>{
    const preguntaPausa = [
        {
            type: 'input',
            name: 'opcion',
            message: `Presione ${'Enter'.green} para continuar...`
            
        }
    ];
    
    console.log('\n')
    return await inquirer.prompt(preguntaPausa);
}


const inquireInputTarea= async (message)=>{

    const preguntaDescripcionTarea = [
        {
            type: 'input',
            name: 'des',
            message,
            validate (value) {
                if(value.length === 0) {
                    return `${'Por favor escriba la descripción de la tarea...'.red}` ;
                }
                return true;
            }
            
            
        }
    ];
    
    console.log('\n')
    return await inquirer.prompt(preguntaDescripcionTarea);
} 

const inquirerMenuBorrar= async (tareas)=>{

    const choices = tareas.map((tarea)=>{

        return {
            value: tarea.id,
            name: tarea.desc
        }

    });
    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Qué tarea desea borrar?',
            choices
        }
    ];
    
    console.clear();
    console.log('======================='.magenta);
    console.log(' Seleccione la tarea '.green);
    console.log('======================='.magenta);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const inquireConfirmacion = async (message)=>{
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
            
        }
    ];
    
    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

const inquirerMenuCompletar= async (tareas)=>{

    const choices = tareas.map((tarea)=>{

        return {
            value: tarea.id,
            name: tarea.desc,
            checked: (tarea.completadoEn) ? true : false
        }

    });
    const preguntas = [
        {
            type: 'checkbox',
            name: 'opciones',
            message: 'Selecciones',
            choices
        }
    ];
    
    console.clear();
    console.log('======================='.magenta);
    console.log(' Seleccione la tarea '.green);
    console.log('======================='.magenta);

    const {opciones} = await inquirer.prompt(preguntas);
    return opciones;
}



module.exports={
    inquirerMenu,
    inquirePausa,
    inquireInputTarea,
    inquirerMenuBorrar,
    inquireConfirmacion,
    inquirerMenuCompletar
}

