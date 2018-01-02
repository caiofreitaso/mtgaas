#MTGaaS

Magic: The Gathering as a Service

## Table of Contents
* [1. Requirements](#1-requirements)
* [2. Installation](#2-installation)
* [3. Usage](#3-usage)
* [4. Configuration](#4-configuration)
* [5. License](#5-license)

## 1. Requirements
* Node.JS
* PostgreSQL

## 2. Installation

```bash
git clone https://github.com/caiofreitaso/mtgaas.git
npm install
```

## 3. Usage

1. Set up the database

```bash
npm run migrate up
```

2. Start MTGaaS

```bash
npm start
```

## 4. Configuration

All the configuration for MTGaaS is done via environment variables.

| Variable | Default |
| `MTGAAS_PORT` | 8080 |
| `MTGAAS_POSTGRES_HOST` | `localhost` |
| `MTGAAS_POSTGRES_PORT` | `5433` |
| `MTGAAS_POSTGRES_DATABASE` | `mtgaas_dev` |
| `MTGAAS_POSTGRES_USER` | `mtgaas` |
| `MTGAAS_POSTGRES_PASSWORD` | `123456` |

## 5. License

MIT License
