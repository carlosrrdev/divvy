import "./style.css";
import Alpine from "alpinejs"
import focus from '@alpinejs/focus'
import anchor from '@alpinejs/anchor';
import {divvyStore} from "./stores/divvyStore.ts";
import {modalStore} from "./stores/modalStore.ts";
import {themeStore} from "./stores/themeStore.ts";

Alpine.store('themeStore', themeStore)
Alpine.store('dvStore', divvyStore);
Alpine.store('modalStore', modalStore);

Alpine.plugin(focus)
Alpine.plugin(anchor)
window.Alpine = Alpine;

Alpine.start();