class Spreadsheet {
    constructor() {
        this.selectedRow = null;
        this.selectedColumn = null;
        this.formulaMap = new Map();

        //creates a table
        let spreadsheet = document.createElement("table");
        spreadsheet.id = "spreadsheet_1";

        // creates column headers from A..Z
        let row_with_headers = document.createElement("tr");
        let empty_cell = document.createElement("th");
        row_with_headers.appendChild(empty_cell);
        for(let i = 1; i <= 26; i++) {
            let column_header = document.createElement("th");
            let chr = String.fromCharCode(64 + i);
            column_header.id = "column-" + chr;
            column_header.setAttribute("scope", "col");
            column_header.className = "column-header-class";
            column_header.innerText = chr;
            row_with_headers.appendChild(column_header);
        }
        spreadsheet.appendChild(row_with_headers);

        //creates 26 rows
        for(let i = 1; i <= 26; i++) {
            let row = document.createElement("tr");
            row.id = "row-" + i;
            spreadsheet.appendChild(row);

            //create row headers
            let row_header = document.createElement("th");
            row_header.setAttribute("scope", "row");
            row_header.id = "row-" + i;
            row_header.className = "row-header-class";
            row_header.innerText = i;
            row.appendChild(row_header);

            //creates columns from A..Z for each row
            for(let j = 0; j < 26; j++) {
                let chr = String.fromCharCode(65 + j);
                let cell = document.createElement("td");
                cell.id = chr + i;
                let ele = document.createElement('input');
                ele.id="inp-"+chr + i;
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', '');
                cell.appendChild(ele);
                row.appendChild(cell);
            }
        }

        document.body.appendChild(spreadsheet);
    }

    addColumn(){
        //check if rows and columns are less than 25
        let input = document.getElementById('spreadsheet_1');
        let no_of_rows = input.rows.length;
        let no_of_cols = input.rows[1].querySelectorAll("td").length;
        if(no_of_cols <= 25 && this.selectedColumn > 0){
            
            //create column header for the new column
            let column_header = document.createElement("th");
            let chr = String.fromCharCode(64 + no_of_cols + 1);
            column_header.id = "column-" + chr;
            column_header.setAttribute("scope", "col");
            column_header.className = "column-header-class";
            column_header.innerText = chr;
            input.rows[0].appendChild(column_header);
            
            // create one more column for every row
            for(let i = 1; i < no_of_rows; i++) {                  
                    let cell = document.createElement("td");
                    cell.id = chr + i;
                    let ele = document.createElement('input');
                    ele.id="inp-"+chr + i;
                    ele.setAttribute('type', 'text');
                    ele.setAttribute('value', '');
                    cell.appendChild(ele);
                    input.rows[i].appendChild(cell);                
            }

            for(let p = no_of_cols; p >= this.selectedColumn+1; p--){
                this.moveColData(p, p+1, no_of_rows);
            }

            for(let k = 1; k < no_of_rows; k++){
                let kth_row_input_cols = spreadsheet_1.rows[k].querySelectorAll("input");
                kth_row_input_cols[this.selectedColumn].value = " ";
            }


        }else{
            alert("Number of columns cannot exceed 26 or the selection is invalid");
            return;
        }

        this.setSelectedRowsColumnsAsNull();
    }

    addRow(){
        //console.log(this.selectedRow);
        //check if rows and columns are less than 25
        let input = document.getElementById('spreadsheet_1');
        let no_of_rows = input.rows.length - 1;
        let no_of_cols = input.rows[1].querySelectorAll("td").length;
        if(no_of_rows <= 25 && this.selectedRow > 0){
            
            //create row header for the new row
            let row = document.createElement("tr");
            row.id = "row-" + input.rows.length;
            

            //create row header
            let row_header = document.createElement("th");
            row_header.setAttribute("scope", "row");
            row_header.id = "row-" + input.rows.length;
            row_header.className = "row-header-class";
            row_header.innerText = input.rows.length;
            row.appendChild(row_header);
            
            // create one more column for every row
            for(let i = 1; i <= no_of_cols; i++) {                  
                    let cell = document.createElement("td");
                    let chr = String.fromCharCode(64 + i);
                    cell.id = chr + input.rows.length;
                    let ele = document.createElement('input');
                    ele.id="inp-"+cell.id;
                    ele.setAttribute('type', 'text');
                    ele.setAttribute('value', '');
                    cell.appendChild(ele);
                    row.appendChild(cell);
                
            }
            input.appendChild(row);

            //now that the row has been added, the data needs to be shifted 
            for(let p = input.rows.length-1; p > this.selectedRow +1 ; p--){
                this.moveRowData(spreadsheet_1.rows[p-1], spreadsheet_1.rows[p]);
            } 

            let cols = spreadsheet_1.rows[this.selectedRow +1].querySelectorAll("input");
            for(let i = 0; i < cols.length; i++){
                //console.log(cols[i].value);
                cols[i].value=" ";
            }

        }else{
            alert("Number of rows are already 26 or the selection is invalid");
            return;
        }

        this.setSelectedRowsColumnsAsNull();
    }


    //transfer col 1 data into col 2
    moveColData(col1_index, col2_index, no_of_rows){
        let spreadsheet_1 = document.getElementById("spreadsheet_1");
        for(let i = 1; i< no_of_rows; i++){
            let ith_row_input_cols = spreadsheet_1.rows[i].querySelectorAll("input");
            ith_row_input_cols[col2_index-1].value = ith_row_input_cols[col1_index-1].value;
        }
    }

    //transfer row 1 data into row 2
    moveRowData(row1, row2){
        let cells_row1 = row1.querySelectorAll("input");
        let cells_row2 = row2.querySelectorAll("input");
        for(let i=0; i<cells_row1.length; i++){
            cells_row2[i].value = cells_row1[i].value;
        }
    }

    delRow(){
        //console.log(this.selectedRow);
        let spreadsheet_1 = document.getElementById("spreadsheet_1");
        if(this.selectedRow > 0 && spreadsheet_1.rows.length > 2){   
            
            //to remove the formula from the map if it is in the row going to get deleted now
            for (let [k, v] of this.formulaMap){
                if(spreadsheet_1.rows[this.selectedRow].querySelector("#"+ k)!==null){
                    this.formulaMap.delete(k);
                }
            }     

            for(let i = this.selectedRow; i < spreadsheet_1.rows.length - 1; i++){                
                this.moveRowData(spreadsheet_1.rows[i+1], spreadsheet_1.rows[i]);
            }     
            spreadsheet_1.deleteRow(spreadsheet_1.rows.length - 1);
            this.setSelectedRowsColumnsAsNull();
        }else{
            alert("Number of rows cannot fall below 1 or the selection is invalid");
        }         
    }

    delColumn(){       
        let spreadsheet_1 = document.getElementById("spreadsheet_1");
        let no_of_input_cells = spreadsheet_1.rows[1].getElementsByTagName("td").length;

        //to remove the formula from the map if it is in the column going to get deleted now
        if(this.selectedColumn > 0 && no_of_input_cells > 1){
            for(let i = 1; i < spreadsheet_1.rows.length; i++){
                let ith_row_input_cols = spreadsheet_1.rows[i].querySelectorAll("td");
                let selectedCol = ith_row_input_cols[this.selectedColumn-1];
                for (let [k, v] of this.formulaMap){
                    if(selectedCol.querySelector("#"+ k)!==null){
                        this.formulaMap.delete(k);
                    }
                } 
            }

            for(let i = this.selectedColumn + 1; i <= no_of_input_cells; i++){
                this.moveColData(i, i-1, spreadsheet_1.rows.length);
            }
            for(let i = 0; i < spreadsheet_1.rows.length; i++){                
                spreadsheet_1.rows[i].deleteCell(no_of_input_cells);
            }
        }else{
            alert("Number of columns cannot fall below 1 or the selection is invalid");
        }
        this.setSelectedRowsColumnsAsNull();       
    }

    importCSV(input) {
        let file = input.files[0];
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test(input.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function (e) {                    
                    var rows = e.target.result.split("\n");
                    //console.log(rows);
                    for (var i = 0; i < rows.length; i++) {
                        let htmlRowNumber = i+1;
                        var cells = rows[i].split(",");
                        //console.log(cells);
                        if (cells.length > 0) {                            
                            for (var j = 0; j < cells.length; j++) {
                                let htmlColumnChar = String.fromCharCode(65 + j);
                                let inputCell = "inp-" + htmlColumnChar + htmlRowNumber;                                
                                document.getElementById(inputCell).value = cells[j];
                            }
                        }
                    }
                }               
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }
    }

    exportTableToCSV(filename) {
        var csv = [];
        var rows = document.querySelectorAll("table tr");
        
        for (var i = 1; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td");            
            for (var j = 0; j < cols.length; j++){
                var inputVal = cols[j].querySelector("input").value;
                row.push(inputVal);
            }                            
            csv.push(row.join(","));        
        }
    
        // Download CSV file
        this.downloadCSV(csv.join("\n"), filename);
    }

    downloadCSV(csv, filename) {
        var csvFile;
        var downloadLink;
    
        // CSV file
        csvFile = new Blob([csv], {type: "text/csv"});
    
        // Download link
        downloadLink = document.createElement("a");
    
        // File name
        downloadLink.download = filename;
    
        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);
    
        // Hide download link
        downloadLink.style.display = "none";
    
        // Add the link to DOM
        document.body.appendChild(downloadLink);
    
        // Click download link
        downloadLink.click();
    }

    setSelectedRowsColumnsAsNull(){
        let spreadsheet_1 = document.getElementById("spreadsheet_1");
        let elems = spreadsheet_1.querySelectorAll(".selected");
        for(let i = 0; i < elems.length; i++){
            if(elems[i] !== null){
                elems[i].classList.remove("selected");
            }
        }
        this.selectedColumn = null;
        this.selectedRow = null;
    }

}

let spreadsheet = new Spreadsheet();

//Added Add Row button
let x = document.createElement("button");
x.classList.add("button");
//x.onclick = spreadsheet.addRow;
x.addEventListener('click', function() {spreadsheet.addRow();}); 
let y = document.createTextNode("Add Row");
x.appendChild(y);
document.body.insertBefore(x, document.getElementById("spreadsheet_1"));

//Added Delete Row button
let p = document.createElement("button");
p.classList.add("button");
//p.onclick = spreadsheet.delRow;
p.addEventListener('click', function() {spreadsheet.delRow();}); 
let q = document.createTextNode("Delete Row");
p.appendChild(q);
document.body.insertBefore(p, document.getElementById("spreadsheet_1"));

//Added Add Column button
let m = document.createElement("button");
m.classList.add("button");
//m.onclick = spreadsheet.addColumn;
m.addEventListener('click', function() {spreadsheet.addColumn();}); 
let n = document.createTextNode("Add Column");
m.appendChild(n);
document.body.insertBefore(m, document.getElementById("spreadsheet_1"));

//Added Delete Column button
let g = document.createElement("button");
g.classList.add("button");
g.addEventListener('click', function() {spreadsheet.delColumn();}); 
let h = document.createTextNode("Delete Column");
g.appendChild(h);
document.body.insertBefore(g, document.getElementById("spreadsheet_1"));

//Added Import Data button
let e = document.createElement("input");
e.setAttribute("type", "file");
e.id = "fileUpload";
e.classList.add("button", "inputfile");
e.addEventListener('change', function() {spreadsheet.importCSV(this);}); 
var w = document.createElement("label");
w.classList.add("button");
var l = document.createTextNode("Import CSV");
w.setAttribute("for", "fileUpload");
w.appendChild(l);
document.body.insertBefore(e, document.getElementById("spreadsheet_1"));
document.body.insertBefore(w, document.getElementById("spreadsheet_1"));

//Added Export Data button
let c = document.createElement("button");
c.classList.add("button");
c.addEventListener('click', function() {spreadsheet.exportTableToCSV("assignment6_data.csv");}); 
let d = document.createTextNode("Export as CSV");
c.appendChild(d);
document.body.insertBefore(c, document.getElementById("spreadsheet_1"));


document.getElementById("spreadsheet_1").addEventListener("click", (event) => {

    // to remove the existing selection
    spreadsheet.setSelectedRowsColumnsAsNull();

    // to select the column
    if(event.target.classList.contains('column-header-class')){
        spreadsheet.selectedColumn = event.target.cellIndex;
        //console.log(spreadsheet.selectedColumn);
        for(let i = 1; i < spreadsheet_1.rows.length; i++){
            let ith_row = spreadsheet_1.rows[i];
            let sel_col = ith_row.getElementsByTagName("td")[spreadsheet.selectedColumn-1];
            sel_col.classList.add("selected");
        }

    // to select the row
    } else if(event.target.classList.contains('row-header-class')){
        spreadsheet.selectedRow = event.target.parentNode.rowIndex;
        //console.log(spreadsheet.selectedRow);
        document.getElementById(event.target.parentNode.id).classList.add("selected");
    }

}); 




