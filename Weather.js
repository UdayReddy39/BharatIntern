var SearchBtn = document.getElementsByClassName("input-search")[0]
SearchBtn.addEventListener("click",GetValue);
var countTaps = 0;

const tempHeading = document.getElementsByClassName("card-temp-value")[0];

const tempCondition = document.getElementsByClassName("card-temp-condition")[0];

const tempHumidity = document.getElementsByClassName("card-temp-humidity")[0];

const tempTime = document.getElementsByClassName("card-temp-time")[0];
const tempDate = document.getElementsByClassName("card-temp-date")[0];

const tempLoc = document.getElementsByClassName("card-temp-location")[0]


var mainContainerImg = document.getElementById("main-containerID");
var DataContainerImg = document.getElementById("data-containerID");

function GetValue(){
  var InpValue = document.getElementsByClassName("input-field")[0]
  const cityname = InpValue.value;
  console.log(InpValue.value)
  // const apiLink = `http://api.weatherapi.com/v1/current.json?key=bc85ca2527114f0d86b65521241801&q=$${cityname}`
  const apiLink = `http://api.weatherapi.com/v1/current.json?key=1831c43826f143eabf6145453240904&q=${cityname}&aqi=yes`;
  console.log(apiLink);
  InpValue.value = ""


  const overlayer = document.getElementsByClassName("overlay")[0];
  const overlayertxt = document.getElementsByClassName("overlay-text")[0];
  overlayertxt.innerHTML = ""
  overlayer.classList.remove("hidden")
  countTaps+=1
  console.log(countTaps)

  const dataoverlayer = document.getElementsByClassName("hidden2")[0];
  dataoverlayer.classList.add("card-container");

  const apiRequestData = {
    method:"POST",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Header":"*"
      },
  }
  const res = fetch(apiLink,apiRequestData)
  res.then(res => res.json()).then(data=>{
    const condition = data.current.condition.text
    const city = data.location.name
    const state = data.location.region
    const country = data.location.country
    const tempC = data.current.temp_c
    const Humid = data.current.humidity
    const DateTime = data.location.localtime.split(" ").reverse().join(" ");
    const CurTime = DateTime.split(" ")
    const CurDate = CurTime[1].split("-").reverse().join("-")
    
  
    mainContainerImg.style.backgroundImage = 'url("Images/Weather-Bg.jpg")';
    DataContainerImg.style.backgroundImage = 'url("Images/Weather-Bg.jpg")';
    document.getElementById("Weather-IconID").src = "Images/Weather-icon.png"
    document.getElementById("search-containerID").style.borderColor = "black";
    document.getElementsByClassName("input-search")[0].style.borderColor = "black";
    document.getElementById("card-containeer-dataID").style.color = "black";
    document.getElementById("Complete-btnID").style.borderColor = "black";
    document.getElementById("Complete-btnID").style.color = "black";
    document.getElementById("input-fieldID").style.color = "black";
    if(condition.toLowerCase().includes("rain") ||condition.toLowerCase().includes("strom")){
      console.log("Dark")
      mainContainerImg.style.backgroundImage = 'url("Images/Rainy-1.jpeg")';
      DataContainerImg.style.backgroundImage = 'url("Images/Rainy-1.jpeg")';
      document.getElementById("Weather-IconID").src = "Images/Rainy-icon.png"
      document.getElementById("card-containeer-dataID").style.color = "white";
      document.getElementById("Complete-btnID").style.borderColor = "white";
      document.getElementById("Complete-btnID").style.color = "white";
      document.getElementById("search-containerID").style.borderColor = "white";
      document.getElementsByClassName("input-search")[0].style.borderColor = "white";
      document.getElementById("input-fieldID").style.color = "white";
      // document.getElementById("input-fieldID").ariaPlaceholder.style.color = "white";
    }
    else if(condition.toLowerCase().includes("sunny")){
      mainContainerImg.style.backgroundImage = 'url("Images/Sunny-1.jpeg")';
      DataContainerImg.style.backgroundImage = 'url("Images/Sunny-1.jpeg")';
      document.getElementById("Weather-IconID").src = "Images/Sunny-icon.png"
    }
    else if( condition.toLowerCase().includes("cloudy") ){
      mainContainerImg.style.backgroundImage = 'url("Images/Cloudy-1.jpeg")';
      DataContainerImg.style.backgroundImage = 'url("Images/Cloudy-1.jpeg")';
      document.getElementById("Weather-IconID").src = "Images/Cloudy-icon.png"
      document.getElementById("card-containeer-dataID").style.color = "white";
      document.getElementById("Complete-btnID").style.borderColor = "white";
      document.getElementById("Complete-btnID").style.color = "white";
      document.getElementById("search-containerID").style.borderColor = "white";
      document.getElementsByClassName("input-search")[0].style.borderColor = "white";
      document.getElementById("input-fieldID").style.color = "white";
    }
    else if( condition.toLowerCase().includes("mist") ){
      mainContainerImg.style.backgroundImage = 'url("Images/Mist-1.jpeg")';
      DataContainerImg.style.backgroundImage = 'url("Images/Mist-1.jpeg")';
      document.getElementById("Weather-IconID").src = "Images/Cloudy-icon.png"
      document.getElementById("card-containeer-dataID").style.color = "white";
      document.getElementById("Complete-btnID").style.borderColor = "white";
      document.getElementById("Complete-btnID").style.color = "white";
      document.getElementById("search-containerID").style.borderColor = "white";
      document.getElementsByClassName("input-search")[0].style.borderColor = "white";
      document.getElementById("input-fieldID").style.color = "white";
    }
    else if( condition.toLowerCase().includes("snow") ){
      mainContainerImg.style.backgroundImage = 'url("Images/Snowy-1.jpeg")';
      DataContainerImg.style.backgroundImage = 'url("Images/Snowy-1.jpeg")';
      document.getElementById("Weather-IconID").src = "Images/Snowy-icon.png"
    }
    else if( condition.toLowerCase().includes("wind") ){
      mainContainerImg.style.backgroundImage = 'url("Images/Windy-1.jpeg")';
      DataContainerImg.style.backgroundImage = 'url("Images/Windy-1.jpeg")';
      document.getElementById("Weather-IconID").src = "Images/Windy-icon.png"
      document.getElementById("Complete-btnID").style.borderColor = "white";
      document.getElementById("Complete-btnID").style.color = "white";
      document.getElementById("search-containerID").style.borderColor = "white";
      document.getElementsByClassName("input-search")[0].style.borderColor = "white";
      document.getElementById("input-fieldID").style.color = "white";  
    }
    tempHeading.innerText = tempC;
    tempCondition.innerText = condition;
    tempHumidity.innerText = "Humidity : "+Humid+"%";
    tempTime.innerText = CurTime[0];
    tempDate.innerText = CurDate;
    tempLoc.innerText = city+","+state+","+country
    }).catch(err=>{
      const overlayer = document.getElementsByClassName("overlay")[0];
      const overlayertxt = document.getElementsByClassName("overlay-text")[0];
      overlayertxt.innerHTML = "Couldn't Find Location "
      overlayer.classList.add("hidden")
      const dataoverlayer = document.getElementsByClassName("hidden2")[0];
      dataoverlayer.classList.remove("card-container");
      mainContainerImg.style.backgroundImage = 'url("Images/Weather-Bg.jpg")';
      DataContainerImg.style.backgroundImage = 'url("Images/Weather-Bg.jpg")';
      document.getElementById("Weather-IconID").src = "Images/Weather-icon.png"
      document.getElementById("search-containerID").style.borderColor = "black";
      document.getElementsByClassName("input-search")[0].style.borderColor = "black";
      document.getElementById("input-fieldID").style.color = "black";
  })
}

 