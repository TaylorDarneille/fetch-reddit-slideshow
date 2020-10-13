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
        //console.log(thumbNails)
        //imageDisplay(thumbNails)
        //slideshow function
        const imageDisplay = (thumbNails) => {
        //make start of container empty
            container.innerHTML = ""
            thumbNails.forEach((image, index) => {
                let pic = document.createElement('img')
                //set pic attribute to pull in thumbnail
                pic.setAttribute('src', image)
                container.appendChild(pic)
            })
            let current = 0
            let next = 1
            interval = setInterval(() => {
                current = next
                next = (next + 1)
            }, 1000)
        }
        imageDisplay()
    })
    .catch((error) => {
            console.log('there is an error:', error)
    })   
}
const container = document.querySelector('.container')
let interval


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

//function for reset/stop
document.getElementById('reset').addEventListener('click', ()=>{
    clearInterval(interval)
})