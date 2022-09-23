import bcrypt from "bcrypt";

export default (candidatePassword: string, dbPassword: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, dbPassword, function (err, isMatch) {
      if (err) {
        return reject(err);
      }
      resolve(isMatch);
    });
  });
};
