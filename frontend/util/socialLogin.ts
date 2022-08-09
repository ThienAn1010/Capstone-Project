const getFacebookOAuthUrl = () => {
  const rootUrl = "https://www.facebook.com/v14.0/dialog/oauth"
  const options = {
    client_id: "945889392770900",
    redirect_uri: `${process.env.NEXT_PUBLIC_CLIENT_CALLBACK}/`,
    scope: ["public_profile", "email"].join(","),
  }
  const queryString = new URLSearchParams(options)
  return `${rootUrl}?${queryString.toString()}`
}

const getGoogleOAuthUrl = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"
  const options = {
    client_id:
      "346121408906-evbb0dn7ncjb37hcjjrtl687o8u0jq7u.apps.googleusercontent.com",
    redirect_uri: `${process.env.NEXT_PUBLIC_CLIENT_CALLBACK}/`,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  }
  const queryString = new URLSearchParams(options)
  return `${rootUrl}?${queryString.toString()}`
}

export { getFacebookOAuthUrl, getGoogleOAuthUrl }
