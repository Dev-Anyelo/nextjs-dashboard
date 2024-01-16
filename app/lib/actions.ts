// Todas las funciones que se exortan desde este archivo son acciones que solo
//se ejecutan en el servidor.

'use server';

import { z } from 'zod';
import { Invoice } from './definitions';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Define a schema for the form data ⬇️
const invoiceSchema = z.object({
  customerId: z.string(),
  amount: z.coerce.number(),
  date: z.string(),
  status: z.enum(['pending', 'paid']),
});

// Create a subschema for the create form
const invoiceStatusSchema = invoiceSchema.omit({ id: true, date: true });

// Create a subschema for the update form
const UpdateInvoice = invoiceSchema.omit({ id: true, date: true });

// Create Invoice
export async function createInvoice(formData: FormData) {
  console.log('Creating invoice...', formData);

  const { customerId, amount, status } = invoiceStatusSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // Convert the amount to cents
  const amountInCents = amount * 100;

  //date iso string 2023-12-25 <---
  const [date] = new Date().toISOString().split('T');

  // console.log({
  //   customerId,
  //   amount: amountInCents,
  //   status,
  //   date,
  // });

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

//Update Invoice
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Delete Invoice
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}
