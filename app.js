let coursesList = []; const btnInfo = "Enroll now!";

document.querySelector("#form").addEventListener("submit", function(event) {
    event.preventDefault();
})

const defaultCoursesList = [
    { author: "Martin Nieva",               title: "Master JavaScript, HTML and CSS!",                   imgUrl: "./img/nieva.jpeg",    rating: 5 },
    { author: "Ignacio Dodero",             title: "Learn to play the guitar with Dodero's masterclass", imgUrl: "./img/dodero.jpeg",   rating: 4 },
    { author: "Mr. God",                    title: "Using magic to help people from scratch",            imgUrl: "./img/god.jpeg",      rating: 5 },
    { author: "Unknown Redhead Girl",       title: "How to be beautiful",                                imgUrl: "./img/redhead.jpeg",  rating: 5 },
    { author: "Daniel Kahneman",            title: "Psychology Basics",                                  imgUrl: "./img/kahneman.jpeg", rating: 4 },
    { author: "Terry A. Davis and Mr. God", title: "Make an OS from scratch",                            imgUrl: "./img/terry.png",     rating: 5 }
];

if (!getCourses())
{
    coursesList = [...defaultCoursesList];

    setCourses(coursesList);
}

else
{
    coursesList = getCourses();
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
            <div class="card-title">
                <span>${coursesList[i].title}</span>
            </div>
            <div class="card-author">
                <span>By <strong>${coursesList[i].author}</strong></span>
            </div>
            <div class="card-rating-price">
                <span>Rating: ${coursesList[i].rating} stars</span>
                <span><strong>$5</strong></span>
            </div>
            <div class="card-btn">
                <button class="course-btn">${btnInfo}</button>
            </div>
        </div>
    `;

    document.querySelector("#cardContainer").append(card);

    document.querySelector("#cardImg-" + i).style.background = "#cfcfcf url(" + coursesList[i].imgUrl + ") center center no-repeat";
    document.querySelector("#cardImg-" + i).style.backgroundSize = "cover";
}

addButtonListeners("course-btn", "click", function(event) {
    let title, author, rating, price, image;
    const currentElement = event.target.parentElement.parentElement;
    const imageElementHTML = currentElement.parentElement.getElementsByClassName("of")[0].innerHTML;

    title = currentElement.getElementsByClassName("card-title")[0].firstElementChild.textContent;
    author = currentElement.getElementsByClassName("card-author")[0].firstElementChild.textContent;

    ratingAndPrice = currentElement.getElementsByClassName("card-rating-price")[0];
    rating = ratingAndPrice.firstElementChild.textContent.match(/\d+/)[0];
    price = ratingAndPrice.lastElementChild.textContent.match(/\d+/)[0];

    image = imageElementHTML.match(/(\.\/)?img\/\w+\.(jp[e]?g|png)/)[0];

    addToCart(image, title, author, rating, price);
});

function addToCart(image, title, author, rating, price)
{
}

function addCourse(obj)
{
    coursesList.push(obj);
    setCourses(coursesList);

    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="of">
            <div id="cardImg-${coursesList.length - 1}" class="card-img">
            </div>
        </div>
        <div class="card-content">
            <div class="card-title">
                <span>${obj.title}</span>
            </div>
            <div class="card-author">
                <span>By <strong>${obj.author}</strong></span>
            </div>
            <div class="card-rating-price">
                <span>Rating: ${obj.rating} stars</span>
                <span><strong>$5</strong></span>
            </div>
            <div class="card-btn">
                <button class="course-btn">${btnInfo}</button>
            </div>
        </div>
    `;

    document.querySelector("#cardContainer").append(card);

    document.querySelector("#cardImg-" + (coursesList.length - 1)).style.background = "#cfcfcf url(" + obj.imgUrl + ") center center no-repeat";
    document.querySelector("#cardImg-" + (coursesList.length - 1)).style.backgroundSize = "cover";
}

function getCourses()
{
    return JSON.parse(localStorage.getItem("courses"));
}

function setCourses(arr)
{
    localStorage.setItem("courses", JSON.stringify(arr));
}

function compare(oldArr, newArr)
{
    return JSON.stringify(oldArr) == JSON.stringify(newArr) ? true : false;
}

function addButtonListeners(_class, wEvent, func)
{
    const allBtn = document.querySelectorAll("." + _class);

    for (let i = 0; i < allBtn.length; i++)
    {
        allBtn[i].addEventListener(wEvent, func);
    }
}
