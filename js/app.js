console.log("hewwo")

// use innerHTML with ${""}

const requestUrl = "https://www.reddit.com/search.json?results="
const fetchPush = () => {
    
    fetch(requestUrl+input.value)
    .then((responseData)=>{
        return responseData.json()
    })
    .then((jsonData)=>{
        console.log("jsonData.results:", jsonData.results)
    })
    .catch((err)=>{
        console.log("on no!", err)
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    form.addEventListener('button', (event)=>{
        event.preventDefault()
        console.log("fetch me my boy", input.value)
        fetchPush()
    })
})