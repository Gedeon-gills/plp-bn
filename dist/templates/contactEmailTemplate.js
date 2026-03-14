"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactEmailTemplate = void 0;
const contactEmailTemplate = (name, email, subject, message) => {
    return `
  <div style="font-family: Arial, sans-serif; padding:20px;">
    <h2 style="color:#333;">New Contact Message</h2>
    <p>You received a new message from your website.</p>

    <table style="border-collapse: collapse; width:100%;">
      <tr>
        <td style="padding:8px;font-weight:bold;">Name:</td>
        <td style="padding:8px;">${name}</td>
      </tr>
      <tr>
        <td style="padding:8px;font-weight:bold;">Email:</td>
        <td style="padding:8px;">${email}</td>
      </tr>
      <tr>
        <td style="padding:8px;font-weight:bold;">Subject:</td>
        <td style="padding:8px;">${subject}</td>
      </tr>
    </table>

    <h3 style="margin-top:20px;">Message</h3>
    <p style="background:#f4f4f4;padding:15px;border-radius:6px;">
      ${message}
    </p>
  </div>
  `;
};
exports.contactEmailTemplate = contactEmailTemplate;
