console.log('confusion');

let requestURL= 'http://www.reddit.com/search.json?q=';
let makeItAppropriate= '+nsfw:no';

const fetchImg= (searchTerm)=> {
    fetch(requestURL+ inputBox.value+ makeItAppropriate)
    .then((responseData)=> {
        return responseData.json(); //will returned the responseData in json format
    })
    .then((jsonData)=> { //can then do a then on the returned responseData in json format, pass in as parameter jsonData
        console.log('heres the jsonData:', jsonData);
        console.log('inputbox value', inputBox.value);
        console.log('follow the trail:', jsonData.data.children[0].data.thumbnail);
    })
    .catch((error)=> {
        console.log('Here is your error sir/maam:', error);
    })
}

document.addEventListener('DOMContentLoaded', ()=> {
    form.addEventListener('submit', (event)=> {
        event.preventDefault();
        container.style.display= 'none';
        console.log('submitted');
        fetchImg();
    })
})

//children is an array, may have to iterate through that to access several images for cats
//maybe make that into its own function that can be called, definitely going to need to set variables for things 