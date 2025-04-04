console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {  // Waits for the entire HTML to load before running JavaScript
    
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"; // API URL to get 4 random dog images
    const breedUrl = "https://dog.ceo/api/breeds/list/all"; // API URL to get all dog breeds
    
    const dogImageContainer = document.getElementById("dog-image-container"); // Gets the div where images will be added
    const breedList = document.getElementById("dog-breeds"); // Gets the <ul> where breed names will be listed
    const breedDropdown = document.getElementById("breed-dropdown"); // Gets the dropdown for filtering breeds
    
    let allBreeds = []; // Stores the full list of breeds

    // Challenge 1: Fetch and display random dog images
    fetch(imgUrl) // Makes a request to the API to get random images
        .then(response => response.json()) // Converts the response into JSON format
        .then(data => { // Uses the data from the API response
            data.message.forEach(imageUrl => { // Loops through each image URL in the response
                const img = document.createElement("img"); // Creates an <img> element
                img.src = imageUrl; // Sets the image source to the URL from the API
                img.style.width = "200px"; // Sets image width to 200 pixels
                img.style.height = "200px"
                img.style.margin = "10px"; // Adds some space around the images
                dogImageContainer.appendChild(img); // Adds the image to the page inside the container
            });
        });

    // Challenge 2: Fetch and display dog breeds
    fetch(breedUrl) // Makes a request to the API to get a list of all dog breeds
        .then(response => response.json()) // Converts the response into JSON format
        .then(data => { // Uses the data from the API response
            allBreeds = Object.keys(data.message); // Extracts breed names and stores them in an array
            renderBreeds(allBreeds); // Calls a function to display the breeds on the page
        });

    function renderBreeds(breeds) { // Function to display dog breeds
        breedList.innerHTML = ""; // Clears any previous breed list before adding new ones
        breeds.forEach(breed => { // Loops through each breed in the array
            const li = document.createElement("li"); // Creates a new <li> element for each breed
            li.textContent = breed; // Sets the text of the <li> to the breed name
            li.style.cursor = "pointer"; // Changes cursor to pointer to indicate it can be clicked
            li.addEventListener("click", () => { // Adds an event listener to detect clicks
                li.style.color = "blue"; // Challenge 3: Changes font color to blue when clicked
            });
            breedList.appendChild(li); // Adds the breed <li> to the list on the page
        });
    }

    // Challenge 4: Filter breeds by selected letter
    breedDropdown.addEventListener("change", (event) => { // Listens for when the user selects a letter
        const selectedLetter = event.target.value; // Gets the selected letter from the dropdown
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter)); // Filters breeds that start with the selected letter
        renderBreeds(filteredBreeds); // Updates the displayed breed list with the filtered ones
    });
});
