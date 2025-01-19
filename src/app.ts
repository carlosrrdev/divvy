import "./style.css";
import Alpine from "alpinejs"
import focus from '@alpinejs/focus'
import {divvyStore} from "./stores/divvyStore.ts";
import {modalStore} from "./stores/modalStore.ts";

Alpine.store('dvStore', divvyStore);
Alpine.store('modalStore', modalStore);

Alpine.plugin(focus)
window.Alpine = Alpine;

Alpine.start();