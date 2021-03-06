const fs = require("fs");

class UserRepository {
  constructor() {
    const file = fs.readFileSync("./data.json");
    this.data = JSON.parse(file);
  }

  // return all users
  get all() {
    return this.data;
  }

  // return all users who are admins
  get admins() {
    return this.data.filter(user => user.admin);
  }

  // return all users who are admins that are older than 60 years old
  get seniorAdmins() {
    return this.data.filter(user => user.admin && user.age > 60);

  }

  // find all uses who has duplicate emails
  // expected result:
  // { "kip@auer.com": [ 3300, 3400, 5800 ], "nat.moen@treutelvandervort.co": [ 6800, 9500 ] }
  get duplicates() {
    const duplicates = {};
    this.data.forEach(user => {
      if (duplicates[user.email]) {
        duplicates[user.email].push(user.id);
      } else {
        duplicates[user.email] = [user.id];
      }
    });
    
    Object.entries(duplicates).forEach(([key, value]) => {
      if (value.length > 1) {
        duplicates[key] = value;
      } else {
        delete duplicates[key];
      }
    });

    return duplicates;
  }
}

function run() {
  console.log("User repository challenge.\n");

  const repo = new UserRepository();

  console.log(repo.all.length == 200 ? "UserRepository#all Passed!" : "UserRepository#all Failed!")
  console.log(repo.admins.length == 66 ? "UserRepository#admins Passed!" : "UserRepository#admins Failed!")
  console.log(repo.seniorAdmins.length == 10 ? "UserRepository#seniorAdmins Passed!" : "UserRepository#seniorAdmins Failed!")

  console.log(repo.duplicates);
}

run();
