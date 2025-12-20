function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var scoreElement = document.querySelectorAll(".score");
scoreElement.forEach((scoreTd) => {
    scoreTd.innerText = randomIntFromInterval(40, 100);
});

function calculateGrade() {
    const score = document.querySelectorAll(".score");
    const grade = document.querySelectorAll(".grade");
    score.forEach((scoreTd, index) => {
        let score = scoreTd.innerText;
        let result = "";

        if (score >= 80 && score <= 100) {
            result = 'A';
        } else if (score >= 70) {
            result = 'B';
        } else if (score >= 60) {
            result = 'C';
        } else if (score >= 50) {
            result = 'D';
        } else {
            result = 'F';
        }
        grade[index].innerHTML = result;
    });
}

