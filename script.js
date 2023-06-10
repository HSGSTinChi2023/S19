const tabDef = {
    row: 6,
    col: 7,
};

const body = document.body;
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];



//..............................................................................................................
//..............................................................................................................
//..............................................................................................................
//create variables..............................................................................................
//..............................................................................................................
//..............................................................................................................
//..............................................................................................................



var x = new Array(tabDef.row + 1)
var arr = new Array(tabDef.row + 1)
var countclick = new Array(tabDef.row + 1)
var shape = new Array(tabDef.row + 1) 
var area = new Array(tabDef.row + 1)
var ok = new Array(tabDef.row + 1)
//
var sumrow = new Array(tabDef.row + 1);
var sumcol = new Array(tabDef.col + 1);
//
var fill = 0;

for(let i = 0; i <= tabDef.row; i++) { 
    x[i] = new Array(tabDef.col + 1);
    arr[i] = new Array(tabDef.col + 1);
    shape[i] = new Array(tabDef.col + 1);
    countclick[i] = new Array(tabDef.col + 1);
    area[i] = new Array(tabDef.col + 1);
    ok[i] = new Array(tabDef.col + 1);
}

for(let i = 0; i < tabDef.row; i++) {
    for(let j = 0; j < tabDef.col; j++) {
        arr[i][j] = 0;
        countclick[i][j] = 0;
        area[i][j] = 0;
        ok[i][j] = 0;
    }
}

for(let i = 0; i < tabDef.row; i++) {
    sumrow[i] = "";
}
for(let i = 0; i < tabDef.col; i++) {
    sumcol[i] = "";
}


function inside(x, y) { // return if the coordination is inside the board
    if(x >= tabDef.row)
        return 0;
    if(x < 0)
        return 0;
    if(y >= tabDef.col)
        return 0;
    if(y < 0)
        return 0;
    return 1;
}

function Surround(r, c) {
    cnt = 0;
    if(inside(r - 1, c) == 1 && arr[r - 1][c] > 0) cnt++;
    if(inside(r + 1, c) == 1 && arr[r + 1][c] > 0) cnt++;
    if(inside(r, c - 1) == 1 && arr[r][c - 1] > 0) cnt++; 
    if(inside(r, c + 1) == 1 && arr[r][c + 1] > 0) cnt++;
    return cnt;
}

function getInt(num) { // return randon number from 0 to (num - 1)
    return Math.floor(Math.random() * num)
}

function Ship() {
    r1 = 0; r2 = 0; r3 = 0; c1 = 0; c2 = 0; c3 = 0;
    
    lr = getInt(2); // SHIP 1
    if(lr == 1) c1 = tabDef.col - 1;
    r1 = getInt(3);
    arr[r1][c1] = 4; arr[r1 + 1][c1] = 4; arr[r1 + 2][c1] = 4; arr[r1 + 3][c1] = 4;
    // x[r1][c1].style.backgroundColor = "Pink"; 
    // x[r1 + 1][c1].style.backgroundColor = "Pink"; 
    // x[r1 + 2][c1].style.backgroundColor = "Pink";
    // x[r1 + 3][c1].style.backgroundColor = "Pink";

    r2 = getInt(6); // SHIP 2
    while(c2 == 0) c2 = getInt(3);
    arr[r2][c2] = 4; arr[r2][c2 + 1] = 4; arr[r2][c2 + 2] = 4; arr[r2][c2 + 3] = 4;
    // x[r2][c2].style.backgroundColor = "Pink"; 
    // x[r2][c2 + 1].style.backgroundColor = "Pink"; 
    // x[r2][c2 + 2].style.backgroundColor = "Pink";
    // x[r2][c2 + 3].style.backgroundColor = "Pink";

    if(c2 == 2) c3 = 1; // SHIP 3
    else if(c2 == 1) c3 = 2;
    r3 = r2;
    while(r3 == r2) r3 = getInt(6);
    arr[r3][c3] = 4; arr[r3][c3 + 1] = 4; arr[r3][c3 + 2] = 4; arr[r3][c3 + 3] = 4;
    // x[r3][c3].style.backgroundColor = "Pink"; 
    // x[r3][c3 + 1].style.backgroundColor = "Pink"; 
    // x[r3][c3 + 2].style.backgroundColor = "Pink";
    // x[r3][c3 + 3].style.backgroundColor = "Pink";


    sr1 = 0; sc1 = 0; sr2 = 0; sc2 = 0; sr3 = 0; sc3 = 0;
    if(r2 > r3) { 
        temp = r3; r3 = r2; r2 = temp;
    }
    if(r2 >= 2) sr1 = getInt(r2 - 2 + 1); // SHIP 1
    else if(r3 - r2 > 2) sr1 = getInt(r3 - r2 - 1 - 1) + r2 + 1;
    else if(5 - r3 >= 2) sr1 = getInt(5 - r3 - 1 - 1) + r3 + 1;
    while(sc1 == 0) sc1 = getInt(6);
    arr[sr1][sc1] = 2; arr[sr1 + 1][sc1] = 2;
    //x[sr1][sc1].style.backgroundColor = "Green"; x[sr1 + 1][sc1].style.backgroundColor = "Green"; 
    
    if(lr == 0) sc2 = tabDef.col - 1; // SHIP 2
    sr2 = sr1;
    while(sr2 == sr1) sr2 = getInt(5);
    arr[sr2][sc2] = 2; arr[sr2 + 1][sc2] = 2;
    //x[sr2][sc2].style.backgroundColor = "Green"; x[sr2 + 1][sc2].style.backgroundColor = "Green";

    sr3 = sr2; sc3 = sc2; // SHIP 3
    while(arr[sr3][sc3] != 0 || Surround(sr3, sc3) != 0) {
        sr3 = getInt(6);
        sc3 = getInt(7);
    }
    arr[sr3][sc3] = 2;
    //x[sr3][sc3].style.backgroundColor = "Blue";
    if(inside(sr3, sc3 - 1) == 1 && arr[sr3][sc3 - 1] == 0) {
        arr[sr3][sc3 - 1] = 2;
        //x[sr3][sc3 - 1].style.backgroundColor = "Blue";
    }
    else if(inside(sr3, sc3 + 1) == 1 && arr[sr3][sc3 + 1] == 0) {
        arr[sr3][sc3 + 1] = 2;
        //x[sr3][sc3 + 1].style.backgroundColor = "Blue";
    }

    fr1 = getInt(6); fc1 = getInt(7); // FLOAT 1
    while(arr[fr1][fc1] > 0) {
        fr1 = getInt(6); fc1 = getInt(7);
    }
    arr[fr1][fc1] = 1; 
    fr2 = getInt(6); fc2 = getInt(7); // FLOAT 2
    while(arr[fr2][fc2] > 0) {
        fr2 = getInt(6); fc2 = getInt(7);
    }
    arr[fr2][fc2] = 1; 
    fr3 = getInt(6); fc3 = getInt(7); // FLOAT 3
    while(arr[fr3][fc3] > 0) {
        fr3 = getInt(6); fc3 = getInt(7);
    }
    arr[fr3][fc3] = 1; 
    // x[fr1][fc1].style.backgroundColor = "Red"; 
    // x[fr2][fc2].style.backgroundColor = "Red";
    // x[fr3][fc3].style.backgroundColor = "Red";
}

function data() {
    Ship();
    temp = 0;
    for(let i = 0; i < 6; i++){
        temp = 0;
        for(let j = 0; j < 7; j++){
            if(arr[i][j] > 0) temp++;
            else{
                if(temp != 0){
                    sumrow[i] += String.fromCharCode(temp + 48);
                    sumrow[i] += " ";
                    temp = 0;
                }
            }
        }
        if(temp > 0){
            sumrow[i] += String.fromCharCode(temp + 48);
            sumrow[i] += " ";
        }
        if(sumrow[i] == "") {
            sumrow[i] = "0 ";
        }
        x[i][7].innerHTML = sumrow[i];
    }
    
    temp = 0;
    for(let i = 0; i < 7; i++){
        temp = 0;
        for(let j = 0; j < 6; j++){
            if(arr[j][i] > 0) temp++;
            else{
                if(temp != 0){
                    sumcol[i] += String.fromCharCode(temp + 48);
                    sumcol[i] += " ";
                    temp = 0;
                }
            }
        }
        if(temp > 0){
            sumcol[i] += String.fromCharCode(temp + 48);
            sumcol[i] += " ";
        }
        if(sumcol[i] == "") sumcol[i] = "0 "
        x[6][i].innerHTML = sumcol[i];
    }
}



//..............................................................................................................
//..............................................................................................................
//..............................................................................................................
//fill the board................................................................................................
//..............................................................................................................
//..............................................................................................................
//..............................................................................................................



var rr = 0
var cc = 0

function up() {
    remove(rr, cc);
    shape[rr][cc].classList.add("card-up");
    ok[rr][cc] = 1;
}
function down() {
    remove(rr, cc);
    shape[rr][cc].classList.add("card-down");
    ok[rr][cc] = 1;
}
function right() {
    remove(rr, cc);
    shape[rr][cc].classList.add("card-right");
    ok[rr][cc] = 1;
}
function left() {
    remove(rr, cc);
    shape[rr][cc].classList.add("card-left");
    ok[rr][cc] = 1;
}
function square() {
    remove(rr, cc);
    shape[rr][cc].classList.add("square");
    ok[rr][cc] = 1;
}
function circle() {
    remove(rr, cc);
    shape[rr][cc].classList.add("circle");
    ok[rr][cc] = 1;
}
function choose() {
    if(ok[rr][cc] == 0) {
        remove(rr, cc);
        shape[rr][cc].classList.add("square-rad");        
    }
    document.getElementById("win").style.display = "none";
    ok[rr][cc] = 0;
}

function remove(i, j) { // clear all types of shape in the button
    shape[i][j].classList.remove("square");
    shape[i][j].classList.remove("square-rad");
    shape[i][j].classList.remove("card-up");
    shape[i][j].classList.remove("card-down");
    shape[i][j].classList.remove("card-left");
    shape[i][j].classList.remove("card-right");  
    shape[i][j].classList.remove("circle"); 
}

function combine(i, j) {
    if(countclick[i][j] == 0) { 
        area[i][j] = 1;
        x[i][j].style.backgroundColor = "rgb(0, 191, 255)";
        fill++;
    }
    else if(countclick[i][j] == 1) { 
        area[i][j] = 2;
        document.getElementById("win").style.display = "block";
        rr = i;
        cc = j;
    }
    else if(countclick[i][j] == 2) {
        fill--;
        area[i][j] = 0;
        x[i][j].style.backgroundColor = "white";
        remove(i, j);
    }
    countclick[i][j] = (countclick[i][j] + 1) % 3; 
}



//..............................................................................................................
//..............................................................................................................
//..............................................................................................................
//initiate the game.............................................................................................
//..............................................................................................................
//..............................................................................................................
//..............................................................................................................



function createTable() {
    var tbl = document.createElement("table");
    for(let i = 0; i <= tabDef.row; i++) {
        const tr = tbl.insertRow()
        for(let j = 0; j <= tabDef.col; j++) {
            const td = tr.insertCell();
            if(i == tabDef.row || j == tabDef.col) { // hint numbers
                x[i][j] = document.createElement("article");
                x[i][j].classList.add("p");
                td.appendChild(x[i][j]);
                continue;                
            }
            x[i][j] = document.createElement("button")
            x[i][j].classList.add("a")
            shape[i][j] = document.createElement("div")
            x[i][j].appendChild(shape[i][j]);          
            td.appendChild(x[i][j]);    
            x[i][j].addEventListener("mouseup", (e) => { // the event when the button is clicked
                switch(e.button) {
                    case 0:
                        combine(i, j);
                        break;
                    case 1:
                        break;
                    case 2:
                        console.log("right");
                        break;
                }
            });            
        }
    }
    tbl.align = "center";
    body.appendChild(tbl);
    body.style.backgroundColor = "bisque"
}

function checkState() {
   
    if(fill == 42) {
        winnn = 1;
        temp = 0;
        s = "";
        for(let i = 0; i < 6; i++) {
            s = "";
            temp = 0;
            for(let j = 0; j < 7; j++) {
                if(area[i][j] == 2) temp++;
                else{
                    if(temp != 0){
                        s += String.fromCharCode(temp + 48);
                        temp = 0;
                        s += " ";
                    }
                } 
            }
            if(temp != 0) {s += String.fromCharCode(temp + 48);s += " "}
            if(s == "") s = "0 ";
            //console.log(i, ":", s, sumrow[i]);
            if(s != sumrow[i]) {
                winnn = 0;
            }
        }
        s = "";
        for(let i = 0; i < 7; i++) {
            s = "";
            temp = 0;
            for(let j = 0; j < 6; j++) {
                if(area[j][i] == 2) temp++;
                else{
                    if(temp != 0){
                        s += String.fromCharCode(temp + 48);
                        temp = 0;
                        s += " ";
                    }
                } 
            }
            if(temp != 0) {s += String.fromCharCode(temp + 48);s += " "}
            if(s == "") s = "0 ";
            if(s != sumcol[i]) {
                winnn = 0;
            }
            //console.log(i, ":", s, sumcol[i]);
        }
        if(winnn == 1) {
            document.getElementById("hihi").style.display = "block";
            console.log("game completed")
        }
        else if(winnn == 0) {
            document.getElementById("lose").style.display = "block";
            console.log("lose");
        }
    }
}

function replay() {
    document.getElementById("lose").style.display = "none";
}

function comple() {
    location.reload();
}

createTable();

data();

