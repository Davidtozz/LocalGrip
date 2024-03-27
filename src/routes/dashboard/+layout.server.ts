import type { LayoutServerLoad } from "./$types";

//@ts-expect-error jhfkjhkds
export const load: LayoutServerLoad = async ({ locals }) => {

  const { data } = await locals.supabase.storage.from('image_bucket').getPublicUrl(`${locals.user?.id}/avatar.png`);

  return {
    user: locals.user,
    data
  };
};
