interface iPostJson
{
    "clientNumber": number,
    "referenceMonth": string,
    "eeQuantity": number,
    "eeValue": number,
    "esiQuantity": number,
    "esiValue": number,
    "ecgQuantity": number,
    "ecgValue": number,
    "publicTax": number
}

const post_json:iPostJson = {
    clientNumber: 0,
    ecgQuantity: 0,
    ecgValue: 0,
    eeQuantity: 0,
    eeValue: 0,
    esiQuantity: 0,
    esiValue: 0,
    publicTax: 0,
    referenceMonth: ""
};
export const post_prepare = (
    client_number:number,
    reference_date: string,
    ee:number[],
    esi:number[],
    ecg:number[],
    cimp:number
):void => {
    post_json.clientNumber = client_number;
    post_json.referenceMonth = reference_date;
    post_json.eeQuantity = ee[0];
    post_json.eeValue = ee[1];
    post_json.esiQuantity = esi[0];
    post_json.esiValue = esi[1];
    post_json.ecgQuantity = ecg[0];
    post_json.ecgValue = ecg[1];
    post_json.publicTax = cimp;
}

export const post_send = async ():Promise<void> => {
    const url_api:string | undefined = process.env.URL_API + "/billing";
    const header:Headers = new Headers();
    header.append("Content-Type", "application/json");
    const response = await fetch( url_api, {
        method: "POST",
        headers: header,
        body: JSON.stringify(post_json)
    });
    const response_json = await response.json();

    console.log(response_json)

}