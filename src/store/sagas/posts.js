import { takeEvery, takeLatest, call, put, fork, take } from 'redux-saga/effects';
import { GET_POSTS_REQUEST, DELETE_POST_REQUEST, CREATE_POST_REQUEST } from '../actions/types';
import { getPostsSuccessAction, postsErrorAction } from '../actions/posts';
import * as api from '../../services/api/posts';

// GET POSTS
function* getPosts() {
  try {
    const response = yield call(api.getPosts);
    // eslint-disable-next-line no-console
    console.log('[GET POSTS SAGA - API RESPONSE]', response);
    yield put(getPostsSuccessAction(response.data));
  } catch (error) {
    yield put(postsErrorAction('An error occurred when trying to get all the posts.'));
  }
}

function* watchGetPostsRequest() {
  yield takeEvery(GET_POSTS_REQUEST, getPosts);
}

// CREATE POST
function* createPost(action) {
  try {
    const response = yield call(api.createPost, {
      title: action.payload.title,
      body: action.payload.body,
    });
    // eslint-disable-next-line no-console
    console.log('[CREATE POST SAGA - API RESPONSE]', response);
    yield call(getPosts);
  } catch (error) {
    yield put(postsErrorAction('An error occurred when trying to create the post.'));
  }
}

function* watchCreatePostRequest() {
  yield takeLatest(CREATE_POST_REQUEST, createPost);
}

// DELETE POST
function* deletePost(postId) {
  try {
    const response = yield call(api.deletePost, postId);
    // eslint-disable-next-line no-console
    console.log('[DELETE POST SAGA - API RESPONSE]', response);
    yield call(getPosts);
  } catch (error) {
    yield put(postsErrorAction('An error occurred when trying to delete the post.'));
  }
}

function* watchDeletePostRequest() {
  while (true) {
    const action = yield take(DELETE_POST_REQUEST);
    yield call(deletePost, action.payload.postId);
  }
}

// WATCHERS EXPORT
const postsSagas = [
  fork(watchGetPostsRequest),
  fork(watchDeletePostRequest),
  fork(watchCreatePostRequest),
];

export default postsSagas;
