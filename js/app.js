console.log('hello')
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

const fetchResult = (searchTerm) => {
    console.log('finding:',requestUrl+searchTerm)
    fetch(requestUrl+searchTerm)
    .then((responseData) => {
        return responseData.json()
        })
    .then((jsonData) => {
        console.log('jsonData:', jsonData)
        //console.log('jsonData:', jsonData.data)
        console.log('jsonDataWithImage:', jsonData.data.children[0].data.thumbnail)
        let result = jsonData.data.children
        console.log(result)
        //console.log(result.data.thumbnail) returns undefined
        /*
        while(peopleList.firstChild){
            result.removeChild(peopleList.firstChild)
        }
        result.forEach(addPerson)
        */
       result.forEach(addImage)
    })
    .catch((error) => {
            console.log('there is an error:', error)
    })

    
}

const addImage = (image) => {
    //create new li
    //let li = document.createElement('li')
    //add first and last name of person to li with string interpolation
    //li.textContent = `${person.name.first} ${person.name.last}`
    //append li to ul by using ul we created in HTML with id of peopleList
    let pic = document.createElement('img')
    //set pic attribute to pull in thumbnail
    pic.setAttribute('src', image.data.thumbnail)
    body.appendChild(pic)
    //peopleList.appendChild(li)
}

document.addEventListener('DOMContentLoaded', ()=> {
    form.addEventListener('submit', (event) => {
        //prevent page from refreshing upon form submission
        event.preventDefault()
        console.log('user input is:', input.value)
        fetchResult(input.value)
    })
        
})