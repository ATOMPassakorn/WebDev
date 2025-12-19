const img_element = document.querySelectorAll(".random-image");
const btn = document.getElementById("btn");

const srcArray = ['http://webdev.it.kmitl.ac.th/labdocs/lab3/images/1.png', 
    'http://webdev.it.kmitl.ac.th/labdocs/lab3/images/2.png', 
    'http://webdev.it.kmitl.ac.th/labdocs/lab3/images/3.png',
    'http://webdev.it.kmitl.ac.th/labdocs/lab3/images/4.png',
    'http://webdev.it.kmitl.ac.th/labdocs/lab3/images/5.png',
    'http://webdev.it.kmitl.ac.th/labdocs/lab3/images/6.png',
    'http://webdev.it.kmitl.ac.th/labdocs/lab3/images/7.png',
    'http://webdev.it.kmitl.ac.th/labdocs/lab3/images/8.png',
    'http://webdev.it.kmitl.ac.th/labdocs/lab3/images/9.png',
    'http://webdev.it.kmitl.ac.th/labdocs/lab3/images/0.png'];

function randomImg() {
    img_element.forEach((img) => {
        const randomIndex = Math.floor(Math.random() * srcArray.length);
        img.src = srcArray[randomIndex];
    });
}

btn.addEventListener('click', () => {
    randomImg();
});

randomImg();