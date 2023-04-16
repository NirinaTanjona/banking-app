# Banking Application - Built with Django Rest Framework
This project is a simple Banking API built with Django Rest Framework (server) and React js (client).

# Installation Steps (Linux)
To get started, clone the repository by running the following command in your terminal:

```
git clone git@github.com:NirinaTanjona/banking-app.git
```

Move to the project repository with:

```
cd banking-app
```

Some environment variables are needed to make the app run, so copy the env.template to .env:

```
cp env.template .env
```

Build the Docker image:

```
sudo docker-compose up -d --build
```

If everything worked correctly, you should be able to launch the app with:

```
sudo docker-compose up
```

You're done with the backend installation! Now let's install the UI.

You are now inside the banking-app directory.

Move to the UI folder by running:

```
cd ui
```

Copy some environment variables:

```
cp .env.development.local.sample .env.development.local
```

Install all required dependencies by running:

```
npm install
```

Alternatively, you can use Yarn:

```
yarn install
```

To run the app, execute the following command:

```
yarn start
```

Or, if you prefer using npm:

```
npm start
```

You should now be able to use the application.
