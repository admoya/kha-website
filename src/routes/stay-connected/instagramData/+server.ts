import { json, error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { INSTAGRAM_TOKEN } from "$env/static/private";
import type Post from "$lib/components/InstagramPreview.svelte";

const instagramUrl = "https://graph.instagram.com/me/media?";
const fields = "caption,media_url,username,permalink,media_type,thumbnail_url";
const limit = "6";
const characterLimit = 75;

export const GET: RequestHandler = async () => {
  let posts: Post[];
  try {
    const response = await fetch(
      instagramUrl +
        new URLSearchParams({
          fields: fields,
          limit: limit,
          access_token: INSTAGRAM_TOKEN,
        })
    );
    const responseJson = await response.json();
    posts = responseJson.data;
    return json(truncateCaptions(posts));
  } catch (err: any) {
    console.error(`error in load function calling instagram api: ${err}`);
    return error(500, err.message);
  }
};

function truncateCaptions(posts: Post[]) {
  for (var post of posts) {
    if (post.caption && post.caption.length > characterLimit) {
      post.caption = post.caption.substring(0, characterLimit) + '...';
    }
  }
  return posts;
}