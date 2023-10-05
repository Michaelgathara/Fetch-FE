"use strict";

let breedUrls = {};

/**
 * @description Fetches a list of dog breeds from the Dog API and creates a checkbox for each breed.
 */
function getDogBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
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
        });
}

/**
 * @description Fetches a random image of the selected breed from the Dog API and displays it in the viewer. Updates the view everytime a breed is selected or unselected.
 * @param {*} event 
 */
function getDogImage(event) {
    const breed = event.target.value;
    const viewer = document.getElementById('viewer');

    if (event.target.checked) {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(response => response.json())
            .then(data => {
                const img = document.createElement('img');
                img.src = data.message;
                img.id = `img-${breed}`;
                breedUrls[breed] = img;
                viewer.appendChild(img);
            });
    } else {
        viewer.removeChild(breedUrls[breed]);
        delete breedUrls[breed];
    }
}

getDogBreeds();