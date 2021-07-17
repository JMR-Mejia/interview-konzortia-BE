import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import debugModule from 'debug';

import { port } from './config';

const log = debugModule('app:server')
const app = express();

//Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  log(`http://localhost:${port}`);
})