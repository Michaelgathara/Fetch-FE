"use strict";

let breedUrls = {}; // Stores the URLs of the images of the selected breeds

/**
 * @description Fetches a list of dog breeds from the Dog API and creates a checkbox for each breed.
 */
async function getDogBreeds() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    const breedCheckboxes = document.getElementById('breed-checkboxes');

    for (const breed in data.message) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'breed';
        checkbox.value = breed;
        checkbox.id = `breed-${breed}`;
        checkbox.addEventListener('change', getDogImage);

        const label = document.createElement('label');
        label.htmlFor = `breed-${breed}`;
        label.textContent = breed;

        breedCheckboxes.appendChild(checkbox);
        breedCheckboxes.appendChild(label);
    }
}


/**
 * @description Fetches a random image of the selected breed from the Dog API and displays it in the viewer. Updates the view everytime a breed is selected or unselected.
 * 
 * @param {*} event -> The event object, in this case the change event that is triggered when a checkbox is checked or unchecked.
 */
async function getDogImage(event) {
    const breed = event.target.value;
    const viewer = document.getElementById('viewer');

    if (event.target.checked) {
        let url = `https://dog.ceo/api/breed/${breed}/images/random`;
        let response = await fetch(url);
        console.log(response.status)
        if (response.status === 404) {
            // If the URL returns a 404, try fetching another image to make the customer happy
            response = await fetch(url);
        }

        const data = await response.json();

        const img = document.createElement('img');
        img.src = data.message;
        img.id = `img-${breed}`;
        breedUrls[breed] = img;
        viewer.appendChild(img);
    } else {
        viewer.removeChild(breedUrls[breed]);
        delete breedUrls[breed];
    }
}


getDogBreeds();