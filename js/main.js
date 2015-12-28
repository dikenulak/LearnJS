var newData;
var newFile = new XMLHttpRequest();
newFile.open("GET", "data/data.csv", true);
newFile.onreadystatechange = function() {
  if (newFile.readyState == 4) {
     if (newFile.status == 200 || newFile.status == 0) {
      newData = newFile.responseText;
      getDataIn(newData);
    }
  }
}
newFile.send();

function getHeaders(){
  var rawData = newData.split('\n');
  var headers = rawData[0].split(',');
  return headers;
}
function showPopulation() {
 var table = document.getElementsByTagName('table')[0];
 //ar tbody = table.getElementsByTagName('tbody')[0];
   var tableRowCount = table.rows.length;
    var totalPopulation = [];
   for(var i = 1; i < tableRowCount;i++){
    totalPopulation.push(parseInt(table.rows[i].cells[1].innerHTML));
        // totalPopulation.push(table.rows[i].cells[1].innerHTML);
        var insertPopulation = totalPopulation.reduce(function(a,b){
        return a + b;
       });
    document.querySelector('span').innerHTML = insertPopulation;
 }

 // getTotalPopulation(totalPopulation);
 //  return function(){
 //    return true;
 //  }
 // var netPopulation = JSON.parse("[" + totalPopulation.join() + "]");
 // var netPopulation = JSON.stringify(totalPopulation);
}
// function getTotalPopulation(){

//   showPopulation();
// //   totalPopulation = totalPopulation.map(function(v) {
// //   return eval('(' + v + ')');
// // });
// //   totalPopulation = JSON.stringify(totalPopulation);
//   // for(var i = 0; i < totalPopulation.length; i ++){
//   //    var insertPopulation = totalPopulation[i].reduce((a, b) => a + b);
//   // }


// }

function getDataIn(){
  var district = document.getElementById('districts');
    district.style.overflow = "auto";

  var table = document.createElement("table");
  table.setAttribute('class','table table-hover table-bordered');
  //var thead = document.createElement("thead");
   district.appendChild(table);
  var tbdy = document.createElement("tbody");
  //  table.appendChild(thead);
  table.appendChild(tbdy);
  var rowsOfData = newData.split('\n');
  for(var i = 0; i < rowsOfData.length;i++){
    var rows = table.insertRow(-1);
    var cells = rowsOfData[i].split(",");
    for(var j = 0; j < cells.length; j++){
      var cell = rows.insertCell(-1);
      cell.innerHTML = cells[j];
    }
    tbdy.appendChild(rows);
   }
  details();
  showPopulation();
 }


 function dataSearch() {
  var searchBox= document.getElementById('input');
  var searchValue = searchBox.value.toLowerCase();

  var district = document.getElementById('districts');
  var table = district.getElementsByTagName("table")[0];
//   var tableCount;

//   for(var rowIndex = 0; rowIndex < table.rows.length; rowIndex++){
//     var rowData;
//     if(rowIndex == 0){
//       tableCount = table.rows.length(rowindex).cells.length;
//       continue;
//     }
//     for(var colIndex = 0; colIndex < tableCount; colIndex++){
//       rowData += table.rows.item(rowIndex.cells.item(colIndex).textContent);
//       rowData = rowData.toLowerCase();
//     }
//     document.write(rowData);
//     if(rowData.indexOf(searchValue) == -1)
//        table.rows.item(rowIndex).style.display = 'none';
//      else
//       table.rows.item(rowIndex).style.display = '';
//   }
var row=table.getElementsByTagName("tr");
    var noOfRows=row.length;
    for(var i=1;i<noOfRows;i++){
        var cells =row[i].getElementsByTagName("td");
        var noOfCells=cells.length;

        var noMatches=0;
        for (var j = 0; j < cells.length; j++) {
                var value=cells[j].innerHTML.toLowerCase();
            if(value.indexOf(searchValue)==-1)
                noMatches++;
        }
        if(noMatches==cells.length)
            row[i].style.display="none";
        }

}
 function inputKeyUp(e) {
    e.which = e.which || e.keyCode;
    if(e.which == 13) {
        dataSearch();
    }
  }


// function Show(){

//   var elem = document.getElementById('data');
//   elem.style.background = 'red';
//   elem.style.height = 400 + 'px';
//   elem.style.width = 400 + 'px';

// }
function details(){
  var table = document.getElementsByTagName("table")[0];
   var tbody = table.getElementsByTagName("tbody")[0];
   tbody.onclick = function (e) {
        e = e || window.event;
        var selectedRowData = [];
        var target = e.srcElement || e.target;
        while (target && target.nodeName!== "TR") {
            target = target.parentNode;
        }
        if (target) {
            var cells =target.getElementsByTagName("td");
            for (var i = 0; i < cells.length; i++) {
                selectedRowData.push(cells[i].innerHTML);
            }
        }
        var heading = getHeaders();
        detailTable(heading,selectedRowData);
        return function(){
            return true;
        }
         //alert(selectedRowData);
    };
}

 function detailTable(heading,selectedRowData) {
    var table,tbdy;
    var data = document.getElementsByTagName('aside')[0];
       //first instance
    if(!data.hasChildNodes()){
        data.style.overflow = "auto";
        table = document.createElement("table");
        table.setAttribute('class', 'table table-hover table-bordered');
        data.appendChild(table);
        tbdy = document.createElement("tbody");
        table.appendChild(tbdy);

        for(var i=0;i<heading.length;i++){
            var row=table.insertRow(-1);
            var headingCell=row.insertCell(-1);
            headingCell.innerHTML=heading[i];

            var dataCell= row.insertCell(-1);
            dataCell.innerHTML=selectedRowData[i];
            tbdy.appendChild(row);
        }
    }else{
        table=data.getElementsByTagName("table")[0];
        var noOfRows=table.rows.length;
        for(var i=0;i<noOfRows;i++){
                table.rows[i].cells[0].innerHTML=heading[i];
                table.rows[i].cells[1].innerHTML=selectedRowData[i];
        }
    }
}



