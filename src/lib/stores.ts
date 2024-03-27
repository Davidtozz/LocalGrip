import { writable } from "svelte/store";
import type { z } from "zod";
import type { MenuItemSchema } from "./formSchemas";

function _menuStore() {
  const { subscribe, set, update } = writable<z.infer<MenuItemSchema>[]>([]);

  return {
    /**
     * Method to subscribe to changes in the store.
     */
    subscribe,
    set,
    /**
     * Method to add an item to the store.
     * @param {z.infer<MenuItemSchema>} item - The item to add.
     */
    add: (item: z.infer<MenuItemSchema>) => update((items) => [...items, item]),

    /**
     * Method to remove an item from the store by name.
     * @param {string} name - The name of the item to remove.
     */
    remove: (name: string) =>
      update((items) => items.filter((item) => item.name !== name)),

    /**
     * Clear all items from the store.
     */
    clear: () => set([]),
  };
}

export const menuStore = _menuStore();
