import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import debugModule from 'debug';

import { port } from './config';
import { movieRouter } from './movies/movie.router';
import { clasificationRouter } from './clasifications/clasification.router';

const log = debugModule('app:server')
const app = express();

//Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/movies', movieRouter)
app.use('/api/clasifications', clasificationRouter)

app.listen(port, () => {
  log(`http://localhost:${port}`);
})