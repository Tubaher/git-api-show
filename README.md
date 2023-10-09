<!-- include all the steps needed to install and start the project -->

# Installation

1. Make sure you have [pnpm](https://pnpm.io/installation) installed
2. Make sure you have node version 18.17.1 installed
3. Install dependencies:

```sh
pnpm install
```

4. Optional. You can provide a custom port for the server to run on by creating a `.env` file in the root of the project and adding the following line:

```sh
PORT=3001 # or any other port you want, the default is 3001
```

5. Start the server:

```sh
pnpm start
```

6. The API is now running on `http://localhost:3001` (or whatever port you specified in step 4)

7. Now you can interact with the API from the [frontend UI](https://github.com/Tubaher/show-commits-ui).
