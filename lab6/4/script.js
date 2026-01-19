function SaveForm() {
    let movieName = document.getElementById("movie").value;

    if (movieName === "") {
        alert("กรุณากรอกชื่อภาพยนต์หรือซีรีส์");
        return;
    }

    let data = localStorage.getItem("movies");

    let movies;
    if (data === null) {
        movies = [];
    } else {
        movies = JSON.parse(data);
    }

    movies.push(movieName);

    localStorage.setItem("movies", JSON.stringify(movies));

    document.getElementById("movie").value = "";

    LoadData();
}

function LoadData() {
    let container = document.getElementById("name");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    let data = localStorage.getItem("movies");
    if (data === null) {
        let p = document.createElement("p");
        let text = document.createTextNode("ยังไม่มีรายการโปรด");
        p.appendChild(text);
        container.appendChild(p);
        return;
    };

    let movies = JSON.parse(data);

    for (let i = 0; i < movies.length; i++) {
        let p = document.createElement("p");
        let pContent = document.createTextNode("🎬 " + movies[i]);
        p.appendChild(pContent)

        let btn = document.createElement("button");
        let del = document.createTextNode("ลบ");
        btn.appendChild(del);

        btn.onclick = function () {
            DeleteItem(i);
        };

        p.appendChild(btn);
        container.appendChild(p);
    }
}

function DeleteItem(index) {
    let data = localStorage.getItem("movies");
    let movies = JSON.parse(data);

    movies.splice(index, 1);

    if (movies.length === 0) {
        localStorage.removeItem("movies");
    } else {
        localStorage.setItem("movies", JSON.stringify(movies));
    }

    LoadData();
}

function ClearAll() {
    localStorage.removeItem("movies");
    LoadData();
}

LoadData();
