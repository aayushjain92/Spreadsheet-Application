class Spreadsheet {
    constructor() {
        this.selectedRow = null;
        this.selectedColumn = null;

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
                cell.id = "cell_" + i + chr;
                let ele = document.createElement('input');
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

        // The rows collection returns a collection of all <tr> elements in a table.

        // Note: The elements in the collection are sorted as they appear in the source code.
        
        // Tip: Use the insertRow() method to create a new row (<tr>).
        
        // Tip: Use the deleteRow() method to remove a row.
        
        // Tip: Use the insertCell() method to create a new cell (<td>).
        
        // Tip: Use the deleteCell() method to delete a cell.
        
        // Tip: Use the cells collection to return a collection of all <td> or <th> elements in a table.

        setSelectedRowsColumnsAsNull();
    }

    addRow(){
        //check if rows and columns are less than 25
        setSelectedRowsColumnsAsNull();
    }

    delRow(){
        let spreadsheet_1 = document.getElementById("spreadsheet_1");
        let columns_of_first_row = spreadsheet_1.rows[1].getElementsByTagName("td");
        if(this.selectedRow !== null && spreadsheet_1.rows.length > 2 && columns_of_first_row.length >1){
            spreadsheet_1.deleteRow(this.selectedRow);
            this.setSelectedRowsColumnsAsNull();
        }else{
            alert("Selection Invalid!");
        }         
    }

    delColumn(){       
        let spreadsheet_1 = document.getElementById("spreadsheet_1");
        let columns_of_first_row = spreadsheet_1.rows[1].getElementsByTagName("td");
        if(this.selectedColumn !== null && columns_of_first_row.length >1){
            spreadsheet_1.rows[0].deleteCell(this.selectedColumn);
            for(let i = 1; i < spreadsheet_1.rows.length; i++){
                spreadsheet_1.rows[i].deleteCell(this.selectedColumn);
            }
        }else{
            alert("Selection Invalid!");
        }
        this.setSelectedRowsColumnsAsNull();       
    }

    exportTableToCSV(filename) {
        var csv = [];
        var rows = document.querySelectorAll("table tr");
        
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td");
            
            for (var j = 0; j < cols.length; j++){
                //var inputVal = document.getElementById("myInput").value;
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
        this.selectedColumn = null;
        this.selectedRow = null;
    }

}

let spreadsheet = new Spreadsheet();

//Added Add Row button
let x = document.createElement("button");
x.classList.add("button");
x.onclick = spreadsheet.addRow;
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
m.onclick = spreadsheet.addColumn;
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

//Added Export Data button
let c = document.createElement("button");
c.classList.add("button");
c.addEventListener('click', function() {spreadsheet.exportTableToCSV("assignment6_data.csv");}); 
let d = document.createTextNode("Export as CSV");
c.appendChild(d);
document.body.insertBefore(c, document.getElementById("spreadsheet_1"));

document.getElementById("spreadsheet_1").addEventListener("click", (event) => {

    // to remove the selection
    let spreadsheet_1 = document.getElementById("spreadsheet_1");
    let elems = spreadsheet_1.querySelectorAll(".selected");
    for(let i = 0; i < elems.length; i++){
        if(elems[i] !== null){
            elems[i].classList.remove("selected");
        }
    }
    spreadsheet.setSelectedRowsColumnsAsNull();

    // to select the column
    if(event.target.classList.contains('column-header-class')){
        spreadsheet.selectedColumn = event.target.cellIndex;
        for(let i = 1; i < spreadsheet_1.rows.length; i++){
            let ith_row = spreadsheet_1.rows[i];
            let sel_col = ith_row.getElementsByTagName("td")[spreadsheet.selectedColumn-1];
            sel_col.classList.add("selected");
        }

    // to select the row
    } else if(event.target.classList.contains('row-header-class')){
        spreadsheet.selectedRow = event.target.parentNode.rowIndex;
        document.getElementById(event.target.parentNode.id).classList.add("selected");
    }

}); 




