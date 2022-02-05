import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import qs from 'qs';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';

const PostListContainer = () => {
  const { username } = useParams();
  const queryString = useLocation().search;
  const { tag, page } = qs.parse(queryString, {
    ignoreQueryPrefix: true,
  });
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading[`posts/LIST_POSTS`],
      user: user.user,
    }),
  );

  useEffect(() => {
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, tag, page, username]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;
