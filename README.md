# Paths Viewer

This repository contains material related to visualization interface for objects tracemaps analysis.

<img src="https://user-images.githubusercontent.com/20072456/175796510-af798420-bac5-46a0-bf79-03f862fcc069.png" alt="Paths Viewer - Home screen" width="40%" />

It has two operation modes:

1. post events: process CSV files with spatial time data and;
<img src="https://user-images.githubusercontent.com/20072456/175796518-c275846a-6c61-4a86-b41f-b87bfe173e66.png" alt="Paths Viewer - Post Events Mode with selected files" width="40%" />
2. real time: directly communicates with the object to record its geolocation data.
<img src="https://user-images.githubusercontent.com/20072456/175796516-6a30624a-77b6-495a-9646-4ebddd3107a8.png" alt="Paths Viewer - Real Time Mode" width="40%" />

Both operation modes share objects visualization over a 2D map. It can be used by any researcher that needs tracemaps visualization.
<img src="https://user-images.githubusercontent.com/20072456/175796520-0dbb2ee5-cba2-4d60-b41a-fa3059da2736.png" alt="Paths Viewer - Rome" width="40%" />

It is being developed as a Course Final Work for the Undergraduation of William Quintas, oriented by [Prof. Dr. Christian Rothenberg](https://www.dca.fee.unicamp.br/~chesteve/).

# Dependencies

- [Typescript 4.6.4](https://www.npmjs.com/package/typescript/v/4.6.4)
- [React 18.1.0](https://www.npmjs.com/package/react/v/18.1.0)
- [Next 12.1.6](https://nextjs.org/)
- [ReduxJS Toolkit 1.8.2](https://www.npmjs.com/package/@reduxjs/toolkit/v/1.8.2)
- [Google Maps React Wrapper 1.1.33](https://developers.google.com/maps/documentation/javascript/react-map)
- [Firebase SDK 9.8.2](https://firebase.google.com/docs/reference/js)
- [Firebase Admin 10.2.0](https://firebase.google.com/docs/reference/admin)

# Setup

- Download and install **Node**. Recommended to use **nvm** from [here](https://github.com/nvm-sh/nvm#installing-and-updating).
  - You can follow [this tutorial](https://heynode.com/tutorial/install-nodejs-locally-nvm/) to install nvm.
  - You might make sure you have nvm and that it’s available from your command line. You can check this by simply running:
    `$ command -v nvm`
  - After that, you’ll need to make sure you install Node. You can make this by running:
    `$ nvm install --lts`
- Clone this repository.
  `$ git clone https://github.com/williamquintas/DRL-UAVs-Placer.git /path/to/repo`
- Install the dependencies.

```
cd /path/to/repo
npm install
```

# Files

This repository files are structured as follows:

```
|── components
|   |── ...
|── config
|   |── firebase.ts
|   |── firebaseClient.ts
|   |── hooks.ts
|   |── store.ts
|   |── theme.ts
|── css
|   |── index.css
|── features
|   |── sessions
|   |   |── slice.ts
|── models
|   |── ...
|── pages
|   |── api
|   |── post-events
|   |── real-time
|   |── index.tsx
|── public
|── services
|   |── SessionService.ts
|── simulations
|   |── ...
|── utils
|   |── ...
```

_TODO: describe directories purposes_

# Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run start`

Serves the built folder.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page won't reload when you make changes.\
Requires to run `npm run build` before.

# Simulations

_TODO: describe simulations and how to run it_
