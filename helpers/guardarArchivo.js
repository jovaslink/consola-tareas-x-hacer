const fs= require('fs');

const guardarArchivo = (data)=>{
    
    fs.writeFileSync (`./db/tareas.json`, JSON.stringify (data) , (err)=>{
        if(err) console.log(`Error al guardar los datos`);
        
    });
}

const leerArchivo = () =>{

    if(!fs.existsSync(`./db/tareas.json`)){
        return null;

    }
    const data = JSON.parse( fs.readFileSync(`./db/tareas.json`,{encoding:'utf-8'}));
    return data;

}

module.exports= {
    guardarArchivo,
    leerArchivo
}