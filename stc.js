var dataParsed

getData();

async function getData() {
    /*
    response = await fetch('data_mock.csv');
    const data = await response.text();
    dataParsed = Papa.parse(data, {
        header:true
    });
    console.log(dataParsed);
    */
    
    sheetLink='https://docs.google.com/spreadsheets/d/e/2PACX-1vQWGxyl9mcv80YbiNIRxzPMrLPgk8g1UqXF2oLawQjKyXf9e0gDgD2cC5vPkUDothdaYlz6iRMC_SA2/pub?gid=0&single=true&output=csv';
    Papa.parse(sheetLink, {
        download: true,
        header: true,
        complete: function(results) {
            dataParsed = results
            var table = new Tabulator("#example-table", {
                data:dataParsed.data, //assign data to table
                //autoColumns:true, //create columns from data field names
                columns: [
                    {title:"Pollutant, Chemical Name", field:"Pollutant, Chemical Name", headerFilter:"input"},
                    {title:"Applicable Occupant", field:"Applicable Occupant", headerFilter:"input"},
                    {title:"Applicable Environments", field:"Applicable Environments", headerFilter:"input"},
                    {title:"Guideline Type", field:"Guideline Type", headerFilter:"input"},
                    {title:"Numerical Guideline", field:"Numerical Guideline", headerFilter:"input"},
                    {title:"Units", field:"Units", headerFilter:"input"},
                    {title:"Country / Jurisdiction", field:"Country / Jurisdiction", headerFilter:"input"},
                    {title:"Guideline Category", field:"Guideline Category", headerFilter:"input"},
                    {title:"Averaging Time", field:"Averaging Time", headerFilter:"input"},
                    {title:"Health Endpoint", field:"Health Endpoint", headerFilter:"input"},
                ]
            });
        }
    });
}
