let input = document.querySelector("input[type = text]");
let button = document.querySelector("button.get-button");
let dataContainer = document.querySelector(".show-data");

let popup = document.querySelector('.popup');

button.onclick = function () {
    getRepo();
};

function getRepo() {
    if (input.value === "") {
        dataContainer.innerHTML = "No Data To Show";
        popup.children[0].innerHTML = `<p>Username Field Can't Be Empty</p>`;
        showPopup();
    } else {
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((response) => response.json())
        .then((repo) => {
            if (repo.length == 0) {
                dataContainer.innerHTML = "No Data To Show"
                popup.children[0].innerHTML = "Please Enter A Valid Username";
                showPopup();
            } else {
                dataContainer.innerHTML = "";
                repo.forEach(e => {
                    let mainDiv = document.createElement('div');
                    let p = document.createElement('p');
                    let div = document.createElement('div');
                    let span = document.createElement('span');
                    let a = document.createElement('a');
                    p.innerHTML = e.name;
                    span.innerHTML = `${e.stargazers_count} Stars`;
                    a.innerHTML = "Visit";
                    a.href = `https://github.com/${input.value}/${e.name}`;
                    a.setAttribute('target', '_blank');
                    div.appendChild(span);
                    div.appendChild(a);
                    mainDiv.appendChild(p);
                    mainDiv.appendChild(div);
                    mainDiv.classList.add('main-div');
                    dataContainer.appendChild(mainDiv);
                });
            };
            input.value = "";
        });
    };
};

function showPopup() {
    popup.style.opacity = 1;
    setTimeout(function () {
        popup.style.opacity = 0;
    } , 1500);
};