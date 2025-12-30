const container1 = document.createElement("div");
const span1 = document.createElement("span");
const textspan1 = document.createTextNode("ชื่อ:");
span1.appendChild(textspan1);
const input1 = document.createElement("input");
input1.type = "text";
input1.style.marginLeft = "5px";
container1.appendChild(span1);
container1.appendChild(input1);
container1.style.marginTop = "5px";
document.body.appendChild(container1);

const container2 = document.createElement("div");
const span2 = document.createElement("span");
const textspan2 = document.createTextNode("นามสกุล:");
span2.appendChild(textspan2);
const input2 = document.createElement("input");
input2.type = "text";
input2.style.marginLeft = "5px";
container2.appendChild(span2);
container2.appendChild(input2);
container2.style.marginTop = "5px";
document.body.appendChild(container2);

const container3 = document.createElement("div");
const span3 = document.createElement("span");
const textspan3 = document.createTextNode("ประเทศ:");
span3.appendChild(textspan3);
const input3 = document.createElement("select");
input3.style.marginLeft = "5px";
const defaultOption = document.createElement("option");
const defaultTextNode = document.createTextNode("เลือกประเทศ");
defaultOption.appendChild(defaultTextNode);
input3.appendChild(defaultOption);
const countryData = {
    th: ["ไทย", "เวียดนาม", "ลาว", "มาเลเซีย", "สิงคโปร์", "ฟิลิปปินส์", "เมียนมาร์", "กัมพูชา", "บรูไน"],
    en: ["Thailand", "Vietnam", "Laos", "Malaysia", "Singapore", "Philippines", "Myanmar", "Cambodia", "Brunei"]
};
countryData.th.forEach(function (item) {
    const option = document.createElement("option");
    option.value = item;
    const optText = document.createTextNode(item);
    option.appendChild(optText);
    option.myTextNode = optText;
    input3.appendChild(option);
});
container3.appendChild(span3);
container3.appendChild(input3);
container3.style.marginTop = "5px";
document.body.appendChild(container3);

const button = document.createElement("button");
const textbutton = document.createTextNode("เปลี่ยนเป็นอังกฤษ");
button.appendChild(textbutton);
button.style.marginTop = "5px";
document.body.appendChild(button);

button.onclick = function () {
    if (textbutton.nodeValue == "เปลี่ยนเป็นอังกฤษ") {
        textspan1.nodeValue = "First Name:";
        textspan2.nodeValue = "Last Name:";
        textspan3.nodeValue = "Country:";
        defaultTextNode.nodeValue = "Select a country";
        for (let i = 1; i < input3.options.length; i++) {
            const opt = input3.options[i];
            opt.myTextNode.nodeValue = countryData.en[i-1];
            opt.value = countryData.en[i-1];
        }
        textbutton.nodeValue = "Change to Thai";
    } else if (textbutton.nodeValue == "Change to Thai") {
        textspan1.nodeValue = "ชื่อ:";
        textspan2.nodeValue = "นามสกุล:";
        textspan3.nodeValue = "ประเทศ:";
        defaultTextNode.nodeValue = "เลือกประเทศ";
        for (let i = 1; i < input3.options.length; i++) {
            const opt = input3.options[i];
            opt.myTextNode.nodeValue = countryData.th[i-1];
            opt.value = countryData.th[i-1];
        }
        textbutton.nodeValue = "เปลี่ยนเป็นอังกฤษ";
    }
}