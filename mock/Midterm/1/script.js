const table = document.createElement("table");

const row1 = document.createElement("tr");

const head1 = document.createElement("th");
const texthead1 = document.createTextNode("ID");
head1.appendChild(texthead1);

const head2 = document.createElement("th");
const texthead2 = document.createTextNode("NAME");
head2.appendChild(texthead2);

const head3 = document.createElement("th");
const texthead3 = document.createTextNode("GENDER");
head3.appendChild(texthead3);

const head4 = document.createElement("th");
const texthead4 = document.createTextNode("POSITION");
head4.appendChild(texthead4);

const head5 = document.createElement("th");
const texthead5 = document.createTextNode("POSITION BAR");
head5.appendChild(texthead5);

const head6 = document.createElement("th");
const texthead6 = document.createTextNode("ADDRESS");
head6.appendChild(texthead6);

row1.appendChild(head1);
row1.appendChild(head2);
row1.appendChild(head3);
row1.appendChild(head4);
row1.appendChild(head5);
row1.appendChild(head6);

table.appendChild(row1);

document.body.appendChild(table);

function emp(data) {
    data.forEach(emp => {
        const row2 = document.createElement("tr");

        const column1 = document.createElement("td");
        column1.appendChild(document.createTextNode(emp.id));

        const column2 = document.createElement("td");
        column2.appendChild(document.createTextNode(emp.name));

        const column3 = document.createElement("td");
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(emp.gender[0]));
        column3.appendChild(p);

        if (emp.gender[0] === "F") {
            p.className = "female";
        } else {
            p.className = "male";
        }

        const column4 = document.createElement("td");
        column4.appendChild(document.createTextNode(emp.position));

        const column5 = document.createElement("td");
        column5.className = "bar-container";
        const progressBg = document.createElement("div");
        progressBg.className = "progress-bg";
        const progressFill = document.createElement("div");
        progressFill.className = "progress-fill";
        progressFill.style.width = emp.position_bar + "%";
        progressBg.appendChild(progressFill);
        column5.appendChild(progressBg);

        const column6 = document.createElement("td");
        column6.appendChild(document.createTextNode(emp.address));

        row2.appendChild(column1);
        row2.appendChild(column2);
        row2.appendChild(column3);
        row2.appendChild(column4);
        row2.appendChild(column5);
        row2.appendChild(column6);

        table.appendChild(row2);
    });
}

fetch('employees.json')
    .then(response => response.json())
    .then(data => emp(data))
    .catch(error => console.log('error', error));