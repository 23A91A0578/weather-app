const apiKey = "e07d5cfae02bbdeb988013264ed9c4f5";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  console.log("Fetching:", url); // For debugging

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const name = data.name;
      const temp = data.main.temp;
      const condition = data.weather[0].main;

      document.getElementById("city").textContent = name;
      document.getElementById("temperature").textContent = `${temp} °C`;
      document.getElementById("condition").textContent = condition;

      changeBackground(condition);
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
}
// ✅ Show device date and time (live)
function updateDateTime() {
  const now = new Date();

  const date = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const time = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  document.getElementById("date").textContent = "Date: " + date;
  document.getElementById("time").textContent = "Time: " + time;
}

// ✅ Update clock every second
updateDateTime();
setInterval(updateDateTime, 1000);


function changeBackground(condition) {
  const lower = condition.toLowerCase();

  if (lower.includes("cloud")) {
    document.body.style.backgroundColor = "#a4b0be";
  } else if (lower.includes("rain")) {
    document.body.style.backgroundColor = "#74b9ff";
  } else if (lower.includes("clear")) {
    document.body.style.backgroundColor = "#ffeaa7";
  } else {
    document.body.style.backgroundColor = "#dfe6e9";
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
