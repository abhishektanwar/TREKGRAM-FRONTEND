export const latestPostsFilter = (posts) => {
  let tempPosts = [...posts];
  tempPosts = tempPosts.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return tempPosts;
};
