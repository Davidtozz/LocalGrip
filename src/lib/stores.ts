import { writable } from "svelte/store";
import type { z } from "zod";
import type { MenuItemSchema } from "./formSchemas";

export const menuStore = writable<z.infer<MenuItemSchema>[]>();