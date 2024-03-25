import type { LayoutServerLoad } from "./$types";

//@ts-expect-error jhfkjhkds
export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user,
  };
};
