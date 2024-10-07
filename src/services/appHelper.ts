export const USER_TOKEN = {
  set: ({ token, refreshToken }: { token: string; refreshToken: string }) => {
    console.log("Save Token " + JSON.stringify(token));
    // Save token
  },
  remove: () => {
    // Remove token
  },
  get: () => {
    // Get token
  },
};
