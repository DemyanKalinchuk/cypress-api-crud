
function toOptions(args) {
    if (args.length === 1 && typeof args[0] === 'object') return { ...args[0] };
    if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'object') {
      return { url: args[0], ...args[1] };
    }
    if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
      return { method: args[0], url: args[1] };
    }
    if (args.length === 3 && typeof args[0] === 'string' && typeof args[1] === 'string') {
      return { method: args[0], url: args[1], ...args[2] };
    }
    // Fallback – Cypress can still handle raw args if we miss a shape
    return args[0] || {};
  }
  
  Cypress.Commands.overwrite('request', (originalFn, ...args) => {
    const options = toOptions(args);
  
    // Merge the global header
    const apiKey = Cypress.env('API_KEY') || 'reqres-free-v1'; // default if not set
    options.headers = {
      'x-api-key': apiKey,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };
  
    return originalFn(options);
  });
  