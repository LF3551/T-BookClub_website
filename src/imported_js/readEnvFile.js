
const readEnvFile = () => {
    try {
      const envData =  String("https://t-book-club-server-lf3551.vercel.app/hall-of-fame");
    //   const envData = process.env.REACT_APP_MY_VARIABLE
      console.log(envData); // Выводим содержимое строки в консоль
      return envData;
    } catch (error) {
      console.error('Error reading env.json:', error);
      return null;
    }
  };
//   readEnvFile();
  export default readEnvFile;


