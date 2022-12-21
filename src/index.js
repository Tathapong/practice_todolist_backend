const db = require("./models/index");
const UsernameGenerator = require("username-generator");
const bcrypt = require("bcrypt");

// async function run() {
//   for (let i = 0; i <= 1000; i++) {
//     try {
//       const username = UsernameGenerator.generateUsername();
//       const password = username;
//       const email = username + "@gmail.com";

//       const hashedPassword = await bcrypt.hash(password, 10);
//       await db.User.create({ username, password: hashedPassword, email });
//     } catch (err) {
//       continue;
//     }
//   }
// }

// run();
// console.log(generator.generate({ length: 10, numbers: true, uppercase: false }));

// console.log(UsernameGenerator.generateUsername());

// async function run() {
//     await db.User.bulkcreate([

//     ])
// }

// run();
