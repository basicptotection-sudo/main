'use server';
/**
 * @fileOverview An email sending flow using Resend.
 *
 * - sendEmail - A function that sends an email.
 * - SendEmailInput - The input type for the sendEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Resend } from 'resend';

// IMPORTANT: This flow requires a RESEND_API_KEY environment variable to be set.
// You can get an API key from https://resend.com

const SendEmailInputSchema = z.object({
  to: z.string().email(),
  from: z.string().email(),
  subject: z.string(),
  html: z.string(),
  reply_to: z.string().email().optional(),
});
export type SendEmailInput = z.infer<typeof SendEmailInputSchema>;

export async function sendEmail(input: SendEmailInput): Promise<any> {
  return sendEmailFlow(input);
}

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailInputSchema,
    outputSchema: z.any(),
  },
  async (input) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn(
        'RESEND_API_KEY is not set. Skipping email notification, but the request was saved.'
      );
      // Log the email content for debugging purposes in case the key is missing.
      console.log('Email that would have been sent:', JSON.stringify(input, null, 2));
      // Return a success-like response to prevent the client-side form from showing an error.
      return { id: null, message: 'Email skipped due to missing API key.' };
    }
    const resend = new Resend(apiKey);

    try {
      const { data, error } = await resend.emails.send({
        from: input.from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        reply_to: input.reply_to,
      });

      if (error) {
        console.error('Resend error:', error);
        // We throw to make sure the client knows something went wrong.
        throw new Error(error.message);
      }

      return data;
    } catch (e: any) {
      console.error('Error sending email:', e.message);
      throw new Error(`Failed to send email: ${e.message}`);
    }
  }
);
