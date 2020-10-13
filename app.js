const container = document.querySelector('.container')
const directions = document.getElementById('directions')
let counter = 0
let isRunning = true
let interval

const requestUrl = 'https://www.reddit.com/search.json?q='

const fetchResult = (searchTerm) => {
    console.log('finding:',requestUrl+searchTerm)
    fetch(requestUrl+searchTerm)
    .then((responseData) => {
        return responseData.json()
        })
    .then((jsonData) => {
        //console.log('jsonData:', jsonData)
        //console.log('jsonData:', jsonData.data)
        //console.log('jsonDataWithImage:', jsonData.data.children[0].data.thumbnail)
        //create array of img URLs using map
        let resultArray = jsonData.data.children
        const thumbNails = resultArray.map((child)=>{
            return child.data.thumbnail
        })
        for (let i = 0; i < thumbNails.length; i++) {
            if (!thumbNails[i].includes('jpg')) {
                thumbNails.splice(i, 1)
            }
        }
        console.log(thumbNails)
        //imageDisplay(thumbNails)
        //create images to display
        const imageDisplay = (arr) => {
            let newImage = arr
            let pic = document.createElement('img')
            //set pic attribute to pull in thumbnail
            pic.setAttribute('src', newImage)
            container.appendChild(pic)
        }
        const clearPrevPhoto = () => {
            while (container.firstChild) {
                container.removeChild(container.firstChild)
            }
        }
        const startSlideshow = () => {
            input.disabled = true
            if (isRunning) {
                directions.innerText = ''
                counter++
                if (counter >= thumbNails.length) {
                    counter = 0
                }
                clearPrevPhoto()
                imageDisplay(thumbNails[counter])
                }
            }
            //function for reset/stop button
        document.getElementById('reset').addEventListener('click', ()=>{
            input.disabled = false
            clearInterval(interval)
            clearPrevPhoto()
            input.value = ''
            directions.innerText = "Enter search query below!"
        })
        interval = setInterval(startSlideshow, 4000)
    })
    .catch((error) => {
            console.log('there is an error:', error)
    })   
}

// const addImage = (image) => {
//     let pic = document.createElement('img')
//     //set pic attribute to pull in thumbnail
//     pic.setAttribute('src', image.data.thumbnail)
//     container.appendChild(pic)
// }

//function for form
document.addEventListener('DOMContentLoaded', ()=> {
    form.addEventListener('submit', (event) => {
        //prevent page from refreshing upon form submission
        event.preventDefault()
        console.log('user input is:', input.value)
        fetchResult(input.value)
    })
})
