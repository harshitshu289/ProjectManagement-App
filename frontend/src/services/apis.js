
export const PROJECTS_API = {
  CREATE: "/projects",
  GET_ALL: "/projects",
  DELETE: (id) => `/projects/${id}`,
};

export const AUTH_API = {
  REGISTER: "/auth/register",
  VERIFY_OTP: "/auth/verify-otp",
  LOGIN: "/auth/login",
};

export const TICKETS_API = {
  CREATE: "/tickets",
   GET_BY_PROJECT: "/tickets", // with query param ?projectId=
  DELETE: (id) => `/tickets/${id}`,
  GET_ALL: "/tickets", // use query params for filtering
  UPDATE: (id) => `/tickets/${id}`,
};
export const COMMENTS_API = {
  GET_BY_TICKET: (ticketId) => `/comments/${ticketId}`,
  CREATE: "/comments",
   DELETE: (commentId) => `/comments/${commentId}`,
};
