document.getElementById('apiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const apiKey = document.getElementById('apiKey').value;
    localStorage.setItem('openRouterApiKey', apiKey); // Save API key in cache
    fetchBlogPost(apiKey);
});

function fetchBlogPost(apiKey) {
    const YOUR_SITE_URL = 'https://your-site-url.com'; // Replace with your site URL
    const YOUR_SITE_NAME = 'Your Site Name'; // Replace with your site name

    fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": YOUR_SITE_URL,
            "X-Title": YOUR_SITE_NAME,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "google/learnlm-1.5-pro-experimental:free",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "What's in this image?"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
                            }
                        }
                    ]
                }
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
} 