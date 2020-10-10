/*
Page should load with
Some sort of title
A short description telling the user what to do
A blank text field
A Button ("start" or "go" or "search")
When the user enters a search term and presses enter
The form / title / description should hide
Show a loading message (optional)
Fetch related posts from reddit (with fetch)
Display animation / slideshow of images (with DOM manipulation)
Show a button to stop / reset the animation
Repeat animation until use clicks "stop"
When the user clicks the "stop" button
Animation stops / images are removed
Form / title / description are shown again
User can enter a new search term
Suggested proccess
It is important to break down any development project in to smaller pieces and tackle them one at a time. Here is a list of how you might want to attack this project.

Create your form (HTML/CSS)
Prevent default form submission and verify that you can type something into the form
Use AJAX to make a request. Show data in console
Create an array of image URLs (tip: use filter and map).
Make the form / title / description hide
Cycle through images
tip: use setInterval
Either add images, or change the src of a single image tag
Add some interesting style / animation
Create button to stop animation (tip: use clearInterval).
*/

const requestUrl = 'https://www.reddit.com/search.json?q='
let picturesArray = []
let picturesArrayRef = -1
let intervalId


const fetchResult = (searchTerm) => {
    console.log('finding:',requestUrl+searchTerm)
    hideLandingPage()
    fetch(requestUrl+searchTerm)
    .then((responseData) => {
        return responseData.json()
        })
    .then((jsonData) => {
        console.log('jsonData:', jsonData)
        //console.log('jsonData:', jsonData.data)
        //console.log('jsonDataWithImage:', jsonData.data.children[0].data.thumbnail)
        let result = jsonData.data.children
        console.log(result)
        //console.log(result.data.thumbnail) returns undefined
        /*
        while(peopleList.firstChild){
            result.removeChild(peopleList.firstChild)
        }
        result.forEach(addPerson)
        */
       result.forEach(addImageToArray)
       startSlideshow()
       console.log(picturesArray)
        //result.forEach(addImageToPage)
        //createStopButton()
    })
    .catch((error) => {
            console.log('there is an error:', error)
    })   
}

const addImageToPage = (image) => {
    let pic = document.createElement('img')
    //set pic attribute to pull in thumbnail
    pic.setAttribute('src', image.data.thumbnail)
    main.appendChild(pic)
}

const addImageToArray = (object) => {
    if(object.data.thumbnail.includes('https')) {
        picturesArray.push(object.data.thumbnail)  
    }
}

const startSlideshow = () => {
    intervalId = setInterval(slideshow, 2000)
}
/*
const stopSlideshow = () => {
    clearInterval(intervalId)
}
*/
const hideLandingPage = () => {
    /*
    title.style.display = 'none'
    directions.style.display = 'none'
    form.style.display = 'none'
    */
   input.value = ''
    title.style.visibility = 'hidden'
    directions.style.visibility = 'hidden'
    form.style.visibility = 'hidden'
}

const slideshow = (i) => {
    while(main.firstChild) {
        main.removeChild(main.firstChild)
    }
    //picturesArray.forEach(addImageToPage)
    console.log('slideshow function called')
    cycleImage()
    createStopButton()
}

const cycleImage = () => {
    let pic = document.createElement('img')
    grabPicturesArrayElement()
    pic.setAttribute('src', picturesArray[picturesArrayRef])
    pic.setAttribute('id', 'img')
    main.appendChild(pic)
}

const grabPicturesArrayElement = () => {
    if(picturesArrayRef > picturesArray.length - 2) {
        picturesArrayRef = 0
    } else {
        picturesArrayRef += 1
    }
    console.log('Index of pic array to be called: ', picturesArrayRef)
}

const createStopButton = () => {
    const stop = document.createElement('button')
    stop.setAttribute('id', 'stop')
    stop.innerHTML = 'Select a New Animal'
    main.appendChild(stop)
    addStopButtonListener()
    
}

const unhideLandingPage = (event) => {
    /*
    const title = document.createElement('h1')
    title.setAttribute('id', 'title')
    title.innerHTML = 'Animal Carousel'
    const directions = document.createElement('p')
    directions.setAttribute('id', 'directions')
    directions.innerHTML = 'Search for an animal to star in a slideshow!'
    const form = document.createElement('form')
    form.setAttribute('id', 'form')

    landingPage.appendChild(title)
    landingPage.appendChild(directions)
    landingPage.appendChild(form)
    */
    const stop = document.querySelector('#stop')
    picturesArray = []
    //clear interval
    clearInterval(intervalId)
   //remove images
    while(main.firstChild) {
        main.removeChild(main.firstChild)
    }
    //hide Select New Animal button
    stop.style.visibility = 'hidden'
   //re-show landingpage
   title.style.visibility = 'visible'
    directions.style.visibility = 'visible'
    form.style.visibility = 'visible'

}

const addStopButtonListener = () => {
    const stop = document.querySelector('#stop')
    stop.addEventListener('click', unhideLandingPage)
}

document.addEventListener('DOMContentLoaded', ()=> {
    form.addEventListener('submit', (event) => {
        //prevent page from refreshing upon form submission
        event.preventDefault()
        console.log('user input is:', input.value)
        fetchResult(input.value)
    })
        
})