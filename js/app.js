console.log('confusion');

let requestURL= 'http://www.reddit.com/search.json?q=';
let makeItAppropriate= '+nsfw:no';
let imgArr=[];

const getImgURL= (data)=> {
    data.data.children.filter(imgUrl=> {
        imgArr.push(imgUrl.data.thumbnail);
    })
    console.log('heres the imgArr',imgArr);
}

const fetchImg= (searchTerm)=> {
    fetch(requestURL+ inputBox.value+ makeItAppropriate)
    .then((responseData)=> {
        return responseData.json(); //will returned the responseData in json format
    })
    .then((jsonData)=> { //can then do a then on the returned responseData in json format, pass in as parameter jsonData
        // let imgArr[];
        // jsonData.data.children.filter(childElm=> {
        //     imgArr.push(childElm.data.thumbnail);
        // })
        console.log('heres the jsonData:', jsonData);
        console.log('inputbox value', inputBox.value);
        getImgURL(jsonData);
        //console.log('follow the trail:', jsonData.data.children[0].data.thumbnail);
        
    })
    .catch((error)=> {
        console.log('Here is your error sir/maam:', error);
    })
}

document.addEventListener('DOMContentLoaded', ()=> {
    form.addEventListener('submit', (event)=> {
        event.preventDefault();
        container.style.display= 'none'; //this line of code will make title/directions/input elements ~disappear 
        console.log('submitted');
        fetchImg(); //calling the function that contains our fetch request 
    })
})

//children is an array, may have to iterate through that to access several images for cats
//maybe make that into its own function that can be called, definitely going to need to set variables for things 

// To do: 
//Create an array of image URLs (tip: use filter and map).
// Display animation / slideshow of images (with DOM manipulation)
//use setInterval and clearInterval
// Show a button to stop / reset the animation
// Repeat animation until use clicks "stop"

// When the user clicks the "stop" button
// Animation stops / images are removed
// Form / title / description are shown again
// User can enter a new search term