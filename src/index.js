addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    // Retrieve your API key from an environment variable.
    // Use Wrangler to set this secret (see README instructions below).
    const apiKey = GEMINI_API_KEY;
    
    // Construct the Gemini API endpoint with your API key.
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    // Forward the request body from the client.
    const body = await request.text();
    
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    };
  
    // Make the API request.
    const response = await fetch(endpoint, init);
    const result = await response.text();
  
    // Return the response to the client.
    return new Response(result, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  