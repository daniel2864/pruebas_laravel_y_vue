

 const generarRandom = (num: number) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    let ch: string;
    while (result.length < num){
        ch = characters.charAt(Math.floor(Math.random() * charactersLength));
        if (!result.includes(ch)){
            result += ch;
        }
    }
  return result;

}

export default generarRandom;
