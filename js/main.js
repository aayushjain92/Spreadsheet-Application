// let spreadsheet.formulaMap = new Map();
let cells_set = [];
let input = document.getElementById('spreadsheet_1');

let source = Rx.Observable.fromEvent(input, 'keyup')
    .map((e) => e)
    .filter(e => e.target.value.endsWith(')') && (e.target.value.startsWith('=SUM(') || e.target.value.startsWith('=sum(')))
    .subscribe(e => {
        if (e.code == "Enter") {

            try {
                //extracting formula data and metadata
                let formula = e.target.value;                                                 // '=SUM(B1:D9)'
                let result_cell = e.target.parentNode.id;                                    //'B10'
                let result_cell_col = result_cell.substring(0, 1);                         //'B'
                let result_cell_row = parseInt(result_cell.substring(1, result_cell.length));       //10

                //extracting column metadata mentioned in the formula by the user
                let start_cell = formula.split('(').pop().split(':')[0];    //B1
                let end_cell = formula.split(':').pop().split(')')[0];      //D9
                let start_col = start_cell.substring(0, 1);                 //B
                let start_row = parseInt(start_cell.substring(1, start_cell.length)); //1
                let end_col = end_cell.substring(0, 1);                     //D
                let end_row = parseInt(end_cell.substring(1, end_cell.length));      //9

                // extracting spreadsheet details
                let no_of_rows = input.rows.length - 1;
                let no_of_cols = input.rows[1].querySelectorAll("td").length;

                // to check if the formula cell is not a part of the formula
                let flag = true;

                if (result_cell_col >= start_col && result_cell_col <= end_col) {
                    if (result_cell_row >= start_row && result_cell_row <= end_row) {
                        flag = false;
                    }
                }

                //check if the cells entered in the formula are valid cells in the spreadsheet
                if (start_col >= 'A' && start_col <= String.fromCharCode(64 + no_of_cols)
                    && end_col >= 'A' && end_col <= String.fromCharCode(64 + no_of_cols)
                    && start_row >= 1 && start_row <= no_of_rows
                    && end_row >= 1 && end_row <= no_of_rows
                    && flag) {

                    // console.log(`${start_col} ${start_row} ${end_col} ${end_row}`);
                    // console.log(`${no_of_rows} ${no_of_cols}`);
                    // console.log("---------");
                    //spreadsheet.formulaMap.set("inp-"+result_cell, formula);
                    spreadsheet.formulaMap.set(e.target.id, e.target.value);
                    let sum = 0;
                    for (let i = start_col.charCodeAt(0); i <= end_col.charCodeAt(0); i++) {
                        let chr = String.fromCharCode(i);
                        for (let j = start_row; j <= end_row; j++) {

                            //console.log(`${i} and ${j}`);
                            let val = document.getElementById("inp-" + chr + j).value;
                            let value = 0;
                            if (/^\+?(0|[1-9]\d*)$/.test(val))
                                value = parseInt(val);
                            sum += value;

                        }
                    }
                    e.target.value = sum;

                } else {

                    e.target.value = "INVALID!";

                }
            }
            catch (err) {
                e.target.value = "INVALID!";
            }
        }
    })


let temp = Rx.Observable.fromEvent(input, 'keyup')
    .map((e) => e)
    .filter(e => e.target.value.startsWith('='))
    //.filter(e => e.target.value.startsWith('/^=\D\d+/i') ) 
    .subscribe(e => {

        if (e.code == "Enter") {
            let s_orig = e.target.value;
            let s = s_orig.substring(1, s_orig.length);
            let parts = s.split(/[^A-Za-z0-9]/);

            for (i = 0; i < parts.length; i++) {
                let val = 0, value = 0;
                let node = document.getElementById("inp-" + parts[i]);
                if (node !== null) {
                    val = node.value;
                }
                if (/^\+?(0|[1-9]\d*)$/.test(val)) {
                    value = parseInt(val);
                }
                value = value.toString();
                s = s.replace(parts[i], value);

            }
            //console.log(s);
            let total = math.evaluate(s);
            //console.log(total);
            if (!isNaN(total)) {
                spreadsheet.formulaMap.set(e.target.id, e.target.value);
                e.target.value = total;
            }

        }


    })


let updateFields = Rx.Observable.fromEvent(input, 'keyup')
    .map((e) => e)
    .subscribe(e => {
        if (e.code == "Tab") {
            for (let [k, v] of spreadsheet.formulaMap) {
                let input_cell = document.getElementById(k);
                if (v.startsWith('=SUM(')) {

                    //extracting formula data and metadata
                    let formula = v;                                                 // '=SUM(B1:D9)'
                    let result_cell = input_cell.parentNode.id;                                    //'B10'
                    let result_cell_col = result_cell.substring(0, 1);                         //'B'
                    let result_cell_row = parseInt(result_cell.substring(1, result_cell.length));       //10

                    //extracting column metadata mentioned in the formula by the user
                    let start_cell = formula.split('(').pop().split(':')[0];    //B1
                    let end_cell = formula.split(':').pop().split(')')[0];      //D9
                    let start_col = start_cell.substring(0, 1);                 //B
                    let start_row = parseInt(start_cell.substring(1, start_cell.length)); //1
                    let end_col = end_cell.substring(0, 1);                     //D
                    let end_row = parseInt(end_cell.substring(1, end_cell.length));      //9

                    // extracting spreadsheet details
                    let no_of_rows = input.rows.length - 1;
                    let no_of_cols = input.rows[1].querySelectorAll("td").length;

                    // to check if the formula cell is not a part of the formula
                    let flag = true;

                    if (result_cell_col >= start_col && result_cell_col <= end_col) {
                        if (result_cell_row >= start_row && result_cell_row <= end_row) {
                            flag = false;
                        }
                    }

                    //check if the cells entered in the formula are valid cells in the spreadsheet
                    if (start_col >= 'A' && start_col <= String.fromCharCode(64 + no_of_cols)
                        && end_col >= 'A' && end_col <= String.fromCharCode(64 + no_of_cols)
                        && start_row >= 1 && start_row <= no_of_rows
                        && end_row >= 1 && end_row <= no_of_rows
                        && flag) {

                        // console.log(`${start_col} ${start_row} ${end_col} ${end_row}`);
                        // console.log(`${no_of_rows} ${no_of_cols}`);
                        // console.log("---------");
                        //spreadsheet.formulaMap.set("inp-"+result_cell, formula);
                        let sum = 0;
                        for (let i = start_col.charCodeAt(0); i <= end_col.charCodeAt(0); i++) {
                            let chr = String.fromCharCode(i);
                            for (let j = start_row; j <= end_row; j++) {

                                //console.log(`${i} and ${j}`);
                                let val = document.getElementById("inp-" + chr + j).value;
                                let value = 0;
                                if (/^\+?(0|[1-9]\d*)$/.test(val))
                                    value = parseInt(val);
                                sum += value;

                            }
                        }
                        input_cell.value = sum;

                    } else {

                        e.target.value = "INVALID!";
    
                    }

                }
                else {
                    let s_orig = v;
                    let s = s_orig.substring(1, s_orig.length);
                    let parts = s.split(/[^A-Za-z0-9]/);

                    for (i = 0; i < parts.length; i++) {
                        let val = 0, value = 0;
                        let node = document.getElementById("inp-" + parts[i]);
                        if (node !== null) {
                            val = node.value;
                        }
                        if (/^\+?(0|[1-9]\d*)$/.test(val)) {
                            value = parseInt(val);
                        }
                        value = value.toString();
                        s = s.replace(parts[i], value);

                    }
                    //console.log(s);
                    let total = math.evaluate(s);
                    //console.log(total);
                    if (!isNaN(total)) {
                        input_cell.value = total;
                    }
                }
            }
        }
    })