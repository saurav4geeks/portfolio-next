// Generate the admin password hash for ADMIN_PASSWORD_HASH.
// Usage: node scripts/hash-password.mjs "your-password"
//
// Output is the bcrypt hash, base64-encoded. We base64 it so the `$`
// characters in a bcrypt hash aren't mangled by dotenv variable expansion in
// local .env files. The app decodes it automatically (see src/lib/admin-auth.ts).
import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your-password"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
const encoded = Buffer.from(hash, "utf8").toString("base64");
console.log("\nADMIN_PASSWORD_HASH=" + encoded + "\n");
