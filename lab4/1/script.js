const title = document.createElement("h2");
const titletext = document.createTextNode("ป้อนเลขสูตรคูณ (1-12):");
title.appendChild(titletext);
document.body.appendChild(title);

const input = document.createElement("input");
input.type = "number";
document.body.appendChild(input);

const button = document.createElement("button");
const buttontext = document.createTextNode("แสดงผลคูณ");
button.appendChild(buttontext);
document.body.appendChild(button);

const display = document.createElement("div");
document.body.appendChild(display);

button.onclick = function(){
    const table = document.createElement("table");

    const row1 = document.createElement("tr");

    const head1 = document.createElement("th");
    const texthead1 = document.createTextNode("เลขคูณ");
    head1.appendChild(texthead1);

    const head2 = document.createElement("th");
    const texthead2 = document.createTextNode("ผลลัพธ์");
    head2.appendChild(texthead2);

    row1.appendChild(head1);
    row1.appendChild(head2);
    table.appendChild(row1);

    for(let i=1;i<=12;i++){
        const number = input.value;

        const row3 = document.createElement("tr");
        
        const column1 = document.createElement("td");
        const textcolumn1 = document.createTextNode(number + "x" + i);
        column1.appendChild(textcolumn1);
        
        const column2 = document.createElement("td");
        const textcolumn2 = document.createTextNode(number * i);
        column2.appendChild(textcolumn2);

        row3.appendChild(column1);
        row3.appendChild(column2);
        table.appendChild(row3);
    }
    display.appendChild(table);
}
