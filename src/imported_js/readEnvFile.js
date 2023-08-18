const readEnvFile = () => {
    try {
      return process.env.REACT_APP_API_URL;
    } catch (error) {
      console.error('Error reading env.json:', error);
      return null;
    }
  };
//   readEnvFile();
  export default readEnvFile;


