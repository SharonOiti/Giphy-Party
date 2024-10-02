console.log("Let's get this party started!");

const apiKey = 'FUHFnd2Heis6ddZ5Jlel7uWTTOl8fJGb'; // Your Giphy API key
const gifForm = $('#gifForm');
const gifInput = $('#gifInput');
const gifContainer = $('#gifContainer');
const clearButton = $('#clearButton');

gifForm.on('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const searchTerm = gifInput.val();
    fetchGif(searchTerm);
    gifInput.val(''); // Clear the input field
});

clearButton.on('click', function() {
    gifContainer.empty(); // Clear all GIFs
});

function fetchGif(searchTerm) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=1`;

    axios.get(url)
        .then(response => {
            if (response.data && response.data.data.length > 0) {
                const gifUrl = response.data.data[0].images.original.url;
                appendGif(gifUrl);
            } else {
                alert('No GIF found! Please try another search.');
            }
        })
        .catch(error => {
            console.error('Error fetching GIF:', error.response ? error.response.data : error.message);
            alert('An error occurred while fetching the GIF. Please try again later.');
        });
}

function appendGif(gifUrl) {
    const gifElement = $('<img>').attr('src', gifUrl).addClass('gif');
    gifContainer.append(gifElement);
}
