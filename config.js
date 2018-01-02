'use strict';

module.exports = {
  port: parseInt(process.env.MTGAAS_PORT || 8080),
  database: {
    host: process.env.MTGAAS_POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.MTGAAS_POSTGRES_PORT || 5433),
    database: process.env.MTGAAS_POSTGRES_DATABASE || 'mtgaas_dev',
    user: process.env.MTGAAS_POSTGRES_USER || 'mtgaas',
    password: process.env.MTGAAS_POSTGRES_PASSWORD || 'd123A__b'
  }
};
