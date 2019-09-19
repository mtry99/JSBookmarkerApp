// listen for form submit


document.getElementById('myForm').addEventListener('submit', saveBookmark);


// Save Bookmarks
function saveBookmark(e){
    // Get form values
    var siteName = document.getElementById('siteName').value; // gets the value of whats typed into the input bar with id of siteName
    var siteUrl= document.getElementById('siteUrl').value; 
    
    if(!validateForm(siteName, siteUrl)) {
        return false;
    }
    

    // Creating an Array to store the bookmarks in local storage
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    //Tests if bookmarks is null
    if(localStorage.getItem('bookmarks') === null) {
        //Initialise an array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);  
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify (bookmarks));      // JSON.stringify: converts the each element into a string and stores as adjacent array [{"name":"Google","url":"www.google.ca"}]    
    } else { //if there is something in localStorage
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));     //JSON.parse: converts back to orignal form
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }



    //console.log(bookmark) when you submit will give object name: inputted sitename, url: inputted url 


    /*
    // Local Storage Test (only saves as string in elements)
    localStorage.setItem('test', 'Hello World');  test = key (unique) and Hello World = value (not unique)
    console.log(localStorage.getItem('test');
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test));
    */

    //Clear form
    document.getElementById('myForm').reset();

    //Re-fetch bookmarks
    fetchBookmarks();


    //Prevent forn from submitting
    e.preventDefault();   //prevents the writting from quickly flashing as the page submits and actually print in thr console area
}


//Delete bookmark 
function deleteBookmark(url) {
    // Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop throuh bookmarks
    for (var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url) {
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

//Re-fetch bookmarks
fetchBookmarks();
}

// Fetch Bookmarks

function fetchBookmarks() {
    // Get Bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); 

    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');


    //Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name= bookmarks[i].name;
        var url= bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +    // displays all the items in array inside the well
                                    '<h3>' + name +
                                    ' <a class= "btn btn-default" target="_blank" href="' + url + '"> Visit </a>' +
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class= "btn btn-danger" href="#"> Delete </a>' +
                                    '</h3>' + '</div>';
    }
}

    //Validate form
    function validateForm(siteName, siteUrl){
        //Prevent from submitting blank
        if(siteName == ""|| siteUrl == "") {
            alert('Please alert the form');
            return false;
        }

        //Pre-defined expression for URL
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;  //Regular expression to format an url
        var regex = new RegExp(expression);

        if(!siteUrl.match(regex)) {
            alert('Please enter a valid URL');
            return false;
        }
        return true; //if it passes
    }

    
