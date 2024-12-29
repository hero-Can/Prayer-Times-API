
let date = document.getElementById("date");
let city = document.getElementById("city");
let tableTbody = document.getElementById("body-row");

// Get today's date
let today = new Date();

// Get day, month, and year
let day = String(today.getDate()).padStart(2, '0');  // Adds leading zero if day is single digit
let month = String(today.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed, so add 1
let year = today.getFullYear();
// Format the date as dd-mm-yyyy
let formattedDate = `${day}-${month}-${year}`;

// change dropdown value of city
let dropdown = document.getElementById("cityDropdown");
dropdown.addEventListener("change", function() {
    const selectedOption = dropdown.options[dropdown.selectedIndex];
     cityName = selectedOption.getAttribute("data-city-name");
     countryCode = selectedOption.getAttribute("data-country-code");
    getTodayPrayerTimeByCity(cityName,countryCode)
  });

//   default parameters
  let cityName="Marrakech";
  let countryCode = "MA";

function getTodayPrayerTimeByCity(cityName,countryCode) {
    axios.get(`http://api.aladhan.com/v1/timingsByCity/{${formattedDate}}?city=${cityName}&country=${countryCode}`)
        .then( (response) => {
            // en cas de réussite de la requête

            // set today date
            let todayDate = response.data.data.date.readable;
            let ArDayName = response.data.data.date.hijri.weekday.ar
            date.innerHTML = todayDate+"  "+ArDayName;
            //set City name
            city.innerHTML = cityName;
            // set time prayer
            tableTbody.innerHTML=`<tr>
                        <td>Prayer Time</td>
                        <td>${response.data.data.timings.Fajr} AM</td>
                        <td>${response.data.data.timings.Dhuhr} PM</td>
                        <td>${response.data.data.timings.Asr} PM</td>
                        <td>${response.data.data.timings.Maghrib} PM</td>
                        <td>${response.data.data.timings.Isha} PM</td>
                      </tr>`;

            // console.log(response.data.data.timings.Fajr);
        })
        .catch(function (error) {
            // en cas d’échec de la requête
            console.log(error);
        })
}
getTodayPrayerTimeByCity(cityName,countryCode)