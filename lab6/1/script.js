const table = document.createElement("table");

const row1 = document.createElement("tr");

const head1 = document.createElement("th");
const texthead1 = document.createTextNode("ID");
head1.appendChild(texthead1);

const head2 = document.createElement("th");
const texthead2 = document.createTextNode("Name");
head2.appendChild(texthead2);

const head3 = document.createElement("th");
const texthead3 = document.createTextNode("Gender");
head3.appendChild(texthead3);

const head4 = document.createElement("th");
const texthead4 = document.createTextNode("Position");
head4.appendChild(texthead4);

const head5 = document.createElement("th");
const texthead5 = document.createTextNode("Address");
head5.appendChild(texthead5);

row1.appendChild(head1);
row1.appendChild(head2);
row1.appendChild(head3);
row1.appendChild(head4);
row1.appendChild(head5);
table.appendChild(row1);
document.getElementById("table").appendChild(table);

function employees(data) {
    data.forEach(emp => {
        const row2 = document.createElement("tr");

        const column1 = document.createElement("td");
        column1.appendChild(document.createTextNode(emp.id));
        row2.appendChild(column1);

        const column2 = document.createElement("td");
        column2.appendChild(document.createTextNode(emp.FirstName + " " + emp.LastName));
        row2.appendChild(column2);

        const column3 = document.createElement("td");
        column3.appendChild(document.createTextNode(emp.Gender[0]));
        row2.appendChild(column3);

        const column4 = document.createElement("td");
        column4.appendChild(document.createTextNode(emp.Position));
        row2.appendChild(column4);

        const column5 = document.createElement("td");
        column5.appendChild(document.createTextNode(emp.Address));
        row2.appendChild(column5);

        table.appendChild(row2);
    });
}

fetch('employees.json')
    .then(response => response.json())
    .then(data => employees(data))
    .catch(error => console.log('error', error));