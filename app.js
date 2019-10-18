document.querySelector("#form").addEventListener("submit", function(event) {
    event.preventDefault();
})

let coursesList = getCourses();

if (coursesList === null)
{
    coursesList = [
        {
            author: "Martin Nieva",
            title: "Javascript, HTML, CSS",
            imgUrl: "./img/terry.png",
            rating: 5
        },

        {
            author: "Ignacio Dodero",
            title: "Learn the guitar",
            imgUrl: "./img/terry.png",
            rating: 4
        },

        {
            author: "Mr. God",
            title: "Using magic from scratch",
            imgUrl: "./img/terry.png",
            rating: 5
        },

        {
            author: "Unknown Redhead Girl",
            title: "How to be beautiful",
            imgUrl: "./img/terry.png",
            rating: 5
        },

        {
            author: "Daniel Kahneman",
            title: "Psychology Basics",
            imgUrl: "./img/terry.png",
            rating: 4
        },

        {
            author: "Terry A. Davis and Mr. God",
            title: "Make an OS from scratch",
            imgUrl: "./img/terry.png",
            rating: 5, 
        }
    ];

    localStorage.setItem("courses", JSON.stringify(coursesList));
}

for (let i = 0; i < coursesList.length; i++)
{
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="of">
            <div id="cardImg-${i}" class="card-img">
            </div>
        </div>
        <div class="card-content">
            <span class="card-title">${coursesList[i].title}</span>
            <span class="card-author">${coursesList[i].author}</span>
            <span class="card-rating">${coursesList[i].rating}</span>
        </div>
    `;

    document.querySelector("#cardContainer").append(card);

    document.querySelector("#cardImg-" + i).style.background = "#cfcfcf url(" + coursesList[i].imgUrl + ") center center no-repeat";
    document.querySelector("#cardImg-" + i).style.backgroundSize = "cover";
}

function getCourses()
{
    return JSON.parse(localStorage.getItem("courses"));
}