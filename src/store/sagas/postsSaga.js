import { takeEvery, take, call, put, fork } from 'redux-saga/effects';

import {
  GET_POST_REQUEST,
  GET_POSTS_REQUEST,
  LIKE_POST_REQUEST,
  DELETE_POST_REQUEST,
  CREATE_POST_REQUEST,
  EDIT_POST_REQUEST,
  CREATE_COMMENT_REQUEST,
  DELETE_COMMENT_REQUEST,
} from '../actions/types';

import {
  getPostSuccess,
  getPostError,
  getPostsSuccess,
  getPostsError,
  likePostSuccess,
  likePostError,
  deletePostSuccess,
  deletePostError,
  createPostSuccess,
  createPostError,
  editPostSuccess,
  editPostError,
  createCommentSuccess,
  createCommentError,
  deleteCommentSuccess,
  deleteCommentError,
} from '../actions/posts';

import {
  getPostByIdService,
  getPostsService,
  likePostService,
  deletePostService,
  createPostService,
  editPostService,
  createCommentService,
  deleteCommentService,
} from '../../services/api';

// GET POSTS
function* getPosts() {
  try {
    const response = yield call(getPostsService);
    yield put(getPostsSuccess(response.data.posts));
  } catch (error) {
    yield put(getPostsError());
  }
}

function* watchGetPosts() {
  yield takeEvery(GET_POSTS_REQUEST, getPosts);
}

// GET POST BY ID
function* getPost(action) {
  const { postId } = action.payload;
  try {
    const response = yield call(getPostByIdService, {
      postId,
    });
    yield put(getPostSuccess(response.data.post));
  } catch (error) {
    yield put(getPostError());
  }
}

function* watchGetPost() {
  yield takeEvery(GET_POST_REQUEST, getPost);
}

// LIKE POST
function* likePost(action) {
  const { postId, likeType } = action.payload;
  try {
    const response = yield call(likePostService, {
      postId,
      likeType,
    });
    yield put(likePostSuccess(response.data.post));
  } catch (error) {
    yield put(likePostError());
  }
}

function* watchLikePost() {
  while (true) {
    const action = yield take(LIKE_POST_REQUEST);
    yield call(likePost, action);
  }
}

// DELETE POST
function* deletePost(action) {
  const { postId } = action.payload;
  try {
    yield call(deletePostService, {
      postId,
    });
    yield put(deletePostSuccess(postId));
  } catch (error) {
    yield put(deletePostError());
  }
}

function* watchDeletePost() {
  while (true) {
    const action = yield take(DELETE_POST_REQUEST);
    yield call(deletePost, action);
  }
}

// CREATE POST
function* createPost(action) {
  const { text } = action.payload;
  try {
    const response = yield call(createPostService, {
      text,
    });
    yield put(createPostSuccess(response.data.post));
  } catch (error) {
    yield put(createPostError());
  }
}

function* watchCreatePost() {
  while (true) {
    const action = yield take(CREATE_POST_REQUEST);
    yield call(createPost, action);
  }
}

// EDIT POST
function* editPost(action) {
  const { postId, text } = action.payload;
  try {
    const response = yield call(editPostService, {
      postId,
      text,
    });
    yield put(editPostSuccess(response.data.post));
  } catch (error) {
    yield put(editPostError());
  }
}

function* watchEditPost() {
  while (true) {
    const action = yield take(EDIT_POST_REQUEST);
    yield call(editPost, action);
  }
}

// CREATE COMMENT
function* createComment(action) {
  const { postId, text } = action.payload;
  try {
    const response = yield call(createCommentService, {
      postId,
      text,
    });
    yield put(createCommentSuccess(response.data.comments));
  } catch (error) {
    yield put(createCommentError());
  }
}

function* watchCreateComment() {
  while (true) {
    const action = yield take(CREATE_COMMENT_REQUEST);
    yield call(createComment, action);
  }
}

// DELETE COMMENT
function* deleteComment(action) {
  const { postId, commentId } = action.payload;
  try {
    yield call(deleteCommentService, {
      postId,
      commentId,
    });
    yield put(deleteCommentSuccess(commentId));
  } catch (error) {
    yield put(deleteCommentError());
  }
}

function* watchDeleteComment() {
  while (true) {
    const action = yield take(DELETE_COMMENT_REQUEST);
    yield call(deleteComment, action);
  }
}

// WATCHERS EXPORT
const postsSaga = [
  fork(watchGetPost),
  fork(watchGetPosts),
  fork(watchLikePost),
  fork(watchDeletePost),
  fork(watchCreatePost),
  fork(watchEditPost),
  fork(watchCreateComment),
  fork(watchDeleteComment),
];

export default postsSaga;
