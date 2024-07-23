import 'dotenv/config';
import * as joi from 'joi';

interface IEnv {
  PORT: number;
  DATABASE_URL: string;
  // NODE_ENV: string;
}

const envSchema = joi
  .object<IEnv>({
    PORT: joi.number().port().required(),
    DATABASE_URL: joi.string().uri().required(),
    // NODE_ENV: joi.string().valid('development', 'production', 'test').required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: IEnv = value;

export const envs: IEnv = {
  PORT: envVars.PORT,
  DATABASE_URL: envVars.DATABASE_URL,
  // NODE_ENV: envVars.NODE_ENV,
};
