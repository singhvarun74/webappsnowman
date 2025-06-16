
"use server";

import { z } from "zod";
// Import Brevo SDK - uncomment after installing and setting up
// import * as Brevo from '@getbrevo/brevo';

const NewsletterSchema = z.object({
  email: z.string().email(),
});

export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const validation = NewsletterSchema.safeParse({ email });
  if (!validation.success) {
    return { success: false, message: "Invalid email address." };
  }

  // --- BREVO INTEGRATION START ---
  // TODO: Implement Brevo API call to add contact to a list
  // 1. Initialize Brevo API instance
  //    const apiInstance = new Brevo.ContactsApi();
  //    apiInstance.setApiKey(Brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY!); // Ensure BREVO_API_KEY is set in .env.local or environment variables
  //
  // 2. Prepare contact data
  //    const createContact = new Brevo.CreateContact();
  //    createContact.email = validation.data.email;
  //    createContact.listIds = [YOUR_BREVO_NEWSLETTER_LIST_ID]; // Replace with your actual Brevo list ID (number)
  //    // You can add attributes here if needed:
  //    // createContact.attributes = { "FIRSTNAME": "OptionalFirstName", "LASTNAME": "OptionalLastName" };
  //
  // 3. Make the API call
  //    try {
  //      await apiInstance.createContact(createContact);
  //      console.log('Contact added to Brevo newsletter list:', validation.data.email);
  //      return { success: true, message: "Successfully subscribed to the newsletter!" };
  //    } catch (error) {
  //      console.error('Brevo API error - subscribeToNewsletter:', error);
  //      // It's good practice to check the error structure from Brevo if you want to return specific messages
  //      return { success: false, message: "Failed to subscribe. Please try again later." };
  //    }
  // --- BREVO INTEGRATION END ---

  // Fallback: Simulate success if Brevo integration is not yet implemented
  console.log(`Subscribing ${validation.data.email} to newsletter (Brevo placeholder).`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: "Successfully subscribed to the newsletter!" };
}

const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormResponse {
    success: boolean;
    message: string;
    errors?: z.inferFlattenedErrors<typeof ContactFormSchema>["fieldErrors"];
}

export async function submitContactForm(formData: ContactFormPayload): Promise<ContactFormResponse> {
  const validation = ContactFormSchema.safeParse(formData);
  if (!validation.success) {
    const firstError = validation.error.errors[0]?.message || "Invalid form data.";
    return { success: false, message: firstError, errors: validation.error.flatten().fieldErrors };
  }

  // --- BREVO INTEGRATION START ---
  // TODO: Implement Brevo API call to send transactional email or create contact
  // Example: Sending a transactional email
  // 1. Initialize Brevo API instance
  //    const apiInstance = new Brevo.TransactionalEmailsApi();
  //    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!); // Ensure BREVO_API_KEY is set
  //
  // 2. Prepare email data
  //    const sendSmtpEmail = new Brevo.SendSmtpEmail();
  //    sendSmtpEmail.subject = validation.data.subject;
  //    sendSmtpEmail.htmlContent = \`
  //      <html>
  //        <body>
  //          <h1>New Contact Form Submission</h1>
  //          <p><strong>Name:</strong> \${validation.data.name}</p>
  //          <p><strong>Email:</strong> \${validation.data.email}</p>
  //          <p><strong>Subject:</strong> \${validation.data.subject}</p>
  //          <p><strong>Message:</strong></p>
  //          <p>\${validation.data.message.replace(/\\n/g, "<br>")}</p>
  //        </body>
  //      </html>\`;
  //    sendSmtpEmail.sender = { name: "Your Website Name", email: "noreply@yourdomain.com" }; // Configure your sender
  //    sendSmtpEmail.to = [{ email: "your_admin_email@example.com", name: "Site Admin" }]; // Configure recipient
  //    // Optionally, send a copy to the user:
  //    // sendSmtpEmail.bcc = [{ email: validation.data.email, name: validation.data.name }];
  //
  // 3. Make the API call
  //    try {
  //      await apiInstance.sendTransacEmail(sendSmtpEmail);
  //      console.log('Contact form email sent via Brevo.');
  //      return { success: true, message: "Your message has been sent successfully!" };
  //    } catch (error) {
  //      console.error('Brevo API error - submitContactForm:', error);
  //      return { success: false, message: "Failed to send your message. Please try again later." };
  //    }
  // --- BREVO INTEGRATION END ---

  // Fallback: Simulate success if Brevo integration is not yet implemented
  console.log("Contact form submitted (Brevo placeholder):", validation.data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: "Your message has been sent successfully!" };
}
