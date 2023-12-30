import {store} from "./store.js";

// DEV: console log whenever state changes
store.subscribe((state) => console.log("State updated: ", state))