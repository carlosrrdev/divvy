import Alpine from 'alpinejs';
import {DivvyStore} from './stores/divvyStore';
import {ModalStore} from './stores/modalStore';

declare global {
  interface AlpineStores {
    modalStore: ModalStore;
    divvyStore: DivvyStore;
  }
}

declare module 'alpinejs' {
  interface Alpine {
    store<T extends keyof AlpineStores>(store: T): AlpineStores[T];
  }
}