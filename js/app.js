var file = document.getElementById("inputfile");

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
        let finalArr = [];
        let flag = false;
        let strTime;
        let strDate;

        const Measurements = {
            "Sample" : null,
                "SampleNumber" : null,
                "Date" : "",
                "Time" : "",
            
                "Dimension":[{
                    
                    "Comment" : "",
                    "Description" : "",
                    "Axis" : "",
                    "Nominal" : null,
                    "Tol+" : null,
                    "Tol-" : null,
                    "Measured" : null,
                    "Deviation" : null,
                    "OutOfTol" : null
    
            }]
        }

            for (let i = 0; i < txtArr.length; i++){
               
                
                const str = txtArr[i].toString().substr(0,3);
                
                if (str === "C22"){
                    strTime = txtArr[i].toString().substr(4,10);
                    finalArr.push(strTime);
                    Measurements.Time = strTime;
                }
                if (str === "C21"){
                    strDate = txtArr[i].toString().substr(4,10);
                    finalArr.push(strDate);
                    Measurements.Date = strDate;
                }

                if (str === "$EN"){
                    if(flag === false){
                        flag = true;
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
                            
                            finalArr.push(tempStr);
                            Measurements.Dimension.Comment = tempStr;
                            break;
                        }else{
                                if(str !== " " && strEND !== "$END$"){
                                finalArr.push(tempArr[item]);
                            }

                        }
                        
                    }
                }
                           
            }
            arrToJson(finalArr);
            
    }
});	

function arrToJson(finalArr) {

    

    for (let x = 0; x < finalArr.length; x++) {
        
        Measurements.Date = finalArr[x];
        Measurements.Time = finalArr[x + 1];
        
        console.log("finalArr --> " + finalArr[x]);
       
    }
    
    
}







