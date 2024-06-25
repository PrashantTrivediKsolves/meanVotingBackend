import { DataTypes } from "sequelize";
export const candidateModel = async (sequelize) => {
    const candidate = sequelize.define('candidate', {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        image:{
            type:DataTypes.STRING,
        },
        party:{
          type:DataTypes.STRING,
          required:true
        },
        age:{
         type:DataTypes.INTEGER
        },
    });
    return candidate;
}

