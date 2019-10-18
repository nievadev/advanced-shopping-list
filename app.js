document.querySelector("#form").addEventListener("submit", function(event) {
    event.preventDefault();
})

let defaultCoursesList = [
    {
        author: "Martin Nieva",
        title: "Master JavaScript, HTML and CSS!",
        imgUrl: "./img/nieva.jpeg",
        rating: 5
    },

    {
        author: "Ignacio Dodero",
        title: "Learn the guitar",
        imgUrl: "./img/dodero.jpeg",
        rating: 4
    },

    {
        author: "Mr. God",
        title: "Using magic from scratch",
        imgUrl: "./img/god.jpeg",
        rating: 5
    },

    {
        author: "Unknown Redhead Girl",
        title: "How to be beautiful",
        imgUrl: "./img/redhead.jpeg",
        rating: 5
    },

    {
        author: "Daniel Kahneman",
        title: "Psychology Basics",
        imgUrl: "./img/kahneman.jpeg",
        rating: 4
    },

    {
        author: "Terry A. Davis and Mr. God",
        title: "Make an OS from scratch",
        imgUrl: "./img/terry.png",
        rating: 5, 
    }
];

let coursesList = [...defaultCoursesList];

localStorage.setItem("courses", JSON.stringify(coursesList));

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
            <div class="card-title">
                <span>${coursesList[i].title}</span>
            </div>
            <div class="card-author">
                <span>${coursesList[i].author}</span>
            </div>
            <div class="card-rating">
                <span>${coursesList[i].rating}</span>
            </div>
            <div class="card-price">
                <span>$5</span>
            </div>
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