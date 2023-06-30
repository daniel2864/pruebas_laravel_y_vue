export const setFormatDate = (date_str: string, typeDate = 'time',typeh = '12') => {
    if(date_str && date_str != ''){ 
        //2023-04-21T08:46:49.000Z
        let fechaf1 = date_str.split(".");
        if(fechaf1.length == 2){
            let fechaf2 = fechaf1[0].split("T");
            if(fechaf2.length == 2){

                if(typeDate == 'datetime'){
                    return fechaf2[0]+ ' ' + noSeconds(fechaf2[1])
                }
                if(typeDate == 'datetimeT'){
                    return fechaf2[0]+ 'T' + noSeconds(fechaf2[1])
                }

                if(typeDate == 'date'){
                    let fech = fechaf2[0].split(" ");
                    return fech[0]
                }else if(typeDate == 'time'){ 
                    if(typeh == '12'){
                        return typeHour(fechaf2[0], fechaf2[1])
                    }
                    return noSeconds(fechaf2[1])
                }
                return ''
            }
            return ''
        }else{
            let fechaf2 = fechaf1[0].split("T");
            if(fechaf2.length == 2){

                if(typeDate == 'datetime'){
                    return fechaf2[0]+ ' ' + noSeconds(fechaf2[1])
                }
                if(typeDate == 'datetimeT'){
                    return fechaf2[0]+ 'T' + noSeconds(fechaf2[1])
                }

                if(typeDate == 'date'){
                    let fech = fechaf2[0].split(" ");
                    return fech[0]
                }else if(typeDate == 'time'){ 
                    if(typeh == '12'){
                        return typeHour(fechaf2[0], fechaf2[1])
                    }
                    return noSeconds(fechaf2[1])
                }
                return ''
            }
            return ''
        }
    }
    return ''

}

const typeHour=(date:any, hora:any) =>{
    let time = new Date(date+ ' ' +hora).toLocaleString('en-US', { hour: 'numeric', hour12: true })
    let fecha12 = time.split(" ");
    let time2 = hora.split(":");
    return time2[0] + ':' + time2[1] + ' '+ fecha12[1]
}

const noSeconds = (hora:any) => {
    let time = hora.split(":"); 
    return time[0] + ":" + time[1];
}

export default setFormatDate;
