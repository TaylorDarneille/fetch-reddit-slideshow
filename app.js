// API we are searching from
const requestUrl = 'https://www.reddit.com/search.json?q='
const noWork = '+nsfw:no'



let data

// I am making the fetch a function so I can call it in my event listener
// when I hit the submit button
const fetchRequest = () => {

    console.log(requestUrl+text.value+noWork)
    fetch(requestUrl+text.value+noWork)

    .then((response)=>{
        console.log(response)
        return response.json()
    })
    // We are going into the jsonData, and going to the data object, and then getting the children of
    // that data object.  
    .then((jsonData)=>{
        console.log('jsonData:', jsonData.data.children)
        // naming it data
        data = jsonData.data.children
    getImage()
    
    })

    .catch((e)=>{
        console.log('There was an error:', e)
    })

}

const getImage = ()=>{ 
    // Because data is already an array, I can use map to iterate
    // over each dataObject and making an array of pictures. I am 
    // grab the thumbnail child from the dataobject, which contains the picture. 
    let picArray = data.map(dataObject => {
        return dataObject.data.thumbnail
    })
    // Made a for loop to go through the picArray and create an img for 
    // each thumbnail
    for(let i =0; i<picArray.length; i++){
    let photo = document.createElement("img")
    photo.src = picArray[i]
    // I made an images div in my html
    let images =document.getElementById("images")
    // Appending each photo in the array to my images div
    images.appendChild(photo)
    photo.style.display = "none"
    console.log(images)
    } 
    // invoking the timer function to create my slideshow
    timer()   
}


const timer = () => {
    let i =0;
    // I am getting all of the div I created named images children, which is each photo
    let allImages = document.getElementById("images").children
setInterval(function() {
    // So the pictures don't display right away
    allImages[i].style.display = "none";
    // Saying that if i+1 is less the allImages length, keep displaying
    // photos with i++
        if(i+1 <allImages.length) {
            i++;
       }else{
            i =0;
       }
    allImages[i].style.display = "inline-block";
},
// Set the interval for every 3 seconds 
3000);

}
    


//Trying to figure out how to make the stop button actually stop
// the slideshow. I can get it to clear the text, but I can't get the pictures
// to acutally stop. 
const stopSlideShow = () => {
   const userInput = document.querySelector("#text").value;
   clearInterval(text.value='')
}    

// When the submit button is pressed, the fetchRequest 
// function is invoked, and that also has the getImage() inside
// to display pic slideshow.
document.addEventListener("DOMContentLoaded", ()=>{
    form.addEventListener("submit", (event)=> { 
        event.preventDefault()
        fetchRequest()    
        
    })
    const stopButton = document.querySelector("#stop")
    stopButton.addEventListener("stop", (event)=> { 
        event.preventDefault()
        stopSlideShow();

    })
}
)