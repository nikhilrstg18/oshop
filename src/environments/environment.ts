// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyC8A7O8EeWYSyO9QgZYZ7mFMNE1-MA0afY",
    authDomain: "o-shop-e-com.firebaseapp.com",
    databaseURL: "https://o-shop-e-com.firebaseio.com",
    projectId: "o-shop-e-com",
    storageBucket: "o-shop-e-com.appspot.com",
    messagingSenderId: "566269140996"
  }
};
