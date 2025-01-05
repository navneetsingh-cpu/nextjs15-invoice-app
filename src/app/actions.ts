"use server";

import { Invoices, Status } from "@/db/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export async function createAction(formData: FormData) {
    const { userId } = await auth();
    const value = Math.floor(parseFloat(String(formData.get('value'))) * 100);
    const description = formData.get('description') as string;

    if (!userId) {
        return; // Disable for unauthroized users
    }
    const results = await db.insert(Invoices).values({
        value,
        description,
        userId,
        status: 'open',
    }).returning({ id: Invoices.id });

    redirect(`/invoices/${results[0].id}`);
}

export async function updateStatusAction(formData: FormData) {
    const { userId } = await auth();
    if (!userId) {
        return; // Disable for unauthroized users
    }

    const id = parseInt(formData.get('id') as string);
    const status = formData.get('status') as Status;

    await db.update(Invoices)
        .set({ status })
        .where(and(eq(Invoices.id, id), eq(Invoices.userId, userId)))

    revalidatePath(`/invoices/${id}`, 'page');

}

export async function deleteInvoiceAction(formData: FormData) {
    const { userId } = await auth();
    if (!userId) {
        return; // Disable for unauthroized users
    }

    const id = parseInt(formData.get('id') as string);

    await db.delete(Invoices)
        .where(and(eq(Invoices.id, id), eq(Invoices.userId, userId)))

    redirect(`/dashboard`);

}