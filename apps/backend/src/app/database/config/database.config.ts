import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    uri: process.env.MONGO_URI || null,
    mock: process.env.MONGO_MOCK || false,
  };
});
