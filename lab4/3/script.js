document.body.style.fontFamily = "'Prompt', sans-serif";

let totalBalance = 0;

const Title = document.createElement("h1");
const TitleText = document.createTextNode("ตารางรายรับ-รายจ่าย");
Title.appendChild(TitleText);
Title.style.textAlign = "center";
Title.style.fontSize = "40px";
document.body.appendChild(Title);

const Title2 = document.createElement("h1");
const TitleText2 = document.createTextNode("ยอดคงเหลือ");
Title2.appendChild(TitleText2);
Title2.style.textAlign = "center";
document.body.appendChild(Title2);

const Title3 = document.createElement("h1");
const TitleText3 = document.createTextNode(totalBalance);
Title3.appendChild(TitleText3);
Title3.style.textAlign = "center";
document.body.appendChild(Title3);

const container = document.createElement("div");

const input1 = document.createElement("input");
input1.type = "text";
input1.placeholder = "รายการ";
input1.style.marginRight = "10px";
container.appendChild(input1);

const input2 = document.createElement("input");
input2.type = "number";
input2.placeholder = "จำนวน";
input2.style.marginRight = "10px";
container.appendChild(input2);

const select = document.createElement("select");
const list = ["รายรับ", "รายจ่าย"];
list.forEach(function (list) {
    const option = document.createElement("option");
    option.value = list;
    option.text = list;
    select.appendChild(option);
});
select.style.marginRight = "10px";
container.appendChild(select);

const input3 = document.createElement("input");
input3.type = "date";
input3.style.marginRight = "10px";
container.appendChild(input3);

const button = document.createElement("button");
const buttonText = document.createTextNode("เพิ่มรายการ");
button.appendChild(buttonText);
button.style.backgroundColor = "#2ea44f";
button.style.color = "white";
button.style.borderRadius = "5px";
button.style.border = "none";
button.style.padding = "5px";
button.style.cursor = "pointer";
container.appendChild(button);

container.style.textAlign = "center";
document.body.appendChild(container);

const table = document.createElement("table");
table.style.width = "40%";
table.style.margin = "30px auto";
table.style.borderCollapse = "collapse";

const row1 = document.createElement("tr");

const head1 = document.createElement("th");
const texthead1 = document.createTextNode("วันที่");
head1.appendChild(texthead1);

const head2 = document.createElement("th");
const texthead2 = document.createTextNode("รายการ");
head2.appendChild(texthead2);

const head3 = document.createElement("th");
const texthead3 = document.createTextNode("รายรับ");
head3.appendChild(texthead3);

const head4 = document.createElement("th");
const texthead4 = document.createTextNode("รายจ่าย");
head4.appendChild(texthead4);

row1.appendChild(head1);
row1.appendChild(head2);
row1.appendChild(head3);
row1.appendChild(head4);
table.appendChild(row1);
document.body.appendChild(table);

button.onclick = function () {
    const date = input3.value;
    const dateText = document.createTextNode(date);
    const name = input1.value;
    const nameText = document.createTextNode(name);
    const amount = Number(input2.value);
    const amoutText = document.createTextNode(amount);
    const type = select.value;

    const row2 = document.createElement("tr");

    const column1 = document.createElement("td");
    column1.appendChild(dateText);

    const column2 = document.createElement("td");
    column2.appendChild(nameText);

    const column3 = document.createElement("td");
    const column4 = document.createElement("td");

    [column1, column2, column3, column4].forEach(col => {
        col.style.border = "1px solid #ddd";
        col.style.padding = "10px";
        col.style.fontSize = "16px";
        col.style.textAlign = "center";
    });

    if (type == "รายรับ") {
        column3.appendChild(amoutText);
        column4.appendChild(document.createTextNode("0"));
        totalBalance += amount;
    } else if (type == "รายจ่าย") {
        column3.appendChild(document.createTextNode("0"));
        column4.appendChild(amoutText);
        totalBalance -= amount;
    }
    row2.appendChild(column1);
    row2.appendChild(column2);
    row2.appendChild(column3);
    row2.appendChild(column4);
    table.appendChild(row2)
    TitleText3.nodeValue = totalBalance;
    input1.value = "";
    input2.value = "";
}

row1.style.backgroundColor = "#1abc9c";
row1.style.color = "white";

[head1, head2, head3, head4].forEach(head => {
    head.style.border = "1px solid #ddd";
    head.style.padding = "12px";
    head.style.fontSize = "18px";
});