import 'dotenv/config';
import * as joi from 'joi';

interface IEnv {
  PORT: number;
  DATABASE_URL: string;
  SERVERS_NATS: string[];
  // NODE_ENV: string;
}

const envSchema = joi
  .object<IEnv>({
    PORT: joi.number().port().required(),
    DATABASE_URL: joi.string().uri().required(),
    SERVERS_NATS: joi.array().items(joi.string().uri()).required(),
    // NODE_ENV: joi.string().valid('development', 'production', 'test').required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  SERVERS_NATS: process.env.SERVERS_NATS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: IEnv = value;

export const envs: IEnv = {
  PORT: envVars.PORT,
  DATABASE_URL: envVars.DATABASE_URL,
  SERVERS_NATS: envVars.SERVERS_NATS,
  // NODE_ENV: envVars.NODE_ENV,
};
