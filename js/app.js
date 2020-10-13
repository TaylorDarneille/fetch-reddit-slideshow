


// use innerHTML with ${""}


// const fetchPush = () => {

//     fetch(requestUrl+input.value)
//     .then((responseData)=>{
//         return responseData.json()
//     })
//     .then((jsonData)=>{
//         console.log("jsonData.results:", jsonData.results)
//     })
//     .catch((err)=>{
//         console.log("on no!", err)
//     })
// }

// document.addEventListener('DOMContentLoaded', ()=>{
//     form.addEventListener('button', (e)=>{
//         e.preventDefault()
//         console.log("fetch me my boy", input.value)
//         fetchPush()
//     })
// })


// change results number, just change the url!

// document.addEventListener("DOMContentLoaded", ()=>{

//     form.addEventListener('submit', (e)=>{
//         e.preventDefault()
//         fetchPics(requestUrl+input.value)
//         console.log("fetch me my boy", input.value)
//         // fetchPics()
//     })

//     const fetchPics = (endpoint) => { 
//         fetch(endpoint)
//         .then((responseData)=>{
//             return responseData.json();        
//         })
//         .then((jsonData)=>{
//             console.log(jsonData);
//             let pics = jsonData.results;
//             while(results.firstChild) {
//                 results.removeChild(results.firstChild)
//             }
//             pics.forEach(addPics);
//         })
//         .catch((error)=>{
//             console.log("error!!!:", error);        
//         });
//     }
    
//     const addPics = (pic)=>{
//         let results = document.getElementById("results");
//         console.log(results)
//         let img = document.createElement("img");
//         let link = `${data.children.data.preview.images.source.url}`;
//         console.log(link);
//         img.setAttribute("src", link);
//         results.appendChild(img);
//     }
// });


document.addEventListener("DOMContentLoaded", ()=>{

    const requestUrl = "https://www.reddit.com/search.json?q=pusheen"

    const addPics = (pic)=>{
        let link = `${data.children.data.preview.images.source.url}`;
        console.log(link);
        let img = document.createElement("img");
        img.setAttribute("src", link)
        let results = document.getElementById("results");
        results.appendChild(img)
    }

    fetch(requestUrl)
    .then((responseData)=>{
        // Fetch will package the response into an object with some methods that allow us to do some useful things with the response.
        // Use the .json method to return the data in JSON format
        return responseData.json();
    })
    .then((jsonData)=>{
        // the above .then passed our returned data into this callback
        console.log(jsonData);
        // now we can see that the data we want is nested under an inner 'results'
        console.log(jsonData.results)
        // store this array of objects in a 'people' variable
        let people = jsonData.results;
        people.forEach(addPerson);
    })
    .catch((error)=>{
        // If any error is sent bac, you will have access to it here.
        console.log("error!!!:", error);
    });
});