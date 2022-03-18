var file = document.getElementById("inputfile");
let finalArr = [];

var Measurements = {
        "SampleNumber" : null,
        "Date" : "",
        "Time" : "",
    
        "Dimension":[{
            
            "Comment" : "",
            "Description": "",
            "Axis" : "",
            "Nominal" : null,
            "TolPlus" : null,
            "TolMinus" : null,
            "Measured" : null,
            "Deviation" : null,
            "OutOfTol" : null

    }]
}

file.addEventListener("change",() => {
    const txtArr = [];
    const fr = new FileReader();
    fr.readAsText(file.files[0]);
   
    fr.onload = function() {
    var lines = fr.result.split("\n");
    
        for (var line = 0; line < lines.length; line++) {
            let str = (lines[line].split(",")); 
            txtArr.push(str);
        }
    }
    fr.onloadend = function() {
        let tempArr = [];
        
        let flag = false;
        let strTime;
        let strDate;
        let numberOfSamples = 0;

            for (let i = 0; i < txtArr.length; i++){
                
                const str = txtArr[i].toString().substr(0,3);
                
                if (str === "C22"){
                    strTime = txtArr[i].toString().substr(4,10);
                    //finalArr.push(strTime);
                    Measurements.Time = strTime;
                }
                if (str === "C21"){
                    strDate = txtArr[i].toString().substr(4,10);
                    //finalArr.push(strDate);
                    Measurements.Date = strDate;
                }

                if (str === "$EN"){
                    if(flag === false){
                        flag = true;
                        numberOfSamples++
                        Measurements.SampleNumber = numberOfSamples;
                    }else{
                        flag = false;
                    }
                }
                if(flag === true){
                    let tempStr = txtArr[i];
                    tempStrFirst = tempStr.toString().substr(0,1);
                    tempArr = txtArr[i];
                    
                    let strEND = tempStr.toString().substr(0,5);

                    for (var item = 0; item < tempArr.length; item++) {
                        if(tempStrFirst == "$" && strEND !== "$END$"){
                           
                            Measurements.Comment = tempStr[0];
                            
                            break;
                        }else{
                                if(str !== " " && strEND !== "$END$"){
                                switch(item){
                                    case 3:
                                    Measurements.Dimension.Axis = tempStr[3];
                                    break;
                                    case 4:
                                    Measurements.Dimension.Nominal = tempStr[4];
                                    break;
                                    case 5:
                                    Measurements.Dimension.TolPlus = tempStr[5];
                                    break;
                                    case 6:
                                    Measurements.Dimension.TolMinus = tempStr[6];
                                    break;
                                    case 7:
                                    Measurements.Dimension.Measured = tempStr[7];
                                    break;
                                    case 8:
                                    Measurements.Dimension.OutOfTol = tempStr[8];
                                    break;
                                   
                                }
                                    
                                

                            }
                            
                        }
                    }
                    if (numberOfSamples !== 0 || numberOfSamples !== undefined) {
                        finalArr.push(Measurements[numberOfSamples]);
                                    new Measurements = {
                                        "SampleNumber" : null,
                                        "Date" : "",
                                        "Time" : "",
                                    
                                        "Dimension":[{
                                            
                                            "Comment" : "",
                                            "Description": "",
                                            "Axis" : "",
                                            "Nominal" : null,
                                            "TolPlus" : null,
                                            "TolMinus" : null,
                                            "Measured" : null,
                                            "Deviation" : null,
                                            "OutOfTol" : null
                            
                                        }]
                                    }
                    }
                }
                

            }
            arrToJson(finalArr);
            
    }
});


function arrToJson(finalArr) {

    

    for (let x = 0; x < finalArr.length; x++) {
        
        
        console.log("finalArr --> " + finalArr[x]);
       
    }
    
    
}







