const readEnvFile2 = () => {
    try {
      return process.env.REACT_APP_API_URL2;
    } catch (error) {
      console.error('Error reading env:', error);
      return null;
    }
  };
  
  export default readEnvFile2;