function student(data) {
    data.forEach((student,i) => {
        ++i;
        let card = document.createElement("div");
        card.className = "card";

        let img = document.createElement("img");
        if (student.gender == 'Male') {
            img.src = 'http://webdev.it.kmitl.ac.th/labdocs/lab6/images/img_male.png';
        } else {
            img.src = 'http://webdev.it.kmitl.ac.th/labdocs/lab6/images/img_female.png';
        }
        card.appendChild(img);

        let nameHead = document.createElement('h3');
        let nameTitle = document.createTextNode(i+". "+student.name);
        nameHead.appendChild(nameTitle);
        card.appendChild(nameHead);

        let phyTag = document.createElement('p');
        let phyValue = document.createTextNode("Physics : "+ student.physics);
        phyTag.appendChild(phyValue);
        card.appendChild(phyTag);

        let mathTag = document.createElement('p');
        let mathValue = document.createTextNode("Mathmatics : "+ student.maths);
        mathTag.appendChild(mathValue);
        card.appendChild(mathTag);

        let engTag = document.createElement('p');
        let engValue = document.createTextNode("English : "+ student.english);
        engTag.appendChild(engValue);
        card.appendChild(engTag);

        document.querySelector(".container").appendChild(card);
    });
}

fetch('student-score.json')
    .then(response => response.json())
    .then(data => student(data))
    .catch(error => console.log('error', error));