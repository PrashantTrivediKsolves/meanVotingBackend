import { DataTypes } from "sequelize";
export const voteModel = async (sequelize) => {
    const vote = sequelize.define('vote', {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        candidateId: {
          type:DataTypes.UUID,
          defaultValue:DataTypes.UUIDV4,
        },
        userId:{
          type:DataTypes.UUID,
          defaultValue:DataTypes.UUIDV4,
        },
    });
    return vote;
}

