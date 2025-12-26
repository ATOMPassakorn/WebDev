const container1 = document.createElement("div");
const span1 = document.createElement("span");
const textspan1 = document.createTextNode("ชื่อ:");
span1.appendChild(textspan1);
const input1 = document.createElement("input");
input1.type = "text";
container1.appendChild(span1);
container1.appendChild(input1);
document.body.appendChild(container1);

const container2 = document.createElement("div");
const span2 = document.createElement("span");
const textspan2 = document.createTextNode("นามสกุล:");
span2.appendChild(textspan2);
const input2 = document.createElement("input");
input2.type = "text";
container2.appendChild(span2);
container2.appendChild(input2);
document.body.appendChild(container2);

const container3 = document.createElement("div");
const span3 = document.createElement("span");
const textspan3 = document.createTextNode("ประเทศ:");
span3.appendChild(textspan3);
const input3 = document.createElement("select");
const defaultOption = document.createElement("option");
defaultOption.text = "เลือกประเทศ";
input3.appendChild(defaultOption);
const countries = ["ไทย", "ญี่ปุ่น", "เกาหลี", "จีน"];
countries.forEach(function (item) {
    const option = document.createElement("option");
    option.value = item;
    option.text = item;
    input3.appendChild(option);
});
container3.appendChild(span3);
container3.appendChild(input3);
document.body.appendChild(container3);

const button = document.createElement("button");
const textbutton = document.createTextNode("เปลี่ยนเป็นอังกฤษ");
button.appendChild(textbutton);
document.body.appendChild(button);