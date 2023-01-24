/**
 * Team 2
 * CSC 648
 * Description: provides frontend functionality searching/ creating posts
 */

// The arrow back in the about-index page
// document.getElementById("backToAbout").onclick = function () {
//     location.href = "/About";
// };

//Creates a new HTML to insert too the main container
function createCard(postData) {

    // 1	eBook
    // 2	Video
    // 3	Image
    // 4	Audio
    switch (postData.category) {
        case 1:
            postData.category = "eBook"
            break;
        case 2:
            postData.category = "Video"
            break;
        case 3:
            postData.category = "Image"
            break;
        case 4:
            postData.category = "Audio"
            break;
        default:
    }
    if (postData.asking_price == '$0') {
        return `
        <body>
            <div id= "post-${postData.post_id}" class="card-search" onClick="executePostId(${postData.post_id})">
                <div id="square" class="thumbnail-cart">
                    <div class="thumbnail-cart-img" ><img src="${postData.image}" class="mask" id ="thumbnail"></div>
                    <div class="card-name">${postData.name}</div>
                    <p id="card-category">Category: ${postData.category}</p>
                    <p id="card-price">Price: ${postData.asking_price}</p>
		            <p id="postId">${postData.post_id}</p>
                    <div><a type="submit" class="post"></a></div>
                </div>
            </div>
        </body>
        `;
    }
    else {
        return `
        <body>
            <div id= "post-${postData.post_id}" class="card-search" onClick="executePostId(${postData.post_id})">
                <div id="square" class="thumbnail-cart">
                    <div class="thumbnail-cart-img" ><img src="${postData.image}" class="mask" id ="thumbnail"></div>
                    <div class="card-name">${postData.name}</div>
                    <p id="card-category">Category: ${postData.category}</p>
                    <p id="card-price">Price: ${postData.asking_price}</p>
		            <p id="postId">${postData.post_id}</p>
                    <div><a type="submit" class="post"></a></div>
                </div>
            </div>
        </body>
        `;
    }
}
function createRow(postData) {
    return `
    <tr>
                <td class="products">
                    <img src="${postData.image_thumbnail}" alt="">
                    <div class="prod-title">
                        <h5 id="product-name">${postData.name}</h5>
                        <p id="prod-des">description</p>
                    </div>
                </td>
                <td class="prod-date">
                    <h5 id="post-date">10-25-22</h5>
                </td>
                <td class="prod-price">
                    <h5 id="prod-price">$${postData.asking_price}</h5>
                </td>
                <td class="prod-status">
                    <h5 id="prod-status">SOLD</h5>
                </td>
            </tr>
    `;
}

//searches needed information in databse
function executeSearch() {
    var searchTerm = document.getElementById('search').value;
    var category = document.getElementById('category');
    var categoryText = category.options[category.selectedIndex].text;

    let mainContent = document.getElementById('main-content');
    var searchURL = `/search?search=${searchTerm}&category=${categoryText}`;

    fetch(searchURL)
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            var newMainContentHTML = '';
            data_json.results.forEach(row => {
                newMainContentHTML += createCard(row);
            });
            mainContent.innerHTML = newMainContentHTML;
        })
        .catch((err) => console.log(err));

}

function executeSearchNavbar() {
    var searchTerm = document.getElementById('search-navbar').value;
    var category = document.getElementById('category-navbar');
    var categoryText = category.options[category.selectedIndex].text;
    if (window.location.pathname !== `/result-page?search=${searchTerm}&category=${categoryText}`) {
        window.location.href = `/result-page?search=${searchTerm}&category=${categoryText}`
    }

}

function executeSearchNavbar_onPage() {
    const urlParams = new URLSearchParams(window.location.search);
    var searchTerm = urlParams.get('search')
    var categoryText = urlParams.get('category')
    var searchURL = `/search?search=${searchTerm}&category=${categoryText}`;
    var searchinput = document.getElementById('search-navbar')
    searchinput.value = searchTerm
    var category = document.getElementById('category-navbar')
    for (var i = 0; i < category.length; i++) {
        if (category[i].childNodes[0].nodeValue === categoryText) {
            category.options[i].selected = true;
        }
    }

    fetch(searchURL)
        .then((data) => {

            return data.json();
        })
        .then((data_json) => {
            
        
            let mainContent = document.getElementById('main-content');
            numOfResults = data_json.results.length;
            let elem = document.getElementById('title-vp');
            if(data_json.messages == "ZERO RESULTS"){
                elem.innerText = "No Post Found, Showing All Posts"
            } else {
                elem.innerText = `Showing (${numOfResults}) out of (${numOfResults}) Results`;
            }
          
            var newMainContentHTML = '';

            data_json.results.forEach(row => {
                newMainContentHTML += createCard(row);
            });

            mainContent.innerHTML = newMainContentHTML;
        })
        .catch((err) => document.getElementById('main-content').innerHTML = "exceeded character search length");
}


function getRecentPost() {
    let mainContent = document.getElementById('main-content');
    var searchURL = `/search?search=&category=All`;
    fetch(searchURL)
        .then((data) => {

            return data.json();
        })
        .then((data_json) => {
            var newMainContentHTML = '';
            data_json.results.forEach(row => {
                newMainContentHTML += createCard(row);
            });

            mainContent.innerHTML = newMainContentHTML;
        })
        .catch((err) => console.log(err));

}


function getUserPosts() {
    let mainContent = document.getElementById('user-post-body');
    let prodBoard = document.getElementById('prod-board');
    let display_name = document.getElementById('display-name');
    let display_date = document.getElementById('date-created');
    let email = "";
    fetch('/api/users/current')
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            display_name.innerHTML = data_json.email;
            email = data_json.email;

        }
        )
        .then(function () {
            const dateQuery = `/api/users/currentUserDate?email=${email}`;
            fetch(dateQuery)
                .then((data) => {

                    return data.json();
                }).then((data_json) => {

                    display_date.innerHTML = data_json.date_time;
                }
                );
        }
        ).then(function () {

            const postsQuery = `/api/users/getAllPosts?email=${email}`;

            fetch(postsQuery)
                .then((data) => {

                    return data.json();
                })
                .then((data_json) => {
                    var newMainContentHTML = '';
                    data_json.forEach(row => {
                        newMainContentHTML += userProfilePostCard(row);
                    });

                    mainContent.innerHTML = newMainContentHTML;
                })
                .catch((err) => console.log(err));

        }
        ).
        catch((err) => console.log(err));


}


//deleted description <p></p>
function userProfilePostCard(postData) {
    if (postData.approved === 0) {
        return `
        <tr>
        <td class="products">
            <img src="${postData.image_thumbnail}" alt="">
            <div class="prod-title">
                <h5>${postData.name}</h5>
                <p></p>
            </div>
        </td>
        <td class="prod-date">
            <h5>UNDER ADMIN REVIEW, WILL NOT SHOW UP IN SEARCH UNTIL APPROVED BY ADMIN CHECK BACK LATER</h5>
        </td>
        <td class="prod-price">
            <h5>${postData.asking_price}</h5>
        </td>
        <td class="view-button">
        <p hidden id="postId">${postData.post_id}</p>
            <button onclick="messageId(${postData.post_id})">View</button>
        </td>
    </tr>
        `
    } else {

        return `
    <tr>
    <td class="products">
        <img src="${postData.image_thumbnail}" alt="">
        <div class="prod-title">
            <h5>${postData.name}</h5>
            <p></p>
        </div>
    </td>
    <td class="prod-date">
        <h5>${postData.date_time}</h5>
    </td>
    <td class="prod-price">
        <h5>${postData.asking_price}</h5>
    </td>
    <td class="view-button">
    <p hidden id="postId">${postData.post_id}</p>
        <button onclick="messageId(${postData.post_id})">View</button>
    </td>
</tr>
    `
    }
}

function messagingPortal(postData) {
    return `
    <table width="100%">
        <thead>
            <tr>
                <td>Date & Time</td>
                <td>Messages</td>
                <td>Sender</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="messageTime">
                    <div class="dateTime">
                        <h5>${postData.date_time}</h5>
                    </div>
                </td>
                
                <td class="messages">
                    <h5>${postData.message_txt}</h5>
                </td>
                
                <td class="messageSender">
                    <h5>${postData.message_sender_info}</h5>
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>
    `
}

function messageFetch() {
    const urlParams = new URLSearchParams(window.location.search);
    let mainContent = document.getElementById('user-content');
    var post_id = urlParams.get('post_id')

    var searchURL = `/posts/getmessageInbox?post_id=${post_id}`;

    fetch(searchURL)
        .then((data) => {

            return data.json();
        })
        .then((data_json) => {
            var newMainContentHTML = '';

            data_json.forEach(row => {
                newMainContentHTML += messagingPortal(row);
            });

            mainContent.innerHTML = newMainContentHTML;
        })
        .catch((err) => console.log(err));
}

function messageId(post_id) {
    var postId = post_id

    // window.location.href = `/productInfo-user?post_id=${postId}`;
    window.open(`/productInfo-user?post_id=${postId}`, '_blank');
}


function executePostId(post_id) { //this function is called when the user clicks on the post info button
    var postId = post_id

    // window.location.href = `/Product-info?post_id=${postId}`;
    window.open(`/Product-info?post_id=${postId}`, '_blank');
}
function executePostIdUser(post_id) { //this function is called when the user clicks on the post info button
    var postId = post_id

    // window.location.href = `/productInfo-user?post_id=${postId}`;
    window.open(`/productInfo-user?post_id=${postId}`, '_blank');
}

function createPostSuccess() {

}

function displayProductInfo() {
    var productName = document.getElementById('product-name');
    var productImg = document.getElementById('product-img');
    var productCategory = document.getElementById('product-category');
    var productPrice = document.getElementById('product-price');
    var cartBtn = document.getElementById('cart-btn');
    var productDescription = document.getElementById('product-description');


    const urlParams = new URLSearchParams(window.location.search);
    var post_id = urlParams.get('post_id')
    var searchURL = `/posts/getPost?post_id=${post_id}`;


    fetch(searchURL) //fetches the post info
        .then((data) => {
            return data.json();

        })
        .then((data_json) => {

            switch (data_json.category) {
                case 1:
                    data_json.category = "eBook"
                    break;
                case 2:
                    data_json.category = "Video"
                    break;
                case 3:
                    data_json.category = "Image"
                    break;
                case 4:
                    data_json.category = "Audio"
                    break;
                default:
            }


            productImg.src = data_json.image;
            productName.innerHTML = data_json.name;
            productPrice.innerHTML = data_json.asking_price;
            productCategory.innerHTML = data_json.category;
            productDescription.innerHTML = data_json.description;
            if(data_json.asking_price == '$0'){
                cartBtn.innerHTML = `<button class="cart-btn-inner" type="button" id="cart-btn-download" onclick="downloadPost('${productImg.src}')">DOWNLOAD</button>`;
            }
            else {
                cartBtn.innerHTML = `<button class="cart-btn-inner" type="button" id="cart-btn-message" onclick="(function(){window.location.href = '/MessageTheSeller?post_id=${post_id}'})()">Message the Seller</button>`;
            }
        
        })
        .catch((err) => console.log(err));

}


function deletePost() {
    var email = "";
    const urlParams = new URLSearchParams(window.location.search);
    var post_id = urlParams.get('post_id')
   
    fetch('/api/users/current')
        .then((data) => {
            return data.json()
        })
        .then((data_json) => {
            email = data_json.email;
        })
        .then(function () {
            const postsQuery = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    "post_id": post_id,
                    "email": email
                })
            }
            fetch('/posts/deletePost', postsQuery)
                .then((response) => {
                    if (response.status = 201) {
                        window.location.href = '/User-Profile'
                    }
                })
        }
        ).catch((err) => console.log(err));

}

function downloadPost(url) {

    fetch('/User-Profile')
    .then((response) => {
        if (response.status == 401) {
            alert("Must be logged in");
            window.location.href = "/login"
        }
        else {
            const path = url.split('/');
            const file = path[path.length-1]
            window.location.href = `/files/${file}`;
        }
    })
}


function sendMessage(){
    const message = document.getElementById('text-area').value;
    const urlParams = new URLSearchParams(window.location.search);
    var post_id = urlParams.get('post_id')
    post_id = parseInt(post_id)
    if(message.length == 0){
        alert("Type message into text field");
    }
    else{

        fetch('/posts/message',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                "post_id": post_id,
                "message": message
            })
        })
        .then((response) => {
            if(response.status == 200){
                alert("Message Sent");
                window.location.href = `/Product-info?post_id=${post_id}`
            } else {
                alert("failed to send")
            }
        })



    }
}


