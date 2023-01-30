import {DataTypes, Model, Optional} from 'sequelize';
import {UserModel} from './user';
import {GroupModel} from './group';
import sequelize from '../index';

export interface UserGroupAttributes {
  id: string;
  user_id: string;
  group_id: string;
}

export interface UserGroupCreationAttributes
  extends Optional<UserGroupAttributes, 'id'> {}

const UserGroupModel = sequelize.define<
  Model<UserGroupAttributes, UserGroupCreationAttributes>
>(
  'UserGroup',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    group_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Group',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    tableName: 'user_group',
  }
);

// UserGroupModel.belongsTo(UserModel, {as: 'user', foreignKey: 'user_id'});
// UserGroupModel.belongsTo(GroupModel, {as: 'group', foreignKey: 'group_id'});

export {UserGroupModel};
