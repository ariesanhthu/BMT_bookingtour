// 'use server'

// import { checkRole } from '@/utils/roles'
// import { clerkClient } from '@clerk/nextjs/server'

// export async function setRole(formData: FormData) {
//   const client = await clerkClient()

//   // Check that the user trying to set the role is an admin
//   if (!checkRole('admin')) {
//     return { message: 'Not Authorized' }
//   }

//   try {
//     const res = await client.users.updateUserMetadata(formData.get('id') as string, {
//       publicMetadata: { role: formData.get('role') },
//     })
//     return { message: res.publicMetadata }
//   } catch (err) {
//     return { message: err }
//   }
// }

// export async function removeRole(formData: FormData) {
//   const client = await clerkClient()

//   try {
//     const res = await client.users.updateUserMetadata(formData.get('id') as string, {
//       publicMetadata: { role: null },
//     })
//     return { message: res.publicMetadata }
//   } catch (err) {
//     return { message: err }
//   }
// }
"use server";

import { checkRole } from '@/utils/roles';
import { clerkClient } from '@clerk/nextjs/server';

export async function setRole(formData: FormData): Promise<void> {
  const client = await clerkClient();

  // Check that the user trying to set the role is an admin
  if (!checkRole('admin')) {
    // Instead of returning a message, throw an error to indicate unauthorized access.
    throw new Error("Not Authorized");
  }

  try {
    await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: { role: formData.get('role') },
    });
    // Return nothing
  } catch (err) {
    // Throw the error so that it can be handled by the caller
    throw new Error(`Error updating user metadata: ${err}`);
  }
}

export async function removeRole(formData: FormData): Promise<void> {
  const client = await clerkClient();

  try {
    await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: { role: null },
    });
    // Return nothing
  } catch (err) {
    throw new Error(`Error removing role: ${err}`);
  }
}
