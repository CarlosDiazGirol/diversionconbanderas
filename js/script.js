const countriesList = document.getElementById("countries-list")
const info = document.getElementById("info")

// fetch sin ASYNC/AWAIT para comparar con el código
// fetch("https://restcountries.com/v3/all")
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(err => console.log("Esdte es el error", err))

const getCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3/all")
    const countries = await response.json()
    await sortedCountries(countries)
    return countries
  } catch (err) {
    console.log("este es el error", err)
  }
}

const sortedCountries = (countries) => {
  countries.sort((a, b) => {
    const nameA = a.name.official.toUpperCase()
    const nameB = b.name.official.toUpperCase()
    return nameA.localeCompare(nameB)
  })
}

getCountries().then(countries => {
  countries.forEach((country, index) => {
    let template = `
      <div class="card"> 
      <img src=${country.flags[0]} alt=${country.name.official} />
      <h2>${country.name.official}</h2>
      </div>
    `
    countriesList.insertAdjacentHTML("beforeend", template)

    const card = document.querySelectorAll(".card")[index]

    card.addEventListener("click", () => {
      let templateInfo = `
        <div class="infodetalle">
          <img src="${country.flags[0]}" alt="${country.name.common} flag">
            <h2>${country.name.common}</h2>
            <p>Capital: ${country.capital}</p>
            <p>Población: ${country.population}</p>
            <p>Lado de la carretera: ${country.car.side}</p>
          <button onclick="closeInfo()">cerrar</button>
        </div>
      `
      info.innerHTML = templateInfo
      info.classList.add("visible")
    })
  });
})

const closeInfo = () => info.classList.remove("visible")

// Otra solución si queremos usar innerHTML y no crear nodos con insertAdjacentHTML.

// getCountries().then(countries => {
//   countries.forEach((country) => {
//     let template = `
//       <div class="card"> 
//       <img src=${country.flags[0]} alt=${country.name.official} />
//       <h2>${country.name.official}</h2>
//       </div>
//     `
//     countriesList.innerHTML += template
//   });

//   countries.forEach((country, index) => {
//     const card = document.querySelectorAll(".card")[index]
//     card.addEventListener("click", () => {
//       let templateInfo = `
//         <div class="infodetalle">
//           <img src="${country.flags[0]}" alt="${country.name.common} flag">
//             <h2>${country.name.common}</h2>
//             <p>Capital: ${country.capital}</p>
//             <p>Población: ${country.population}</p>
//             <p>Lado de la carretera: ${country.car.side}</p>
//           <button onclick="closeInfo()">cerrar</button>
//         </div>
//       `
//       info.innerHTML = templateInfo
//       info.classList.add("visible")
//     })
//   })
// })
  