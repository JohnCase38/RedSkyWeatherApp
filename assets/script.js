const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=50fa8f2e40a9e2271f6fa7a42bc7f71f`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=50fa8f2e40a9e2271f6fa7a42bc7f71f`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api)
        .then(res => res.json())
        .then(result => weatherDetails(result)).catch(() =>{
            infoTxt.innerText = "Something went wrong";
            infoTxt.classList.replace("pending", "error");
        });
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    
//     weatherbox.innerHTML = <section class="weather-part">
//     <img src="" alt="Weather Icon">
//     <div class="temp">
//       <span class="numb">_</span>
//       <span class="deg">°</span>C
//     </div>
//     <div class="weather">_ _</div>
//     <div class="location">
//       <i class='bx bx-map'></i>
//       <span>_, _</span>
//     </div>
//     <div class="bottom-details">
//       <div class="column feels">
//         <i class='bx bxs-thermometer'></i>
//         <div class="details">
//           <div class="temp">
//             <span class="numb-2">_</span>
//             <span class="deg">°</span>C
//           </div>
//           <p>Feels like</p>
//         </div>
//       </div>
//       <div class="column humidity">
//         <i class='bx bxs-droplet-half'></i>
//         <div class="details">
//           <span>_</span>
//           <p>Humidity</p>
//         </div>
//       </div>
//     </div>
//   </section>
    }
}

let locationIcon = document.querySelector('.weather-icon');
const {icon} = data.weather[0];
locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});


