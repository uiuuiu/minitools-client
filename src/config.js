const dev = {
  apiEndpoint: 'http://localhost:3000',
  google: {
    CLIENT_ID: '270370971749-3el8cpf5mc5qjumavfkb4afhiritfli7.apps.googleusercontent.com'
  }
};

const prod = {
  apiEndpoint: process.env.API_ENDPOINT,
  google: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID
  }
};

const config = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  // Default to dev if not set
  ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};

export default config;