import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../index';

export interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
  is_deleted: boolean;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'is_deleted'> {}

export const UserModel = sequelize.define<
  Model<UserAttributes, UserCreationAttributes>
>(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 130,
        min: 4,
      },
    },
  },
  {
    timestamps: false,
    tableName: 'Users',
  }
);
