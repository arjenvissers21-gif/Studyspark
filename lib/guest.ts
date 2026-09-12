import { prisma } from "./prisma";

const GUEST_EMAIL = "guest@studyspark.local";

export async function getGuestUser() {
  return prisma.user.upsert({
    where: { email: GUEST_EMAIL },
    update: {},
    create: {
      name: "StudySpark gebruiker",
      email: GUEST_EMAIL,
      progress: { create: {} },
    },
    include: { progress: true },
  });
}
