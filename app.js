console.log('Hi')
const requestUrl ="https://www.reddit.com/search.json?q="
const notAppr = "+nsfw:no"  //this means filter innapropriate pics
const imageDiv = document.getElementById('images')
let stopButton = document.getElementById('stop')
const fetchRequest = ()=> {
    console.log(requestUrl+input.value+notAppr)
    fetch(requestUrl+input.value+notAppr)
    .then((responseData)=>{
    return responseData.json()
})
    .then((jsonData)=> {
       console.log("jsonData.results:", jsonData.data.children)
       data = jsonData.data.children
       
    let imageArr = [];
    for (let i=0; i<data.length; i++){
     imageArr.push(jsonData.data.children[i].data.thumbnail);
     console.log(imageArr)
    }
    for (let j=0; j<imageArr.length; j++){
        console.log(images)
        let img = document.createElement("img")
        img.setAttribute("src", imageArr[j])
        img.style.display="none" 
        images.appendChild(img)
        console.log(images)
    }

    slideShow()
})
    .catch((err)=>{
        console.log("uh-oh, there is an error:", err)
})
}

const slideShow = ()=>{
    let i = 0;
    let children= document.getElementById("images").children
    let timer = setInterval(function(){
        children[i].style.display = "none";
        if (i+1 < children.length) {
            i++;
        }
        else {
            i = 0;
        }
        children[i].style.display = "inline-block";
    }, 3000);
    //make the slide stop on click   
    const stopImages = ()=>{
        clearInterval(timer);
        imageArr =[];
        input.value = ""
        console.log(imageArr)
        console.log(input.Value)
        children[i].style.display = "none";
        while(imageDiv.firstChild) imageDiv.firstChild.remove()
        console.log(imageDiv)
    }
    stopButton.addEventListener('click', stopImages)
}



document.addEventListener("DOMContentLoaded", ()=>{
    form.addEventListener("submit", (event)=> {
        event.preventDefault()
        fetchRequest()
        console.log("form was submitted by user")
    })
})























































