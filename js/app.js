const requestUrl = "https://www.reddit.com/search.json?="
const notApr = "+nsfw:no"
fetch(requestUrl)
.then((responseData)=>{
    //return the responseData.json
    return responseData.json();
})
.then((jsonData)=>{
    //returns the json form to do something with it
    console.log("JSON Data:", jsonData);
})
.catch((err)=>{
    console.log('YOOOO you got an error', err)
})

