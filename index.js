// API Key
const API_KEY = config.ACCESS_KEY;

// Get all the elements
const mapId = document.getElementById('mapId');
const input = document.getElementById('data');
const button = document.getElementById('button');
const ipAddress = document.getElementById('ipAddress');
const locationData = document.getElementById('location');
const country = document.getElementById('country');
const continent = document.getElementById('continent');
var map;

function setMap(response) {

    if (map != null) {
        map.remove();
    }

    map = L.map(mapId).setView([response.latitude, response.longitude], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([response.latitude, response.longitude]).addTo(map);

    console.log(response.ip)
    ipAddress.innerText = response.ip;
    locationData.innerText = response.city;
    country.innerText = response.country_name;
    continent.innerText = response.continent_name;
}

async function getData(urlData) {
    await fetch(urlData)
        .then((data) => {return data.json()})
        .then((response) => {console.log(response); setMap(response)})
}

button.addEventListener('click', () => {
    let newUrl = `http://api.ipstack.com/${input.value}?access_key=${API_KEY}`;
    console.log(newUrl);
    getData(newUrl);
});

// On load just an IP
getData(`http://api.ipstack.com/8.8.8.8?access_key=${API_KEY}`);