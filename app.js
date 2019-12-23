document.querySelector("#form").addEventListener("submit", function(event) {
    event.preventDefault();
})

let coursesList, cartList; 

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

if (!getCart())
{
    cartList = [];
    setCart(cartList);
}

else
{
    cartList = getCart();
}

function main()
{
    actualizeDom();

    addButtonListeners("course-btn", "click", function(event) {
        let title, author, rating, price, image;
        const currentElement = event.target.parentElement.parentElement;
        const imageElementHTML = currentElement.parentElement.getElementsByClassName("of")[0].innerHTML;

        title = currentElement.getElementsByClassName("card-title")[0].firstElementChild.textContent;
        author = currentElement.getElementsByClassName("card-author")[0].firstElementChild.textContent;

        ratingAndPrice = currentElement.getElementsByClassName("card-rating-price")[0];
        rating = ratingAndPrice.firstElementChild.textContent.match(/\d+/)[0];
        // price = ratingAndPrice.lastElementChild.textContent.match(/\d+/)[0];

        image = imageElementHTML.match(/(\.\/)?img\/\w+\.(jp[e]?g|png)/)[0];

        addToCart(image, title, author, rating)
    });
}

function actualizeDom()
{
    for (let i = 0; i < coursesList.length; i++)
    {
        const card = document.createElement("div");
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
                    <button class="course-btn">Enroll now!</button>
                </div>
            </div>
        `;

        document.querySelector("#cardContainer").append(card);

        document.querySelector("#cardImg-" + i).style.background = "#cfcfcf url(" + coursesList[i].imgUrl + ") center center no-repeat";
        document.querySelector("#cardImg-" + i).style.backgroundSize = "cover";
    }

    for (let i = 0; i < cartList.length; i++)
    {
        const item = document.createElement("tr");
        item.innerHTML = `
            <td>
                <div class="cart-item-img">
                    <img src="${cartList[i].imgUrl}" alt="Cart image of ${cartList[i].author}">
                </div>
            </td>
            <td>
                <p class="cart-item-info">${cartList[i].title}</p>
            </td>
            <td>
                <p class="cart-item-rating">$${cartList[i].rating}</p>
            </td>
        `;

        document.querySelector("#cartTable").append(item);
    }
}

function addToCart(_image, _title, _author, _rating)
{
    // { author: "Martin Nieva",               title: "Master JavaScript, HTML and CSS!",                   imgUrl: "./img/nieva.jpeg",    rating: 5 },
    courseAddedToCart = {
        author: _author,
        title: _title,
        imgUrl: _image,
        rating: _rating
    };

    if (objectInArray(courseAddedToCart, cartList))
    {
        return;
    }

    cartList.push(courseAddedToCart);
    setCart(cartList);

    const cartTable = document.querySelector("#cartTable");
    const item = document.createElement("tr");
    item.innerHTML = `
        <td>
            <div class="cart-item-img">
                <img src="${_image}" alt="Cart image of ${_author}">
            </div>
        </td>
        <td>
            <p class="cart-item-info">${_title}</p>
        </td>
        <td>
            <p class="cart-item-rating">$${_rating}</p>
        </td>
    `;

    cartTable.append(item);
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

function getCart()
{
    return JSON.parse(localStorage.getItem("cart"));
}

function setCart(arr)
{
    localStorage.setItem("cart", JSON.stringify(arr));
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

function objectInArray(object, array)
{
    for (let i = 0; i < array.length; i++)
    {
        if (compare(array[i], object))
        {
            return true;
        }
    }

    return false;
}

main();
