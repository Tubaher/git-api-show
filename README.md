<!-- include all the steps needed to install and start the project -->

# Installation

1. Make sure you have [pnpm](https://pnpm.io/installation) installed
2. Make sure you have node version 18.17.1 installed
3. Clone the Github repository
4. Install dependencies:

```sh
pnpm install
```

5. Optional. You can provide a custom port for the server to run on by creating a `.env` file in the root of the project and adding the following line:

```sh
PORT=3001 # or any other port you want, the default is 3001
```

6. Start the server:

```sh
pnpm start
```

# Usage

7. The API is now running on `http://localhost:3001` (or whatever port you specified in step 4)

8. Now you can interact with the API from the [frontend UI](https://github.com/Tubaher/show-commits-ui).

9. The API documentation is available at `http://localhost:3001/api`

# Tips

- You can use tools like `fnm`or `nvm` to manage your node versions, here I provided a `nvmrc` file with the node version used in this project.
- You can run `pnpm run dev` to start the server in development mode. This will automatically restart the server when you make changes to the code.
- You can run `pnpm run lint` to lint the code.
- You can run `pnpm run test` to run the tests.
- You can run `pnpm run test:e2e` to run the e2e tests.
- You can run `pnpm run build` to build the project.
