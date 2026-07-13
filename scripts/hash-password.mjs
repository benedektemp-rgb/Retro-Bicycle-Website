import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
const escapedForEnvFile = hash.replaceAll("$", "\\$");

console.log(`Raw hash (paste this into Vercel's Environment Variables UI):\n${hash}`);
console.log(
  `\nFor a local .env.local file, escape the $ signs so Next.js doesn't try to\n` +
    `expand them as $VAR references:\nADMIN_PASSWORD_HASH=${escapedForEnvFile}`
);
