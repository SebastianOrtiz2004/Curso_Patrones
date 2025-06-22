const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0);

  return likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const favorite = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max;
  }, blogs[0]);

  return favorite;
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCount = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1;
    return count;
  }, {});

  const mostBlogsAuthor = Object.entries(authorCount).reduce((max, [author, count]) => {
    return count > max.blogs ? { author, blogs: count } : max;
  }, { author: null, blogs: 0 });

  return mostBlogsAuthor;
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorCount = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + blog.likes;
    return count;
  }, {});

  const mostLikesAuthor = Object.entries(authorCount).reduce((max, [author, count]) => {
    return count > max.likes ? { author, likes: count } : max;
  }, { author: null, likes: 0 });

  return mostLikesAuthor;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}