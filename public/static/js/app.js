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
        checkbox.className = 'breed-checkbox';
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
 * @param {Event} event - The event object, in this case is triggered when a checkbox is checked or unchecked.
 */
async function getDogImage(event) {
    const breed = event.target.value;
    const viewer = document.getElementById('viewer');

    if (event.target.checked) {
        let url = `https://dog.ceo/api/breed/${breed}/images/random`;
        let response = await fetch(url);

        if (response.status === 404) {
            response = await fetch(url);
        }

        const data = await response.json();

        const container = document.createElement('div');
        container.className = 'dog-container';
        container.id = `container-${breed}`;

        const img = document.createElement('img');
        img.src = data.message;
        img.className = 'dog-image';

        const title = document.createElement('span');
        title.className = 'dog-title';
        title.textContent = breed;

        container.appendChild(img);
        container.appendChild(title);

        breedUrls[breed] = container;

        viewer.appendChild(container);
    } else {
        viewer.removeChild(breedUrls[breed]);
        delete breedUrls[breed];
    }
}

/**
 * @description Filters the displayed dog breed checkboxes based on the user's search query.
 */
function filterBreeds() {
    const query = document.getElementById('breed-search').value.toLowerCase();
    const labels = document.querySelectorAll('#breed-checkboxes label');

    labels.forEach(label => {
        const text = label.textContent.toLowerCase();
        const checkbox = document.getElementById(`breed-${text}`);

        if (text.includes(query)) {
            label.style.display = 'inline';
            checkbox.style.display = 'inline';
        } else {
            label.style.display = 'none';
            checkbox.style.display = 'none';
        }
    });
}

// Fetch the initial list of dog breeds on javascript load in browser
getDogBreeds();

// Add event listener to the search input for filtering breeds
document.getElementById('breed-search').addEventListener('input', filterBreeds);
