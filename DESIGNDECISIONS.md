# Design decisions

- Take a newline json
- Process the json into data / javascript object
- Display the information in a tabular format
- Add sort functionality: by time + sensor type
- Add filter functionality: name + type

I will split the code into 2 sections, the backend that deals with the data and the frontend that requests the data from the BE in segments and then displays it.

- Plan to use typescript instead of vanilla javascript and ES6+ features, like async/await.
- Probably will need to enable CORS.
- I want to use yarn as the package manager
- Consistent coding styles -> editor config, linters and prettier
- Docker-compose (if time)
- Helmet for HTTP headers (if needed)
- .env via dotenv i.e. for config, secrets etc
- request validation with joi
- linting and prettier
- unit testing
- code coverage if time
- (husky) git hooks (probably not necessary for this project)
- Auth with passport (if there is time)
- Logging with morgan (not really required)
- API doc auto generation, though there's only going to be one route
- CI/CD, this will not be needed, as only plan to use it locally myself
- React: frontend framework to easily deliver components and re-usable code
- Bootstrap: common and easy to use css library/framework
- Next> no SSR required
- Tests with jest or mocha+chai

> Time capped to 2 hours and 10 minutes for notes.

## Mono repo idea

As this is just a code challenge, I won't focus on the architecture or splitting the code too much.

### Directory structure and descriptions

```typescript
frontend/ // Create React Typescript Application
data/     // Data file (newline delimiter (nd) json)
backend/  // Node Typescript API with 2 routes `/` and `/api/sensor`
```

## Backend / API

Reads data from a json file and then processes it / serves it to the FE application.

Will need to decide whether the data needs any normalising or sorting etc before serving to the FE.

> Route: "/api/sensor" e.g. "http://localhost:5000/api/sensor"

### Technologies and Libraries

- Typescript
- Node
- Express
- Rest API
- Express
- Jest

### BE rough step by step guide

1. yarn init
2. yarn add -D express
3. yarn add -D typescript ts-node
4. yarn add -D @types/node @types/express
5. yard add -D nodemon
6. yarn add -D jest @types/jest ts-jest
7. yarn tsc --init --rootDir src --outDir dist
8. add script to transpile code in package.json
9. add the data folder and data/json to project
10. add server
11. add method to parse json
12. add logic to process data if applicable
13. add tests (or ttd) and check for edge cases, missing data etc
14. test with postman
15. if time, add some sort of security or authentication

### Post thoughts on Backend/API

Wanted to add more complete tests and look at edge cases.

The data file is quite lengthy, so would have liked to processed it in some sort of way, perhaps aggregate the data or use streams/pipes to chunkify the responses. I think the request takes 4 seconds, which is too long.

### BE directory structure and descriptions

```typescript
dist/                   // distribution folder for the app
node_modules/           // npm/yarn modules
src/                    // source folder
-- data/                // data
-- handlers/            // controllers/logic that handles the requests for the api
-- config/              // all application config files --removed
-- models/              // data processing for the json file
-- types/               // typings for any methods
-- app.ts               // instantiate application and register all routes
-- index.ts             // entry point for the package manager
-- server.ts            // express server config
-- json-leader.d.ts     // instantiate application and register all routes
test/                   // test files
-- .eslintrc.yaml       // config file for lint
-- jest.config.js       // config file for jest
-- packages.json        // application definition file
-- tsconfig.json        // config file for typescript
-- .env                 // configuration file holding secrets
-- .gitignore           // files to be ignored by git
```

## Frontend / Client

This will be a create react app and bootstrap FE with typescript.

The aim here is just to create a few components that can take the data from the API and display it in a table:

- Display data in a table
- Table to sort data by time and sensor type
- Table to filter data by sensor type/name
- Table to have pagination

So we will have a layout and dataTable related components.

The layout will just have the header and basic functionality.

The DataTable component will be split into multiple components for:

- Table Header,
- Table Body,
- Table Pagination
- and Table Search.

I will use an dataTable/index file to bring all this together so the `app.tsx` can just import this.

The `index.ts` file will include any processing of the api response and respective table logic (sorting, searching and number of items to show).

The `apiClient.ts` will be an adapter for the API and will just make a get request to get a JSON response.

> Route: "/" e.g. "http://localhost:3000/"

### Requirements

- Typescript `3.8` as type imports required for react bootstrap.

### Libraries

- Axios: for the API fetch
- Dotenv: for the environment/config file
- React: frontend framework to render views
- Typescript: strong typed language on top of javascript
- Jest: for unit testing
- React-Bootstrap: library/module for styled components
- FontAwesome: library/module for styled icons

### FE rough step by step guide

1. yarn init
2. git init
3. create react app typescript starter
4. add api client/adapter
5. add Env service for accessing secrets from .env
6. add bootstrap
7. update `app.tsx` with basic layout using bootstrap
8. add bootstrap table to `dataTable/index`
9. add the apiClient to the `dataTable/index`
10. display all the data in the bootstrap table
11. refactor the bootstrap table into the respective components
12. add pagination functionality
13. add search functionality
14. add sort functionality
15. add simple unit tests
16. check for edge cases
17. design and implement secondary requirements

### FE directory structure and descriptions

```typescript
dist/                   // distribution folder for the app
public/                 // any files that are accessible to the app when its running
node_modules/           // npm/yarn modules
src/                    // source folder
-- api/                 // adapter for the API
-- components/          // react components
-- --/DataTable         // data table components
-- --/Layout            // layout related components
-- --/sensorReadings    // basic display all data component
-- helpers/             // any random logic files that could be shared
-- services/            // logic files that provide some sort of service, e.g. provide secrets
-- types/               // typings for any methods
-- app.tsx              // instantiate react application
-- index.tsx            // entry point for the package manager
-- app.css              // app styling
-- index.css            // global styling (fonts, colours)
-- react-app-env.d.ts   // react app typings
-- serverWorker.ts      // standard react app serviceWorker
-- setupTests.ts        // config for tests
-- tests/               // test files
-- .eslintrc.yaml       // config file for lint
-- jest.config.js       // config file for jest
environment.d.ts        // typings for environment/secrets file
packages.json           // application definition file
tsconfig.json           // config file for typescript
-- .env                 // configuration file holding secrets
.gitignore              // files to be ignored by git
```

### Post thoughts on FE/Client

Wanted to add tests and look at edge cases, for example:

- Edge case

Add more efficient solution for styling and sorting. Aggregate data and move logic to backend to reduce code on the app.

Docker-compose the app so easier to start.

## Overall post thoughts

- wanted to add more tests
- wanted to add docker
- wanted to add script to make it easier to launch, i.e. make file
- optimise react with pure components and immutable data structures
- take out any unnecessary source code (tree shaking)
- minify with webpack or some sort of code splitting (maybe react-loadable)
- check the chrome dev tools for wasted renders or bottlenecks
- implement a pre-fetch and make data server side
- styling, better contrast and visual cues for sorting and table features
- show or hide columns: will save space and better responsiveness
- implement `react-table`: regularly updated and very lightweight
