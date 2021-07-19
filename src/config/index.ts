import * as dotenv from 'dotenv';

dotenv.config()

export const port: number = parseInt(process.env.PORT as string, 10)
export const dbUser: string = process.env.DB_USER || 'root';
export const dbPassword: string = process.env.DB_PASSWORD || 'root';
export const dbHost: string = process.env.DB_HOST || 'localhost';
export const dbPort: string | undefined = process.env.DB_PORT;
export const dbName: string = process.env.DB_NAME || 'test';