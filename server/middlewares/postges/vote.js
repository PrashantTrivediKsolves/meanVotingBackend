import { Sequelize } from "sequelize";
import { voteModel} from "../models/vote.js";
const sequelize = new Sequelize('votingSite', 'postgres', '123456', {
    host: 'localhost',
    dialect:'postgres'
  });
  let newvoteModel=null;
  const connectionVote=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newvoteModel=await voteModel(sequelize);
        await sequelize.sync();
        console.log("Database created status");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {
    connectionVote,
    newvoteModel,
  }
  