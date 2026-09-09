'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(prevState: string | undefined,formData: FormData ) {
    try{
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        const session = await auth();

        if (session?.user.role === "admin") {
            redirect("/dashboard");
        }else{
            redirect("/tickets");
        }
    } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}