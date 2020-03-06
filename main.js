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


spreadsheet = document.createElement("table");
for(let i = 1; i <= 26; i++) {
    row = document.createElement("tr");
    row.id = "row_" + i;
    spreadsheet.appendChild(row);
    for(let j = 0; j < 26; j++) {
        var chr = String.fromCharCode(65 + j);
        cell = document.createElement("td");
        cell.id = "cell_" + i + chr;
        row.appendChild(cell);
    }
}

document.body.appendChild(spreadsheet);



