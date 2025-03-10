const dotenv = require('dotenv');
const result = dotenv.config({ debug: true });

if (result.error) {
  throw result.error;
}

console.log(result.parsed);
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
