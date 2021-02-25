// change landing page background randomly

// select landing page 
let landingPage = document.querySelector(".landing-page");
// array of images
let imgarray =["1.jpg","2.jpg","3.jpg","4.jpg"];

// random background options
let backgroundoption = true;

// var to controll the background interval 
let theinterval;

//  switch random background elements
const randombackel = document.querySelectorAll(".random-background span") 
// check if there's local storage random background item
let backgroundlocal = localStorage.getItem("background-option")
// check if local storage is not empty
if(backgroundlocal !== null){
    if(backgroundlocal === "true"){
        backgroundoption = true;
    }else{
        backgroundoption = false;
    }
    // remove active class from all spans 
    document.querySelectorAll(".random-background span").forEach(element=>{
        element.classList.remove("active")

    })
    if(backgroundlocal === 'true'){
        document.querySelector(".random-background .yes").classList.add("active")
    }else{
        document.querySelector(".random-background .no").classList.add("active")
    }
}



// loop on every span
randombackel.forEach(li => {
    li.addEventListener("click",(e)=>{
        // remove selected class from all siblings
        e.target.parentElement.querySelectorAll(".active").forEach(element =>{
            element.classList.remove("active");
        })
        // add selected class on clicked element
        e.target.classList.add("active")
        
        if(e.target.dataset.background === 'yes'){
            backgroundoption = true;
            randomizeimg()
            localStorage.setItem("background-option",true)
        }else{
            backgroundoption = false;
            clearInterval(theinterval)
            localStorage.setItem("background-option",false)
        }
    })
})

// rondomize imgs 
function randomizeimg(){
    if(backgroundoption ===true){
        theinterval = setInterval(() =>{
            //get random number 
            let randomnumber = Math.floor(Math.random()*imgarray.length)
            // change background url
            landingPage.style.backgroundImage = 'url("images/'+imgarray[randomnumber]+'")'
        },10000)
    }
}
randomizeimg()



// open settings box
let  boxoptions = document.querySelector(".settings-box")
// toggle class opened on settings box
document.querySelector(".icon-box i").onclick = function(){
    this.classList.toggle("fa-spin")
     boxoptions.classList.toggle("opened")
}

// switch colors 
const colorsli = document.querySelectorAll(".colors li")

colorsli.forEach(li => {
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty("--main--color",e.target.dataset.color);
        // set the color to local stotage
        localStorage.setItem("colors",e.target.dataset.color)
        // remove selected class from all siblings
        e.target.parentElement.querySelectorAll(".selected").forEach(element =>{
            element.classList.remove("selected");
        })
        // add selected class on clicked element
        e.target.classList.add("selected")
    })
})
// save colors to the local storage 
// check if there's colors in the local storage
let coloroption = localStorage.getItem("colors")
if(coloroption !== null){
    document.documentElement.style.setProperty("--main--color",coloroption);

    // remove selected class from all siblings
    colorsli.forEach(element =>{
        element.classList.remove("selected");
        
        if(element.dataset.color === coloroption){
            // add selected class on clicked element
            element.classList.add("selected")
        }
    })
    
}



// animate progress bar when scroll 
// select skills section
let ourskills = document.querySelector(".skills")

window.onscroll = function (){
    // skills offset top 
    let skillsoffset = ourskills.offsetTop;
    // skills outer height
    let skillsouterheight = ourskills.offsetHeight;
    // window height
    let windowheight = this.innerHeight;
    // window scroll top
    let windowscrolltop = this.pageYOffset;
    if(windowscrolltop < (skillsoffset + skillsouterheight - windowheight)){
        let allskills = document.querySelectorAll(".skill-box .skill-progress span")
        allskills.forEach(skill=>{
            skill.style.width = skill.dataset.progress;
        })
    }
}

// create popup with the images 
let ourgallery = document.querySelectorAll(".gallery img")

ourgallery.forEach(img=>{
    img.addEventListener("click", (e)=>{
// create overlay element 
let overlay = document.createElement("div");
// add class to overlay 
overlay.className = "popup-overlay";
// append overlay to body 
document.body.appendChild(overlay)
// create the popup 
let popup =document.createElement("div");
// add class to the popup 
popup.className = "popup";

if(img.alt !== null){
    // create heading of the image
    let popupheading = document.createElement("h3")
    // add class to the h3
    popupheading.className = "popupheading"
    // create text for heading
    let headingtext = document.createTextNode(img.alt)
    // append text to the heading
    popupheading.appendChild(headingtext)
    // append the heading to the popup box
    popup.appendChild(popupheading)
}
// create the img
let popupimg = document.createElement("img")
// set img source
popupimg.src = img.src
// append img to popup 
popup.appendChild(popupimg)
// append the popup to the body
document.body.appendChild(popup)
// create close span 
let closebutton = document.createElement("span")
// create the close text
let closetext = document.createTextNode("x")
// append text to close button 
closebutton.appendChild(closetext)
// add class to close button 
closebutton.className = "closebutton"
// append the close button to the popup box 
popup.appendChild(closebutton)


    })
})
// close the popup 
document.addEventListener("click",function(e){
    if(e.target.className == "closebutton"){
        // remove the current popup
        e.target.parentNode.remove()
        // remove the overlay 
        document.querySelector(".popup-overlay").remove()
    }
})

// scroll to section
// select all bullets and nav links
const allbullets = document.querySelectorAll(".nav-bullets .bullet")
const navlinks = document.querySelectorAll(".header ul li a")
/*
allbullets.forEach(bullet =>{
    bullet.addEventListener("click",(e)=>{

        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:'smooth'
        })
        
    })
})
// nav bar scroll

// loop on all links
navlinks.forEach(link=>{
    link.addEventListener("click",(li)=>{
        li.preventDefault()
        document.querySelector(li.target.dataset.scroll).scrollIntoView({
            behavior:'smooth'
        })
    })
})
*/
// scroll to element function best practise
function scrolltoelement(elements){
    elements.forEach(el=>{
        el.addEventListener("click",(li)=>{
            li.preventDefault()
            document.querySelector(li.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            })
        })
    })
}
scrolltoelement(allbullets)
scrolltoelement(navlinks)


// handle active class
function handleActive(ev) {
    // loop on all elements that have active class
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        // remove active class
        element.classList.remove("active");
    });
    // add active class on the clicked element
    ev.target.classList.add("active");
}



// links active class
let links = document.querySelector(".links li a")

links.onclick = function(e){
    handleActive(e)
}

// bullets option 
// select bullets span
let bulletsspan = document.querySelectorAll(".bullets-option span");
// select nav bullets
let navbullets = document.querySelector(".nav-bullets");
// local storage
let bulletslocalstorage = localStorage.getItem("bullets_option")

if(bulletslocalstorage !== null){
    bulletsspan.forEach( span => {
        span.classList.remove("active")
    });
    if(bulletslocalstorage === "block"){
        
        navbullets.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active")
    }else{
        navbullets.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}

bulletsspan.forEach(span=>{
    span.addEventListener("click",(e)=>{
        if(span.dataset.display === 'show'){
            navbullets.style.display = 'block';
            localStorage.setItem("bullets_option","block")
        }else{
            navbullets.style.display = 'none';
            localStorage.setItem("bullets_option","none")
        }
        handleActive(e)
    })
})



// reset button 
document.querySelector(".reset").onclick = function(){

    // remove all options in local storage
    localStorage.removeItem("bullets_option")
    localStorage.removeItem("background-option")
    localStorage.removeItem("colors")
    window.location.reload()

}


// toggle menu
let togglebtn = document.querySelector(".toggle-menu")
let thelinks = document.querySelector(".links")

togglebtn.onclick = function (e) {
    // stop propagation
    e.stopPropagation()
    // toggle menu active class 
    this.classList.toggle("menu-active")
    // toggle open class 
    thelinks.classList.toggle("open")
}

// click anywhere outside to toggle the button 
document.addEventListener("click",(e)=>{
    if(e.target !== togglebtn && e.target !==thelinks){

        // check if menu is open
        if(thelinks.classList.contains("open")){
            // toggle menu active class 
            togglebtn.classList.toggle("menu-active")
            // toggle open class 
            thelinks.classList.toggle("open")
        }
    }
})
// stop propagation on menu
thelinks.onclick = function (e){
    e.stopPropagation()
}



// nice scroll
$(function() {  
    $("body").niceScroll({
        cursorcolor: "#24afcb",
        cursorwidth: "10px",
        cursorborder: "1px solid #24afcb",
        cursorborderradius: "0px",
        zindex: "10000"
    });
});