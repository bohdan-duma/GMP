import {Sequelize, DataTypes} from 'sequelize';

const sequelize = new Sequelize('GMP', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: '/tmp',
});

export default sequelize;
