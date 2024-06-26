import { Sequelize } from "sequelize";
import { candidateModel } from "../models/candidate.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);
  let newcandidateModel=null;
  const connectionCandidate=async()=>
  {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        newcandidateModel=await candidateModel(sequelize);
        await sequelize.sync();
        console.log("Database created status");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  export {
    connectionCandidate,
    newcandidateModel,
  }
  