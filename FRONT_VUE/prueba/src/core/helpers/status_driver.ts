const status_driver = (id: number, type = 'one') => {
    let status:any = []
    status[1] = "ACTIVO"
    status[2] = "PENDIENTE"
    status[3] = "INCOMPLETO"
    status[4] = "RECHAZADO" 

    if(type == 'array'){
      var datos = [{}];
      status.forEach(function(item, index){
            var elemn:any = new Object();
            elemn.id = index
            elemn.name = item
            datos.push(elemn)
        });
        
      return datos.slice(1)
    }
 
   
  return status[id] ? status[id] : "SIN STATUS";

}

export default status_driver;
