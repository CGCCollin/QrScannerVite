import QrScanner from "qr-scanner";

export default async function read(imageURL: String){
    var output: String = '';

        await QrScanner.scanImage(imageURL,{returnDetailedScanResult: true})
        .then(result =>{ 
                     console.log("Decoded data: " + result.data)
                    output=result.data})
        .catch(error => {console.error(error);
                     output = error})
        return output;
    
}