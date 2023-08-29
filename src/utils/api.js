/* eslint-disable no-underscore-dangle */
const api = (() => {
  const BASE_URL = "https://forum-api.dicoding.dev/v1";
  const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

  function putAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  function responseSuccess(data) {
    return { error: false, data, message: "success" };
  }

  function responseFailed(message) {
    return { error: true, data: null, message };
  }

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function register({ name, email, password }) {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { user },
      } = responseJson;
      return responseSuccess(user);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function login({ email, password }) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { token },
      } = responseJson;
      putAccessToken(token);
      return responseSuccess(token);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  function logout() {
    putAccessToken("");
  }

  async function getOwnProfile() {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { user },
      } = responseJson;
      return responseSuccess(user);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function getAllUsers() {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { users },
      } = responseJson;
      return responseSuccess(users);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function createThread({ title, body, category = "" }) {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          category,
        }),
      });
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { thread },
      } = responseJson;
      return responseSuccess(thread);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function getAllThreads() {
    try {
      const response = await fetch(`${BASE_URL}/threads`);
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { threads },
      } = responseJson;
      return responseSuccess(threads);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function getThreadDetail({ threadId }) {
    try {
      const response = await fetch(`${BASE_URL}/threads/${threadId}`);
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { detailThread },
      } = responseJson;
      return responseSuccess(detailThread);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function createComment({ threadId, content }) {
    try {
      const response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
          }),
        },
      );
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { comment },
      } = responseJson;
      return responseSuccess(comment);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function upVoteThread({ threadId }) {
    try {
      const response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/up-vote`,
        {
          method: "POST",
        },
      );
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { vote },
      } = responseJson;
      return responseSuccess(vote);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function downVoteThread({ threadId }) {
    try {
      const response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/down-vote`,
        {
          method: "POST",
        },
      );
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { vote },
      } = responseJson;
      return responseSuccess(vote);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function neutralVoteThread({ threadId }) {
    try {
      const response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/neutral-vote`,
        {
          method: "POST",
        },
      );
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { vote },
      } = responseJson;
      return responseSuccess(vote);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function upVoteComment({ threadId, commentId }) {
    try {
      const response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
        {
          method: "POST",
        },
      );
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { vote },
      } = responseJson;
      return responseSuccess(vote);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function downVoteComment({ threadId, commentId }) {
    try {
      const response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
        {
          method: "POST",
        },
      );
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { vote },
      } = responseJson;
      return responseSuccess(vote);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function neutralComment({ threadId, commentId }) {
    try {
      const response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
        {
          method: "POST",
        },
      );
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { vote },
      } = responseJson;
      return responseSuccess(vote);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  async function getLeaderboards() {
    try {
      const response = await fetch(`${BASE_URL}/leaderboards`);
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== "success") {
        throw new Error(message);
      }
      const {
        data: { leaderboards },
      } = responseJson;
      return responseSuccess(leaderboards);
    } catch (error) {
      return responseFailed(error.message);
    }
  }

  return {
    register,
    logout,
    login,
    getOwnProfile,
    getAllUsers,
    createThread,
    getAllThreads,
    getThreadDetail,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteComment,
    downVoteComment,
    neutralComment,
    getLeaderboards,
  };
})();

export default api;
