import "./style.css";
import Alpine from "alpinejs"
import focus from '@alpinejs/focus'
import {divvyStore} from "./stores/divvyStore.ts";

Alpine.store('dvStore', divvyStore);

Alpine.plugin(focus)
window.Alpine = Alpine;

Alpine.start();