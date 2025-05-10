import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Neon uses self-signed certs
    },
  },
  logging: false,
});

console.log('Connecting to DB with URL:', process.env.DATABASE_URL);


export default sequelize;
