export function normalizaNombre(str:string = '') {

    const ext = getFileExtension(str);
    const name = str.split('.');
    const name_str = name[0].replace(/([^\w]+|\s+)/g, '');

    return name_str+'.'+ext;
}

 
function getFileExtension(filename) {
    return filename.split('.').pop();
  }
export default normalizaNombre ;