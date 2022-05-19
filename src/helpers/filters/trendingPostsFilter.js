export const trendingPostsFilter = (posts) => {
  let tempPosts = [...posts];
  tempPosts = tempPosts.sort((a, b) => {
    return b.likes.length - a.likes.length
  });
  console.log("tredning filter posts",tempPosts);
  return tempPosts;
} 