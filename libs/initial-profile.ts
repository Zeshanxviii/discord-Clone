// import { auth, clerkClient } from '@clerk/nextjs/server';
// import { db } from './db';

// export default async function Page() {
//   const { userId, redirectToSignIn } = await auth();

//   if (!userId) return redirectToSignIn();

//   const profile = await db.profile.findUnique({
//     where: { userId }
//   });

//   if (profile) return profile;

//   // ✅ Fetch full user info from Clerk
//   const user = await clerkClient.users.getUser(userId);

//   const newProfile = await db.profile.create({
//     data: {
//       userId,
//       name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
//       imageUrl: user.imageUrl,
//       email: user.emailAddresses[0].emailAddress
//     }
//   });

//   return newProfile;
// }
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { db } from './db';

export default async function Page() {
  const { userId,redirectToSignIn } = await auth();

  if (!userId) {
    redirectToSignIn();
  }

  const profile = await db.profile.findUnique({ where: { userId } });

  if (profile) return profile;

  const user = await clerkClient.users.getUser(userId!);

  const newProfile = await db.profile.create({
    data: {
      userId,
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  });

  return newProfile;
}


