import {DataTypes, Model, Optional} from 'sequelize';
import {PERMISSIONS, permissionsEnum} from '../constants/permissions';
import sequelize from '../index';
import {UserGroupModel} from './user-group';

export interface GroupAttributes {
  id: string;
  name: string;
  permissions: permissionsEnum[];
}

export interface GroupCreationAttributes
  extends Optional<GroupAttributes, 'id'> {}

const GroupModel = sequelize.define<
  Model<GroupAttributes, GroupCreationAttributes>
>(
  'Group',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM({
          values: PERMISSIONS,
        })
      ),
    },
  },
  {
    timestamps: false,
    tableName: 'groups',
  }
);

GroupModel.hasMany(UserGroupModel, {as: 'group_users', foreignKey: 'group_id'});

export {GroupModel};
