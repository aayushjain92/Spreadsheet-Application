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
            //row.className = "row-header-class";
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
                row.appendChild(cell);
            }
        }

        document.body.appendChild(spreadsheet);
    }

    addColumn(){
        // The rows collection returns a collection of all <tr> elements in a table.

        // Note: The elements in the collection are sorted as they appear in the source code.
        
        // Tip: Use the insertRow() method to create a new row (<tr>).
        
        // Tip: Use the deleteRow() method to remove a row.
        
        // Tip: Use the insertCell() method to create a new cell (<td>).
        
        // Tip: Use the deleteCell() method to delete a cell.
        
        // Tip: Use the cells collection to return a collection of all <td> or <th> elements in a table.
    }

    addRow(){

    }

    delRow(rowNumber){
        let spreadsheet = document.getElementById("spreadsheet_1");
        if(spreadsheet.rows.length > 1)
        spreadsheet.deleteRow(rowNumber); 
    }

    delColumn(colNumber){
        let spreadsheet = document.getElementById("spreadsheet_1");
        if(spreadsheet.rows.length > 1 )
        spreadsheet.deleteRow(rowNumber); 

        // get the number of rows
        //find the number of columns
        // loop 
    }
}

let spreadsheet = new Spreadsheet();


document.getElementById("spreadsheet_1").addEventListener("click", (event) => {
    let spreadsheet_1 = document.getElementById("spreadsheet_1");
    let elems = spreadsheet_1.querySelectorAll(".selected");
    for(let i = 0; i < elems.length; i++){
        if(elems[i] !== null){
            elems[i].classList.remove("selected");
        }
    }
    

    if(event.target.classList.contains('column-header-class')){
        spreadsheet_1.selectedColumn = event.target.cellIndex -1;
        for(let i = 1; i < spreadsheet_1.rows.length; i++){
            let ith_row = spreadsheet_1.rows[i];
            let sel_col = ith_row.getElementsByTagName("td")[spreadsheet_1.selectedColumn];
            sel_col.classList.add("selected");
        }

    } else if(event.target.classList.contains('row-header-class')){
        spreadsheet_1.selectedRow = event.target.parentNode.rowIndex;
        document.getElementById(event.target.parentNode.id).classList.add("selected");
    }

}); 




