import express from 'express';
import sequelize from './config/db.js';import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;


