class Spreadsheet {
    constructor(rows = 26, columns = 26) {
        this.rows = rows;
        this.columns = columns;
    }
}

class Cell {

}


var spreadsheet = new Spreadsheet(26, 26);
console.log(spreadsheet.columns);
console.log(spreadsheet.rows);

//creates a table
spreadsheet = document.createElement("table");

// creates column headers from A..Z
row_with_headers = document.createElement("tr");
empty_cell = document.createElement("th");
row_with_headers.appendChild(empty_cell);
for(let i = 1; i <= 26; i++) {
    column_header = document.createElement("th");
    let chr = String.fromCharCode(64 + i);
    column_header.id = "column_" + chr;
    column_header.setAttribute("scope", "col");
    column_header.innerText = chr;
    row_with_headers.appendChild(column_header);
}
spreadsheet.appendChild(row_with_headers);

//creates 26 rows
for(let i = 1; i <= 26; i++) {
    row = document.createElement("tr");
    row.id = "r_" + i;
    spreadsheet.appendChild(row);

    //create row headers
    row_header = document.createElement("th");
    row_header.setAttribute("scope", "row");
    row_header.id = "row_" + i;
    row_header.innerText = i;
    row.appendChild(row_header);

    //creates columns from A..Z for each row
    for(let j = 0; j < 26; j++) {
        let chr = String.fromCharCode(65 + j);
        cell = document.createElement("td");
        cell.id = "cell_" + i + chr;
        row.appendChild(cell);
    }
}

document.body.appendChild(spreadsheet);



