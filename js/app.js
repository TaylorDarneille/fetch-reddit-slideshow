
let requestURL= 'http://www.reddit.com/search.json?q=';
let makeItAppropriate= '+nsfw:no';
let imgArr=[];
let counter= 0;
let switchPic;

//FUNCTION THAT GETS THE IMG URL FROM JSON DATA OBJECT AND PUTS IT IN AN ARRAY
const getImgURL= (info)=> { //info represents the jsonData that gets passed in when getImgURL() gets called in the second .then
    info.data.children.forEach(child=> { //info.data.children is an array so we can call .forEach() on it. child represents each array element 
        imgArr.push(child.data.thumbnail); //reach the imgURL by child.data.thumbnail and adding it to the imgArr
    })
}

//FUNCTION THAT CREATES AN IMG ELEMENT AND APPENDS IT, GETS CALLED BY SETINTERVAL
const displayImg= ()=> {
    while(imgBox.firstChild || putBtn.firstChild){ //removes previous image and stop button if there is one 
        imgBox.removeChild(imgBox.firstChild);
        putBtn.removeChild(putBtn.firstChild);
    }
    let picture= document.createElement('img');
    picture.classList.add('pic');
    picture.src=imgArr[counter]; //grabbing the img url from imgArr at different index depending on counter
    imgBox.append(picture);
    if(counter== imgArr.length-1){ //this will allow the photos to loop through if the user doesnt switch their search option
        counter= 0; //reached the end of the array and need to start from the beginning of array
    } else {
        counter++; //if not at the end, increment the counter
    }
    let stopBtn= document.createElement('button'); //create stop button element 
    stopBtn.innerText= 'STOP';
    //event listener has annot function
    putBtn.append(stopBtn); //add stopBtn element to its proper div
    putBtn.addEventListener('click', ()=> {
        clearInterval(switchPic); //will clear interval/stop img slideshow
        imgBox.removeChild(imgBox.firstChild); //gets rid of img
        showHideBox.style.display= ''; //displays the input option
        putBtn.removeChild(putBtn.firstChild); //gets rid of the stop button
        // showHideBox.classList.add('fadeBox');
    })
    
}

//FUNCTION THAT WILL FETCH JSON DATA, IS CALLED WITH SUBMIT EVENT LISTENER
const fetchImg= ()=> {
    imgArr= []; //reset imgArr to be empty for every new search
    imgBox.innerText= 'Images loading...';
    fetch(requestURL+ inputBox.value+ makeItAppropriate)
    .then((responseData)=> {
        return responseData.json(); //will returned the responseData in json format
    })
    .then((jsonData)=> { //can then do a then on the returned responseData in json format, pass in as parameter jsonData
        getImgURL(jsonData); //call getImgURL passing in the jsonData so the function has access to it   
        switchPic= setInterval(displayImg, 3000); //set a setInterval that calls the function in charge of creating img elements, setting them, and adding them
    })
    .catch((error)=> {
        console.log('Here is your error sir/maam:', error);
    })
}

document.addEventListener('DOMContentLoaded', ()=> {
    form.addEventListener('submit', (event)=> {
        event.preventDefault();
        showHideBox.style.display= 'none'; //this line of code will make title/directions/input elements ~disappear 
        fetchImg(); //calling the function that contains our fetch request 
    })
})

