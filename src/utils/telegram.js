const tg = window.Telegram.WebApp;

export const getUserData = () => {
  if (tg.initDataUnsafe?.user) {
    return {
      firstName: tg.initDataUnsafe.user.first_name,
      lastName: tg.initDataUnsafe.user.last_name,
      username: tg.initDataUnsafe.user.username,
      photoUrl: tg.initDataUnsafe.user.photo_url,
    };
  }
  return null;
};
