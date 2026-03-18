let p = document.createElement("p");
let pText = document.createTextNode("เลือกชื่อผู้ใช้งาน :");
p.appendChild(pText);
document.body.appendChild(p);

let select = document.createElement("select");
let option = document.createElement("option");
option.value = "";
option.disabled = true;
option.selected = true;
option.hidden = true;
let text = document.createTextNode("กรุณาเลือกชื่อผู้ใช้");
option.appendChild(text);
select.appendChild(option);
document.body.appendChild(select);

let div = document.createElement("div");
let button = document.createElement("button");
let buttonText = document.createTextNode("แสดงข้อมูล");
button.appendChild(buttonText);
div.appendChild(button);
document.body.appendChild(div);

const formContainer = document.createElement("div");
formContainer.style.marginTop = "20px";

function createLabeledInput(labelText, id, placeholderText) {
    let label = document.createElement("p");
    label.textContent = labelText;
    let input = document.createElement("input");
    input.id = id;
    input.placeholder = placeholderText;
    input.style.display = "block";
    formContainer.append(label, input);
    return input;
}

const inpIdCard = createLabeledInput("หมายเลขบัตรประชาชน:", "idCard", "กรุณากรอกหมายเลขบัตรประชาชน");

let label2 = document.createElement("p");
label2.textContent = "คำนำหน้านาม: ";
let select2 = document.createElement("select");
let option2 = document.createElement("option");
option2.value = "";
option2.disabled = true;
option2.selected = true;
option2.hidden = true;
let text2 = document.createTextNode("กรุณาเลือกคำนำหน้านาม");
let manOption = document.createElement("option");
let manText = document.createTextNode("Mr.");
manOption.appendChild(manText);
let womanOption = document.createElement("option");
let womanText = document.createTextNode("Ms.");
womanOption.appendChild(womanText);
let womanOption2 = document.createElement("option");
let womanText2 = document.createTextNode("Mrs.");
womanOption2.appendChild(womanText2);
option2.appendChild(text2);
select2.appendChild(option2);
select2.appendChild(manOption);
select2.appendChild(womanOption);
select2.appendChild(womanOption2);
formContainer.appendChild(label2);
formContainer.appendChild(select2);

const inpFName = createLabeledInput("ชื่อ:", "firstName", "กรุณากรอกชื่อของคุณ");
const inpLName = createLabeledInput("นามสกุล:", "lastName", "กรุณากรอกนามสกุลของคุณ");
const inpEmail = createLabeledInput("Email:", "email", "กรุณากรอก email ของคุณ");

document.body.appendChild(formContainer);

let allEmployees = [];

function emp(data) {
    allEmployees = data;

    data.forEach(emp => {
        let nameOption = document.createElement("option");
        nameOption.value = emp.id;
        let name = document.createTextNode(emp.id + " " + emp.displayName);
        nameOption.appendChild(name);
        select.appendChild(nameOption);
    });
}

button.onclick = function() {
    const selectedId = select.value;
    const user = allEmployees.find(e => e.id == selectedId);
    
    if (user) {
        inpIdCard.value = user.idCard;
        select2.value = user.title;
        inpFName.value = user.firstName;
        inpLName.value = user.lastName;
        inpEmail.value = user.email;
    } else {
        alert("กรุณาเลือกรายชื่อผู้ใช้งานก่อน");
    }
};

let submitBtn = document.createElement("button");
submitBtn.textContent = "Submit";
submitBtn.style.marginTop = "15px";
formContainer.appendChild(submitBtn);

submitBtn.onclick = function() {
    const firstName = inpFName.value;
    const email = inpEmail.value;

    if (/\d/.test(firstName)) {
        alert("ชื่อต้องไม่มีตัวเลขปนอยู่");
        return;
    }

    if (email.length === 0 || !email.includes("@")) {
        alert("email ต้องมีความยาวและมีตัว @");
        return;
    }

    alert("Submit success");
    select.selectedIndex = 0;
    select2.selectedIndex = 0;
    inpIdCard.value = "";
    inpFName.value = "";
    inpLName.value = "";
    inpEmail.value = "";
};

fetch('employees.json')
    .then(response => response.json())
    .then(data => emp(data))
    .catch(error => console.log('error', error));