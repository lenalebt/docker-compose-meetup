# Customer service
This service will just use the [faker](https://www.npmjs.com/package/faker.js) library to return a mocked customer.
For this you need to call [http://localhost:3000/customer](http://localhost:3000/customer) when running locally.

## Development commands

The following commands are supported:
- **npm run dev** - run the application locally in dev mode. It will be restarted when there are changes in the folder
- **npm start** - start the server once (used inside of docker)
- **npm run build** - builds a docker container name "customer-service"
