console.log('confusion');

let requestURL= 'http://www.reddit.com/search.json?q=cats+nsfw:no';
const fetchImg= (searchTerm)=> {
    fetch(requestURL /*+searchTerm*/)
    .then((responseData)=> {
        return responseData.json(); //will returned the responseData in json format
    })
    .then((jsonData)=> { //can then do a then on the returned responseData in json format, pass in as parameter jsonData
        console.log('heres the jsonData:', jsonData);
        console.log('follow the trail:', jsonData.data.children[0].data.preview.images[0].source.url);
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