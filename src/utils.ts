/*
 * N. do Cliente - OK
 * Mês de referência
 * Energia Elétrica
 * Energia SCEE s/ ICMS
 * Energia compensada CG I
 * Contrib Ilumn Publica Municiapl
 */

const getRowIndex = ( rows:string[], text:string ):number => {
    const search:RegExp = new RegExp(`${text}`, 'ig');
    const index_row:number = rows.findIndex((
        row:string,
        index:number
    ):number => {
        if(search.test(row))
            return index;
        return 0;
    });
    return index_row;
}

const formatterDate = (date:string):string => {
    const list_month:{ [key: string]: string } = {
        'JAN': '01',
        'FEV': '02',
        'MAR': '03',
        'ABR': '04',
        'MAI': '05',
        'JUN': '06',
        'JUL': '07',
        'AGO': '08',
        'SET': '09',
        'OUT': '10',
        'NOV': '11',
        'DEZ': '12'
    }
    const fragment:string[] = date.split('/');
    const month:string = list_month[fragment[0]];
    const year:string = fragment[1];
    const formated_date:string = `${year}-${month}-01T00:00:00.000Z`;
    return formated_date;
}

export const getNumberClient = (rows:string[]):number => {
    const index_row:number = getRowIndex(rows, 'Nº DO CLIENTE');
    const row_number_client:string = rows[index_row + 1];
    const number_client:number = parseInt(row_number_client.trim().split(' ')[0]);
    return number_client;
}

export const getEE = (rows:string[]):number[] => {
    const index_row:number = getRowIndex(rows, 'Energia ElétricakWh');
    if(index_row === -1)
        return [0, 0];
    const values:RegExpMatchArray|null = rows[index_row].match(/[\d,.-]+ /g);
    if(!!!values)
        return [0, 0];
    return [
        parseFloat(values[0].replace('.','')),
        parseFloat(values[2].replace(',', '.'))
    ];
}

export const getESI = (rows:string[]):number[] => {
    const index_row:number = getRowIndex(rows, 'Energia SCEE s/ ICMS');
    if(index_row === -1)
        return [0,0];
    const values:RegExpMatchArray|null = rows[index_row].match(/[\d,.-]+ /g);
    if(!!!values)
        return [0,0];
    return [
        parseFloat(values[0].replace('.','')),
        parseFloat(values[2].replace(',', '.'))
    ];
}

export const getEGD = (rows:string[]):number[] => {
    const index_row:number = getRowIndex(rows, 'Energia compensada GD IkWh');
    if(index_row === -1)
        return [0,0];
    const values:RegExpMatchArray|null = rows[index_row].match(/[\d,.-]+ /g);
    if(!!!values)
        return [0,0];
    return [
        parseFloat(values[0].replace('.','')),
        parseFloat(values[2].replace(',', '.'))
    ];
}

export const getCIPM = (rows:string[]):number => {
    const index_row:number = getRowIndex(rows, 'Contrib Ilum Publica Municipal');
    if(index_row === -1)
        return 0;
    const values:RegExpMatchArray|null = rows[index_row].match(/[\d,]+/gi);
    if(!!!values)
        return 0;
    return parseFloat(values[0].replace(',','.'));
}

export const getReferenceDate = (rows:string[]):string => {
    const index_row:number = getRowIndex(rows, 'Referente a');
    if(index_row === -1)
        return '';
    const values:RegExpMatchArray|null = rows[index_row + 1].match(/[A-Z]{3}\/[0-9]{4}/gi);
    if(!!!values)
        return '';
    return formatterDate(values[0]);
}