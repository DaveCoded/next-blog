// Match /blog/post-name but not /blog
// * /blog/ does match, but is not an issue as the browser changes it to /blog automagically
export const isBlogPostRoute = (route: string) => /\/blog\//.test(route)
