// **************************
// **************************
// **                      **
// **      Solaris         **
// **      Javascript-     **
// **      Examination     **
// **                      **
// **      Egil Ramsten    **
// **      27 Nov 23       **
// **                      **
// **************************
// **************************


// Construct the global variables
const BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";
const planetcard = document.getElementsByClassName("planetcard")[0];
const displaycard = document.getElementsByClassName("display")[0];
let ASTRAL_BODIES = 0;

// Original Fetch on pageload. 
// Gets the API-key for the main fetch for the page.
    fetch(`${BASE_URL}/keys`, {
        method: `POST`
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        fetchapi(data);
    })


// Main Fetch.
// Gets all the information on the planets:
    function fetchapi(data) {
        fetch(`${BASE_URL}/bodies`, {
            method: "GET", 
            headers: {"x-zocom": `${data.key}`}
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            displayplanets(data);
    })}

// Creates the planets based on the information fetched
// and stores the information in the ASTRAL_BODIES variable.
    function displayplanets(data) {
        console.log(data.bodies);
        ASTRAL_BODIES = data.bodies;
        for (let i=0;i<ASTRAL_BODIES.length;i++) {
            let currentPlanet = document.createElement("figure");
            currentPlanet.classList.add(`${ASTRAL_BODIES[i].name}`);
            currentPlanet.classList.add("planet");
            currentPlanet.addEventListener("click", renderPlanetone);
            if (ASTRAL_BODIES[i].name == "Saturnus") {
                let rings = document.createElement("figure");
                rings.classList.add("rings");
                currentPlanet.appendChild(rings);
            }
            displaycard.appendChild(currentPlanet);
        }}

// Displays the info panel when you click on a planet.
    function renderPlanetone() {
        clearPage();
        for (let i=0 ; i < ASTRAL_BODIES.length ; i++) {
            if (event.target.classList.contains(`${ASTRAL_BODIES[i].name}`)) {
                planetData(ASTRAL_BODIES[i])
                changeSideGlobe(ASTRAL_BODIES[i])
    }}}

// Clear the page to make room for the info panel.
    function clearPage() {
        while (planetcard.hasChildNodes()) {
            planetcard.removeChild(planetcard.firstChild);
            }
        for (let i=1; i < 9;i++) {
            document.getElementsByClassName("planet")[i].style.display = "none";
        }
        document.getElementsByClassName("mainheadline")[0].style.display = "none";
        document.getElementsByClassName("secondheadline")[0].style.display = "none";
    }

// Remove the info panel and show the planets again.
    function hideplanets() {
        while (displaycard.firstChild.hasChildNodes()) {
            displaycard.firstChild.removeChild(displaycard.firstChild.firstChild);
            }
        document.getElementsByClassName("display")[0].firstChild.classList.remove(`${planetcard.firstChild.innerHTML}`);
        document.getElementsByClassName("display")[0].firstChild.classList.add("Solen");
        document.getElementsByClassName("planetcard")[0].style.display = "none";
        for (let i=1; i < 9;i++) {
            document.getElementsByClassName("planet")[i].style.display = "block";
        }
        document.getElementsByClassName("mainheadline")[0].style.display = "block";
        document.getElementsByClassName("secondheadline")[0].style.display = "block";
    }

// Change the color of the sideglobe(sun) to match the current planet.
    function changeSideGlobe(planet) {
        planetcard.style.display = "flex";

        let firstshadow = document.createElement("figure");
        let secondshadow = document.createElement("figure");

        displaycard.firstChild.classList.remove("Solen");
        displaycard.firstChild.classList.add(`${planet.name}`)
        firstshadow.classList.add(`${planet.name}`, "firstshadow");
        secondshadow.classList.add(`${planet.name}`, "secondshadow");

        displaycard.firstChild.appendChild(firstshadow);
        displaycard.firstChild.appendChild(secondshadow);
    }

// Displays the data in the info panel based on which planet you clicked on.
    function planetData(planet) {
        
                // Create the DOM-elements
                let planetEscape = document.createElement("figure")
                let bodyname = document.createElement("h1");
                let bodylatin = document.createElement("h2");
                let bodydesc = document.createElement("p");
                let infogrid = document.createElement("div");
                let infopanelone = document.createElement("div");
                let infopaneltwo = document.createElement("div");
                let infopanelthree = document.createElement("div");
                let infopanelfour = document.createElement("div");
                let infopanelfive = document.createElement("div");
                let circleHeadline = document.createElement("h3");
                let bodycircle = document.createElement("p");
                let distanceHeadline = document.createElement("h3");
                let bodyDistance = document.createElement("p");
                let tempMaxHeadline = document.createElement("h3");
                let bodytempmax = document.createElement("p");
                let tempMinHeadline = document.createElement("h3");
                let bodytempmin = document.createElement("p");
                let moonHeadline = document.createElement("h3");
                let bodymoons = document.createElement("p");
                
                    // Insert the information of the planets moons. If there are any.
                    let mooncounter = planet.moons.length;
                    if (mooncounter == 0) {
                        bodymoons.innerText = `Inga.`;
                    }
                    for (let i=0;i<mooncounter;i++) {
                        if (mooncounter == 1) {
                            bodymoons.innerText += `${planet.moons}`
                        } else if (i == (mooncounter-1)) {
                            bodymoons.innerText += ` & ${planet.moons[i]}.`
                        } else if (i == (mooncounter-2)) {
                            bodymoons.innerText += ` ${planet.moons[i]}`
                        } else {
                        bodymoons.innerText += `${planet.moons[i]}, `;  
                    }}
                
                // Add classes to the DOM-elements
                infogrid.classList.add("infogrid");
                bodydesc.classList.add("planetdesc");
                infopanelone.classList.add("infopanel", "infoone");
                infopaneltwo.classList.add("infopanel", "infotwo")
                infopanelthree.classList.add("infopanel", "infothree")
                infopanelfour.classList.add("infopanel", "infofour")
                infopanelfive.classList.add("infopanel", "infofive")
                planetEscape.classList.add("planetEscape");
                planetcard.classList.add("planetcard");

                // Add an eventlistener to the escape-button
                planetEscape.addEventListener("click", hideplanets);

                // Write the data in the DOM-elements
                bodyname.innerText = planet.name;
                bodyname.innerText.toUpperCase();
                planetEscape.innerText = "X";
                bodylatin.innerText = planet.latinName;
                bodylatin.innerText.toUpperCase();
                bodydesc.innerText = planet.desc;
                circleHeadline.innerText = "OMKRETS";
                bodycircle.innerText = `${planet.circumference} km`;
                distanceHeadline.innerText = "KM FRÅN SOLEN";
                bodyDistance.innerText = `${planet.distance} km`;
                tempMaxHeadline.innerText = "MAX TEMPERATUR";
                bodytempmax.innerText = `${planet.temp.day} C`;
                tempMinHeadline.innerText = "MIN TEMPERATUR";
                bodytempmin.innerText = `${planet.temp.night} C`;
                moonHeadline.innerText = "MÅNAR";
        
                // Insert the DOM-elements in the HTML.
                planetcard.appendChild(bodyname);
                planetcard.appendChild(planetEscape);
                planetcard.appendChild(bodylatin);
                planetcard.appendChild(bodydesc);
                infopanelone.appendChild(circleHeadline);
                infopanelone.appendChild(bodycircle);
                infopaneltwo.appendChild(distanceHeadline);
                infopaneltwo.appendChild(bodyDistance);
                infopanelthree.appendChild(tempMaxHeadline);
                infopanelthree.appendChild(bodytempmax);
                infopanelfour.appendChild(tempMinHeadline);
                infopanelfour.appendChild(bodytempmin);
                planetcard.appendChild(infogrid);
                infopanelfive.appendChild(moonHeadline);
                infopanelfive.appendChild(bodymoons);
                planetcard.appendChild(infopanelfive);
                infogrid.appendChild(infopanelone);
                infogrid.appendChild(infopaneltwo);
                infogrid.appendChild(infopanelthree);
                infogrid.appendChild(infopanelfour);
    }