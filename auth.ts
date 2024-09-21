import { PrismaAdapter } from "@auth/prisma-adapter";
import nextAuth from "next-auth";

import authConfig from "./auth.config";
import { prisma } from "./src/utils/prismaMain";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = nextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
});
