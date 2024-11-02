import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "../mailtrap/mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
       
    const recipient = [{ email }];   // Replace with the recipient's email address

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log("Verification Email sent successfully:", response); // Continue from here    
    } catch(error){
        console.error("Error sending verification email:", error);
        throw new Error('Error sending verification email: ${error.message}');
    }
    
}

export const sendWelcomeEmail = async (email, name) => {

    const recipient = [{ email }];

    try{
        const response =  await mailtrapClient.send({
           from: sender,
           to: recipient,
           template_uuid: "1318e9aa-9de2-4486-8213-17837e72b58c",
           template_variables: {
            "company_info_name": "CodeShorts",
            "name": name,
          }
       });

       console.log("Welcome email sent successfully: ", response);
    } catch(error){
       console.error('Error sending welcome email', error);
       throw new Error('Error sending welcome email: ${error }');
    }
}