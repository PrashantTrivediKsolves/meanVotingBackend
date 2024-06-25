import { DataTypes, ENUM } from "sequelize";
import bcrypt from 'bcrypt';
export const userModel = async (sequelize) => {
    const User = sequelize.define('user', {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },

        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        age:{
          type:DataTypes.INTEGER,
          required:true
        },

        mobile:{
         type:DataTypes.STRING,
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        address:{
          type:DataTypes.STRING,
          required:true
        },

        aadharCard:{
          type:DataTypes.STRING,
          unique:true,
          required:true
        },

        password: {
            type: DataTypes.STRING,
            required:true,
            allowNull: false
        },
        isVoted:{
          type:DataTypes.BOOLEAN,
          defaultValue:false
        },
        role: {
          type: DataTypes.ENUM,
          values: [
              'voter',
              'admin',
          ],
          defaultValue: 'voter'
      }
    });
    
    User.beforeCreate(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    });

    return User;

}

