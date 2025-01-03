const tg = window.Telegram.WebApp;

export const getUserData = () => {
  console.log("Telegram WebApp:", tg);
  console.log("InitDataUnsafe:", tg.initDataUnsafe);

  if (tg.initDataUnsafe?.user) {
    const userData = {
      firstName: tg.initDataUnsafe.user.first_name,
      lastName: tg.initDataUnsafe.user.last_name,
      username: tg.initDataUnsafe.user.username,
      photoUrl: tg.initDataUnsafe.user.photo_url,
    };
    console.log("User Data:", userData);
    return userData;
  }
  return null;
};
