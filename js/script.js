// Find the date inputs, button, and gallery on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const button = document.querySelector('.filters button');
const gallery = document.getElementById('gallery');

// Set up the date inputs with their default values and valid range
setupDateInputs(startInput, endInput);

// Load APOD images when the button is clicked
button.addEventListener('click', getSpaceImages);

async function getSpaceImages() {
  const startDate = startInput.value;
  const endDate = endInput.value;

  if (!startDate || !endDate || startDate > endDate) {
    showMessage('Please choose a valid start and end date.');
    return;
  }

  if (!startInput.validity.valid || !endInput.validity.valid) {
    showMessage('Choose dates between June 16, 1995 and today.');
    return;
  }

  button.disabled = true;
  showMessage('Loading space images...');

  try {
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate
    });

    const response = await fetch(`/api/apod?${params}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `The request failed (${response.status}).`);
    }

    const apodItems = await response.json();

    // Some APOD entries are videos, so only show entries with images.
    const imageItems = apodItems.filter(
      (item) => item.media_type === 'image' && (item.hdurl || item.url)
    );

    if (imageItems.length === 0) {
      showMessage('No APOD images were found for those dates.');
      return;
    }

    displayImages(imageItems);
  } catch (error) {
    showMessage(`Could not load space images. ${error.message}`);
  } finally {
    button.disabled = false;
  }
}

function displayImages(apodItems) {
  gallery.replaceChildren();

  apodItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'gallery-item';

    const title = document.createElement('h2');
    title.textContent = item.title;

    const image = document.createElement('img');
    image.src = item.hdurl || item.url;
    image.alt = item.title;
    image.loading = 'lazy';

    card.append(title, image);
    gallery.appendChild(card);
  });
}

function showMessage(message) {
  gallery.replaceChildren();

  const status = document.createElement('p');
  status.className = 'placeholder';
  status.setAttribute('role', 'status');
  status.textContent = message;
  gallery.appendChild(status);
}
