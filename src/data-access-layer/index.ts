import {Sequelize} from 'sequelize';

const database = process.env.DB_DATABASE || '';
const username = process.env.DB_USERNAME || '';
const password = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize(database, username, password, {
  dialect: 'postgres',
  host: '/tmp',
});

export default sequelize;
