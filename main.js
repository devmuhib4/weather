'use strict';


const   cityElemnt         =  document.querySelector('.city');
const   tempratureCurnt    =  document.querySelector('.tempratureCurnt');
const   shortDescription   =  document.querySelector('.shortDescription');
const   detail             =  document.querySelector('.detail');
const   maxTemp            =  document.querySelector('.max-temp');
const   minTemp            =  document.querySelector('.min-temp');
const   feelLike           =  document.querySelector('.feels-like');
const   pressure           =  document.querySelector('.pressure');
const   humidity           =  document.querySelector('.humidity');
const   visibility         =  document.querySelector('.visibility');
const   windSpeed          =  document.querySelector('.wind-speed');
const   Winddegree         =  document.querySelector('.wind-degree');
const   allCloud           =  document.querySelector('.cloud-all');
const   sunrise            =  document.querySelector('.sunrise');
const   sunset             =  document.querySelector('.sunset');
const   TimeZone           =  document.querySelector('.time-zone');
const   country            =  document.querySelector('.country');
const   cityName           =  document.getElementById('cityName');
const   bUTONSUBMIT        =  document.querySelector('.search-bnt');
const   masageElmnt        =  document.querySelector('.searchmassage');
const   iconImg            =  document.querySelector('.icon-img img');
const   watherconnerel     =  document.querySelector('.container-wather');
const   lodingElm          =  document.querySelectorAll('.fa-spinner');

///  output function 
const   showInformation   = function(){
    //add loding 
    bUTONSUBMIT.innerHTML = `<i class="fas fa-spinner fa-pulse"></i>`;
    // watherconnerel.classList.remove('loddeactive');
    watherconnerel.classList.remove('loddeactive');
    watherconnerel.classList.add('loading');
    
    let cityInput  = cityName.value;
    // cityInput = 'lahore';////
const apiUrlDetail = {
    baseUrl : 'api.openweathermap.org/data/2.5/weather?q=',
    apiKey  : '2365d92c90db661b71288892df76ac83',
    city    : cityInput,
};
const {baseUrl,apiKey,city,statecode,countrycode}  =  apiUrlDetail;
const genratedUrl = `http://${baseUrl}${city}&appid=${apiKey}`;
const genrequest = new XMLHttpRequest();
genrequest.open('GET', genratedUrl,'true');
genrequest.send();
genrequest.onload = function(){
if (genrequest.status === 200){
  const  watherData = JSON.parse(genrequest.responseText);
  const oneKelven = -272.15;
    cityElemnt.innerHTML = watherData.name;
    shortDescription.innerHTML = watherData.weather[0].main;
    detail.innerHTML = watherData.weather[0].description;

    const currenttemprature =   watherData.main.temp + oneKelven;
    tempratureCurnt.innerHTML = Math.round(currenttemprature);

    const iconInfo = watherData.weather[0].icon;
    iconImg.src = `http://openweathermap.org/img/wn/${iconInfo}@2x.png`

    const temmaxCalc =   watherData.main.temp_max + oneKelven;
    maxTemp.innerHTML = Math.round(temmaxCalc);

    const temminCalc =   watherData.main.temp_min + oneKelven;
    minTemp.innerHTML = Math.round(temminCalc);

    const feelCalc =    watherData.main.feels_like + oneKelven;
    feelLike.innerHTML = Math.round(feelCalc);

    pressure.innerHTML = watherData.main.pressure;
    humidity.innerHTML = watherData.main.humidity;

    const windsped =   `${watherData.wind.speed }`;
    windSpeed.innerHTML = windsped;

    Winddegree.innerHTML = watherData.wind.deg;
    allCloud.innerHTML = watherData.clouds.all;

    const visibl =    `${watherData.visibility/1000}`;
    visibility.innerHTML = visibl;

    const sunriseCalc = Math.round(watherData.sys.sunrise/1000/60/60);
    sunrise.innerHTML = sunriseCalc + 'am';


    const sunsetCalc = Math.round(watherData.sys.sunset/1000/60/60);
    sunset.innerHTML = sunsetCalc + 'pm';

    const TimeZoneCalc = Math.round(watherData.timezone/1000);
    TimeZone.innerHTML = '+'+TimeZoneCalc;

    country.innerHTML = watherData.sys.country;
        masageElmnt.style.display = "none"
     cityName.value = "";
    }else{
        cityName.value = "";
        masageElmnt.style.display = "block";
    }
     // loading back
    bUTONSUBMIT.innerHTML = 'search...';
    watherconnerel.classList.add('loddeactive');
    watherconnerel.classList.remove('loading');
};
}

// showInformation()
//  search input city
cityName.addEventListener('change',showInformation );
bUTONSUBMIT.addEventListener('click', showInformation);


