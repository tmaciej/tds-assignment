# TDS Recruitment Task

## General concept

The application was built based on following instructions:

> Your task is to create a simple currency conversion tool similar to that which can be found on Google.
>
> ### Currency Selection:
>
> 1. Provide two select boxes for users to choose a currency to convert from and to.
> 2. Fetch a list of currencies from the https://api.currencybeacon.com/v1/currencies API.
> 3. Populate the select boxes with the available options returned from API.
>
> ### Currency Conversion:
>
> 1. Allow users to input an amount for the “from” currency.
> 2. Fetch converted value from https://api.currencybeacon.com/v1/convert API.
> 3. Populate the “to” value based on the value returned from API.

In response a simple one screen application with currency conversion widget was created.

Application was quickly bootstraped using Next.js for routing and rendering. Libraries "shadcn/ui" and "Tailwind" were used to quickly prototype an usable UI.

Application uses Currency Beacon API to fetch list of currencies and convert between them. Currency Beacon API requires an active API key. This repository comes with an .env file with the API key provided. **This shouldn't be done in a real world project in a production environment.** Ideally the key would be masked behind a proxy API and the .env file would not be commited to the repository. If the key expires or hits requests limits please update the .env file with your own key before running the application.

Few sample unit tests were created to test the functionalities of the "CurrencySelect" component. A sample E2E tests were written using Playwright to test core functionality of converting between two currencies. No more tests were created due to the limited time spent on the task and the simplicity of the app.

## Setup

### Prerequisites

Nodejs and NPM is required to install dependencies, run the application and tests. LTS version is recommended.

### Installing dependencies

Run `npm install` command in the root directory of the project (where `package-lock.json` file is located) to install necessary dependencies.

## Running the application

### Development mode

You can use `npm run dev` command to run the application in dev mode. It will be available at `http://localhost:3000`.

### Building and running in production mode

You can build the application using `npm run build` command. This will generate build artifacts in the `./.next` directory. You can then use the `npm run start` command to run the application in production mode. It will be available at `http://localhost:3000`.

## Testing

### Prequisites

Run `npx playwright install` command in the root directory of the project to install necessary dependencies for testing.

### Running Unit tests

Use the `npm run test` command to run all unit tests.

### Running E2E tests

Use the `npm run test:e2e` command to run all E2E tests.
