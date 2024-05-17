let myLinks = [];
let url = document.getElementById("url");
const ulList = document.getElementById("link-list");
const inputBtn = document.getElementById("saveBtn");
const tabBtn = document.getElementById("tabBtn");
const deleteBtn = document.getElementById("deleteBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");

// get the links from local storage
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage;
    render(myLinks);
}

// display the links in the list
function render(links){
    let linksList = "";
    for (var i = 0; i < links.length; i++) {
        linksList += `
            <li id='links'>
                <a target='_blank' href="${links[i]}">
                ${links[i]}    
            </li>
        `
    }
    ulList.innerHTML = linksList;
}

// save the input link to local storage
inputBtn.addEventListener("click", function() {
    if (url.value === "") {
        alert("Please enter a link to save!");
        return;
    } else {
        myLinks.push(url.value);
        url.value = "";
        localStorage.setItem("myLinks", JSON.stringify(myLinks));
        render(myLinks);
    }
});


// save the current tab link to local storage
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLinks.push(tabs[0].url);
        localStorage.setItem("myLinks", JSON.stringify(myLinks));
        render(myLinks);
    });
});

// delete the link from local storage entered by user
deleteBtn.addEventListener("click", function() {
    if (url.value === "") {
        alert("Please enter a link to delete!");
    } else {
        var result = confirm("Are you sure you want to delete this link?");
        if (!result) {
            return;
        }
        var index = myLinks.indexOf(url.value)
        if (index !== -1) {
            myLinks.splice(index, 1);
            localStorage.setItem("myLinks", JSON.stringify(myLinks));
            render(myLinks);
            url.value = "";
            alert("The link has been deleted!");
        } else {
            alert("The link is not in the list!");
        }
    }
});

// delete all the links from local storage
deleteAllBtn.addEventListener("dblclick", function() {
    var result = confirm("Are you sure you want to delete all the links?");
    if (result) {
        localStorage.clear();
        myLinks = [];
        render(myLinks);
    }
});






