import dotenv from 'dotenv';
import Looger from 'bunyan';

const log = Looger.createLogger({ name: 'config' });

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public NODE_ENV: string | undefined;
  public SERVER_PORT: string | number | undefined;
  public CLIENT_URL: string | undefined;
  public JWT_TOKEN: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public SECRET_KEY_ONE: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SERVER_PORT = process.env.SERVER_PORT || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.JWT_TOKEN = process.env.JWT_TOKEN || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`The environment variable ${key} is missing`);
      }
    }
  }
}

export const config: Config = new Config();
