import bcrypt from "bcrypt";

export default (password: string) => {
  const SALT_WORK_FACTOR = 10;

  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return reject(err);
  
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  }) 
};
