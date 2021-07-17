import * as dotenv from 'dotenv';

dotenv.config()

export const port: number = parseInt(process.env.PORT as string, 10)