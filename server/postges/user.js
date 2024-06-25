import { Sequelize } from "sequelize";
import { userModel} from "../models/user.js";
const sequelize = new Sequelize('votingSite', 'postgres', '123456', {
    host: 'localhost',
    dialect:'postgres'
  });
  let newuserModel=null;
  const connectionUser=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newuserModel=await userModel(sequelize);
        await sequelize.sync();
        console.log("Database created status");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {
    connectionUser,
    newuserModel,
  }
  

  //npm i bcrypt body-parser cookie-parser cors dotenv express jsonwebtoken pg pg-hstore sequelize