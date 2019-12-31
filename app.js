// Use isEqual() later
// Then add delete button to specific course in cart

const TABLE = 0
const CARD = 1
const TABLE_ROW = 2
const NO_ITEMS = 3

const noItems = document.createElement("div");
noItems.innerHTML = getLayout(NO_ITEMS);

const firstTableRow = document.createElement("tr");
firstTableRow.innerHTML = getLayout(TABLE_ROW);

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

main();

function main()
{
    actualizeDom();

    addButtonListeners("course-btn", "click", event => {
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

    if (cartList.length == 0)
    {
        document.querySelector("#cartTable").append(noItems);
    }

    else
    {
        document.querySelector("#cartTable").append(firstTableRow);

        document.querySelector("#deleteButton").addEventListener("click", event => {
            cartList = [];
            setCart(cartList);

            cartTable.innerHTML = "";
            cartTable.append(noItems);
        });
    }

    for (let i = 0; i < coursesList.length; i++)
    {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = getLayout(CARD, coursesList[i].imgUrl, coursesList[i].author, coursesList[i].title, coursesList[i].rating, i);

        document.querySelector("#cardContainer").append(card);

        document.querySelector("#cardImg-" + i).style.background = "#cfcfcf url(" + coursesList[i].imgUrl + ") center center no-repeat";
        document.querySelector("#cardImg-" + i).style.backgroundSize = "cover";
    }

    for (let i = 0; i < cartList.length; i++)
    {
        const item = document.createElement("tr");
        item.innerHTML = getLayout(TABLE, cartList[i].imgUrl, cartList[i].author, cartList[i].title, cartList[i].rating);

        // let itemIcon = item.children[1].firstElementChild;

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

    if (cartList.length == 0)
    {
        const cartTable = document.querySelector("#cartTable");
        cartTable.innerHTML = "";

        cartTable.append(firstTableRow);

        document.querySelector("#deleteButton").addEventListener("click", event => {
            cartList = [];
            setCart(cartList);

            cartTable.innerHTML = "";
            cartTable.append(noItems);
        });
    }

    cartList.push(courseAddedToCart);
    setCart(cartList);

    const cartTable = document.querySelector("#cartTable");

    const item = document.createElement("tr");
    item.innerHTML = getLayout(TABLE, _image, _author, _title, _rating);

    // let itemIcon = item.children[1].firstElementChild;

    cartTable.append(item);
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

function getLayout(layout, img = "", author = "", title = "", rating = "", i = 0)
{
    if (layout == TABLE)
    {
        return `
            <td>
                <p></p>
            </td>
            <td>
                <div class="cart-item-img">
                    <img src="${img}" alt="Cart image of ${author}">
                </div>
            </td>
            <td>
                <p class="item-title">${title}</p>
            </td>
            <td>
                <p class="item-rating">${rating}&bigstar;</p>
            </td>
        `;
    }

    else if (layout == CARD)
    {
        return `
            <div class="of">
                <div id="cardImg-${i}" class="card-img">
                </div>
            </div>
            <div class="card-content">
                <div class="card-title">
                    <span>${title}</span>
                </div>
                <div class="card-author">
                    <span>By <strong>${author}</strong></span>
                </div>
                <div class="card-rating-price">
                    <span>Rating: ${rating} stars</span>
                    <span><strong>$5</strong></span>
                </div>
                <div class="card-btn">
                    <button class="course-btn">"Enroll now!"</button>
                </div>
            </div>
        `;
    }

    else if (layout == TABLE_ROW)
    {
        return `
            <td>
                <button id="deleteButton" class="delete-icon" type="button">
                    <img src="./img/svg/delete.svg" alt="">
                </button>
            </td>
            <td>
                <span><strong>Icon</strong></span>
            </td>
            <td>
                <span><strong>Title</strong></span>
            </td>
            <td>
                <span><strong>Rating</strong></span>
            </td>
        `;
    }

    else if (layout == NO_ITEMS)
    {
        return `
            <p>No items in cart</p>
        `;
    }

    return;
}
