 

// const truncDecimal = (x: any, posiciones: number = 2) => {

//     const s = x.toString()
//     const l = s.length
//     const decimalLength = s.indexOf('.') + 1
//     const numStr = s.substr(0, decimalLength + posiciones)
//     return Number(numStr)

// }

// export default truncDecimal;


const truncDecimal = (x, decimalDigits = 0, returnText = false, longFixed = false) => {

    /*
    decimalDigits = [0..15]
    returnText = true ->return is a string
               false -> return is a number
    longFixed = true -> include non-significant zeros in the return string. 
          false -> NOT include non-significant zeros in the return string.
          *If returned is a number, the non-significant zero does not make mathematical sense. 
    
    decimalDigits = [0..15]
    returnText = true -> devuelve una cadena de texto
                 false -> devuelve un número
    longFixed = true -> si la salida es una cadena de texto incluye
                        los ceros no significativos necesarios para
                        completar la cantidad decimalDigits
                false -> no se incluyen ceros no significativos
                *Si lo que se retorna es un número es indiferente el
                      valor de este parámetro por no tener sentido matemático.
    */

                      x = Number(x);
                      decimalDigits = Number(decimalDigits);
                  
                      x = x * (10 ** decimalDigits);
                      x = x - x % 1;
                      x = x / (10 ** decimalDigits);
                  
                      if(returnText){
                            if(longFixed){
                                  return x.toFixed(decimalDigits);
                              }else{
                                  return x.toString();}
                      }else{
                            return x;
                      }
}

 const round = (num, decimales = 2) =>{
      if(!num || num == undefined || num == null || num == '' || num == 0){
            return 0
      }
       
      const numeroRegexp = new RegExp('\\d\\.(\\d){' + decimales + ',}');   // Expresion regular para numeros con un cierto numero de decimales o mas
      if (numeroRegexp.test(num)) {         // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
            return Number(num.toFixed(decimales));
      } else {
            return Number(num.toFixed(decimales)) === 0 ? 0 : num;  // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
      }
      
  }

 

export {truncDecimal, round};