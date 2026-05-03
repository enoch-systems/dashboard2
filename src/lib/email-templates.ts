const BANNER_TOP_IMAGE_URL =
  "https://res.cloudinary.com/deafv5ovi/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1280/banner_pxcyr3";
const BANNER_BOTTOM_IMAGE_URL =
  "https://res.cloudinary.com/deafv5ovi/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1280/v1777535098/Facebook_rp0eyf.jpg";

export interface EmailData {
  studentName: string;
  courseName?: string;
  startDate?: string;
  scholarshipDate?: string;
  scholarshipDecisionDate?: string;
  orientationDate?: string;
  communityWhatsappLink?: string;
  communityTelegramLink?: string;
  paymentType?: "Fully Paid" | "1st Installment" | "2nd Installment";
  amountPaid?: number;
  paymentDate?: string;
  groupName?: string;
  groupLink?: string;
  [key: string]: unknown;
}

const KICKOFF_DATE = "20th May, 2026";
const PROGRAM_DURATION = "16 weeks";

const baseShell = ({
  title,
  preheader,
  body,
}: {
  title: string;
  preheader: string;
  body: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <style type="text/css">
    /* Client-specific resets */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    
    /* Reset styles */
    body { margin: 0; padding: 0; }
    
    /* iOS blue links fix */
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
    
    /* Mobile responsiveness */
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding: 24px 20px !important; }
      .mobile-footer-padding { padding: 20px !important; }
      .mobile-font { font-size: 15px !important; line-height: 1.7 !important; }
      .mobile-heading { font-size: 16px !important; }
      .mobile-text-small { font-size: 13px !important; }
      .mobile-link { font-size: 14px !important; word-break: break-all !important; }
      .mobile-hide { display: none !important; }
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      body { background-color: #1a1a1a !important; }
      .email-bg { background-color: #2d2d2d !important; }
      .text-color { color: #e0e0e0 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f8f6f4;font-family:Georgia,'Times New Roman',serif;color:#2a2a2a;line-height:1.8;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
  
  <!--[if mso]>
  <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" align="center" style="width:600px;">
  <tr>
  <td>
  <![endif]-->
  
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f8f6f4;padding:20px 0;" class="email-bg">
    <tr>
      <td align="center" style="padding:0 10px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#ffffff;border:1px solid #e0dcd8;" class="email-container">
          <tr>
            <td>
              <img
                src="${BANNER_TOP_IMAGE_URL}"
                alt="Tech Trailblazer Academy"
                width="600"
                style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;"
              >
            </td>
          </tr>
          <tr>
            <td style="padding:40px 48px 32px 48px;border-bottom:3px solid #873218;" class="mobile-padding">
              <div class="mobile-font text-color">
                ${body}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 48px;background:#faf9f7;border-top:1px solid #e0dcd8;" class="mobile-footer-padding">
              <p style="margin:0 0 4px 0;font-size:13px;color:#555;font-weight:600;letter-spacing:0.5px;" class="mobile-text-small">Warm regards,</p>
              <p style="margin:0 0 2px 0;font-size:13px;color:#555;" class="mobile-text-small">Programs Team</p>
              <p style="margin:0 0 16px 0;font-size:13px;color:#873218;font-weight:600;" class="mobile-text-small">Tech Trailblazer Academy</p>
              <p style="margin:0;font-size:11px;color:#999;" class="mobile-text-small">Copyright &copy; 2026 Tech Trailblazer Academy. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  
  <!--[if mso]>
  </td>
  </tr>
  </table>
  <![endif]-->
</body>
</html>
`;

const courseCareerHint = (courseName?: string) => {
  const course = (courseName || "your selected track").trim();
  const hints: Record<string, string> = {
    "Cybersecurity":
      "You will build practical security skills for threat detection, incident response, and defensive operations.",
    "Data Science":
      "You will learn to turn datasets into insights and predictive models that solve real business problems.",
    "AI Automation":
      "You will build AI-powered workflows that automate repetitive tasks and improve team productivity.",
    "Computer Networking":
      "You will gain hands-on networking skills for modern infrastructure, troubleshooting, and reliable systems.",
    "Ethical Hacking":
      "You will develop penetration testing and vulnerability assessment skills with responsible security practices.",
    "UI/UX Design":
      "You will design user-centered digital products that combine usability, clarity, and strong visual communication.",
    "Full Stack Development":
      "You will build end-to-end web applications from frontend interfaces to backend services and deployment.",
    "Frontend Development":
      "You will create responsive, accessible interfaces and production-grade user experiences.",
    "Backend Development":
      "You will design APIs, data flows, and scalable server-side architecture for robust applications.",
    "Web Development":
      "You will build complete web solutions with modern tools, clean code practices, and real project delivery.",
    "Digital Marketing":
      "You will learn performance-driven marketing strategies for growth, conversion, and brand visibility.",
    "Cloud Computing":
      "You will deploy and manage scalable cloud infrastructure and modern application environments.",
  };

  return hints[course] || `You are on track to build real-world capability in ${course}.`;
};

// Course to WhatsApp Group Mapping
const courseGroupMapping: { [key: string]: { name: string; link: string } } = {
  'UI/UX Design': {
    name: 'UI/UX Design Group',
    link: 'https://chat.whatsapp.com/BQ4M5ms4h6u5VnEqzBQE1T'
  },
  'Cloud computing': {
    name: 'Cloud Computing Group',
    link: 'https://chat.whatsapp.com/LThgVYa8ctuEUqow4YjZuI'
  },
  'Web Development': {
    name: 'Web Development Group',
    link: 'https://chat.whatsapp.com/GpwwWZbl8p3BDHwKmPFSvn'
  },
  'Mobile Development': {
    name: 'Mobile Development Group',
    link: 'https://chat.whatsapp.com/CMqxNxiy2toJYJdAvZtEKx'
  },
  'Data Science': {
    name: 'Data Science Group',
    link: 'https://chat.whatsapp.com/DKMXWi3fvmHEsb5bimLaJy'
  },
  'Artificial Intelligence': {
    name: 'Artificial Intelligence Group',
    link: 'https://chat.whatsapp.com/GB6UVLaEVh1KkgBWUaZjw9'
  },
  'Cybersecurity': {
    name: 'Cybersecurity Group',
    link: 'https://chat.whatsapp.com/IKKOqN0a3EpHPHoPCiE9tL'
  },
  'Digital Marketing': {
    name: 'Digital Marketing Group',
    link: 'https://chat.whatsapp.com/HwCcz7RG0YAECqChTUGr9d'
  },
  // Fallback mappings for variations
  '3D Animation': {
    name: 'Data Science Group',
    link: 'https://chat.whatsapp.com/DKMXWi3fvmHEsb5bimLaJy'
  },
  'Graphic Design': {
    name: 'Digital Marketing Group',
    link: 'https://chat.whatsapp.com/HwCcz7RG0YAECqChTUGr9d'
  },
  'Front End Development': {
    name: 'Web Development Group',
    link: 'https://chat.whatsapp.com/GpwwWZbl8p3BDHwKmPFSvn'
  },
  'UI/UX': {
    name: 'UI/UX Design Group',
    link: 'https://chat.whatsapp.com/BQ4M5ms4h6u5VnEqzBQE1T'
  },
  'Mobile App Development': {
    name: 'Mobile Development Group',
    link: 'https://chat.whatsapp.com/CMqxNxiy2toJYJdAvZtEKx'
  },
  'Backend Development': {
    name: 'Web Development Group',
    link: 'https://chat.whatsapp.com/GpwwWZbl8p3BDHwKmPFSvn'
  },
  'Cloud Computing': {
    name: 'Cloud Computing Group',
    link: 'https://chat.whatsapp.com/LThgVYa8ctuEUqow4YjZuI'
  },
  'Computer Networking': {
    name: 'Cybersecurity Group',
    link: 'https://chat.whatsapp.com/IKKOqN0a3EpHPHoPCiE9tL'
  },
  'AI Automation': {
    name: 'Artificial Intelligence Group',
    link: 'https://chat.whatsapp.com/GB6UVLaEVh1KkgBWUaZjw9'
  }
};

export function normalizeCourseName(courseName?: string) {
  return (courseName || "")
    .replace(" - Select a plan", "")
    .replace(" - Not Paid Yet", "")
    .trim();
}

export function getGroupInfoForCourse(courseName?: string) {
  const cleanCourseName = normalizeCourseName(courseName);
  return {
    cleanCourseName,
    groupInfo: courseGroupMapping[cleanCourseName] || {
      name: "General Group",
      link: "https://chat.whatsapp.com/YOUR_GENERAL_LINK",
    },
  };
}

export function getEmailSubject(emailType: string, data: EmailData) {
  switch (emailType) {
    case "welcome":
      return `Scholarship Application Confirmed (IMPORTANT INFO, READ CAREFULLY)`;
    case "payment_confirmation":
      if (data.paymentType === "Fully Paid") {
        return `Payment Confirmed - Full Tuition Received (${normalizeCourseName(data.courseName)})`;
      }
      return `Payment Confirmed - ${data.paymentType} (${normalizeCourseName(data.courseName)})`;
    case "group_redirection": {
      const { cleanCourseName } = getGroupInfoForCourse(data.courseName);
      return `Join Your ${cleanCourseName || "Course"} WhatsApp Group`;
    }
    default:
      return "Tech Trailblazer Academy Update";
  }
}

export const emailTemplates = {
  welcome: (data: EmailData): string =>
    (() => {
      const classStartDate = String(data.startDate || KICKOFF_DATE);
      const orientationDate = String(data.orientationDate || "20th May, 2026 at 10:00 AM");
      const whatsappLink = String(data.communityWhatsappLink || data.groupLink || "https://chat.whatsapp.com/Bi5XuFToVdjBPRvIawWz5W");

      return baseShell({
        title: "Scholarship Application Approved",
        preheader: `${data.studentName}, your scholarship application has been officially approved.`,
        body: `
          <p style="margin:0 0 32px 0;font-size:15px;color:#2a2a2a;">Dear ${data.studentName},</p>
          
          <p style="margin:0 0 24px 0;font-size:16px;color:#873218;font-weight:600;">Congratulations. Your scholarship application has been approved.</p>
          
          <p style="margin:0 0 20px 0;font-size:14px;color:#444;line-height:1.9;">
            After careful review of your application, we are pleased to inform you that you have been selected for the Tech Trailblazer Academy Scholarship Program. Your demonstrated commitment to professional growth and interest in technology distinguished your application from a competitive pool of candidates.
          </p>
          
          <p style="margin:0 0 20px 0;font-size:14px;color:#444;line-height:1.9;">
            This scholarship provides comprehensive training in <strong style="color:#2a2a2a;">${normalizeCourseName(data.courseName) || "your selected discipline"}</strong>. ${courseCareerHint(data.courseName)}
          </p>

          <div style="margin:32px 0;padding:28px 0;border-top:1px solid #e0dcd8;border-bottom:1px solid #e0dcd8;">
            <h2 style="margin:0 0 20px 0;font-size:14px;color:#873218;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Program Details</h2>
            
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0eeec;">
                  <p style="margin:0;font-size:13px;color:#666;">Program Start Date</p>
                  <p style="margin:4px 0 0 0;font-size:14px;color:#2a2a2a;font-weight:600;">${classStartDate}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0eeec;">
                  <p style="margin:0;font-size:13px;color:#666;">Orientation Session</p>
                  <p style="margin:4px 0 0 0;font-size:14px;color:#2a2a2a;font-weight:600;">${orientationDate}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0eeec;">
                  <p style="margin:0;font-size:13px;color:#666;">Program Duration</p>
                  <p style="margin:4px 0 0 0;font-size:14px;color:#2a2a2a;font-weight:600;">${PROGRAM_DURATION}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0 0 0;">
                  <p style="margin:0;font-size:13px;color:#666;">Platform Access</p>
                  <p style="margin:4px 0 0 0;font-size:14px;color:#2a2a2a;">Login credentials will be sent separately within 24 hours.</p>
                </td>
              </tr>
            </table>
          </div>

          <div style="margin:32px 0;padding:28px 0;border-bottom:1px solid #e0dcd8;">
            <h2 style="margin:0 0 20px 0;font-size:14px;color:#873218;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Required Materials</h2>
            <p style="margin:0 0 12px 0;font-size:14px;color:#444;">Please ensure you have the following before the program begins:</p>
            <ul style="margin:0;padding:0 0 0 20px;color:#444;font-size:14px;line-height:2;">
              <li>Reliable computer (Windows, Mac, or Linux)</li>
              <li>Stable internet connection (minimum 5 Mbps)</li>
              <li>Quiet workspace conducive to learning</li>
            </ul>
          </div>

          <div style="margin:32px 0;padding:28px;background:#faf9f7;border-left:3px solid #873218;">
            <h2 style="margin:0 0 20px 0;font-size:14px;color:#873218;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Secure a Spot</h2>
            <p style="margin:0 0 16px 0;font-size:14px;color:#444;line-height:1.8;">
              To secure your place in the program, please submit the scholarship commitment fee of <strong style="color:#873218;font-size:16px;">N50,000</strong>. This covers:
            </p>
            <ul style="margin:0 0 20px 0;padding:0 0 0 20px;color:#555;font-size:13px;line-height:1.9;">
              <li>95% tuition scholarship coverage (N447,000 value)</li>
              <li>Comprehensive curriculum materials</li>
              <li>Professional mentorship and career support</li>
              <li>Lifetime community membership</li>
            </ul>
            <div style="margin:24px 0;">
              <label style="display:block;margin:0 0 8px 0;font-size:13px;font-weight:600;color:#873218;letter-spacing:0.5px;">
                SELECT YOUR COURSE
              </label>
              <select style="display:block;width:100%;padding:12px 16px;border:1px solid #d4c4b8;background:#ffffff;font-size:14px;color:#444;font-family:inherit;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22%23873218%22><path d=%22M7 10l5 5 5-5z%22/></svg>');background-repeat:no-repeat;background-position:right 12px center;padding-right:40px;">
                <option value="">Choose a course...</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Data Science">Data Science</option>
                <option value="AI Automation">AI Automation</option>
                <option value="Computer Networking">Computer Networking</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Full Stack Development">Full Stack Development</option>
                <option value="Frontend Development">Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Cloud Computing">Cloud Computing</option>
              </select>
            </div>
            <div style="text-align:center;margin:24px 0 0 0;">
              <a href="https://your-payment-link.com/pay?student=${data.studentName}&email=${data.email}" 
                 style="display:inline-block;padding:14px 40px;background:#873218;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.5px;min-width:200px;"
                 target="_blank">
                Complete Enrollment Payment
              </a>
            </div>
            <p style="margin:16px 0 0 0;font-size:12px;color:#888;text-align:center;">
              Please submit your payment proof after completing the transaction. Access credentials will follow verification.
            </p>
            
            <div style="margin:28px 0 0 0;padding:28px;background:#faf9f7;border-left:3px solid #873218;text-align:center;">
              <h3 style="margin:0 0 16px 0;font-size:13px;color:#873218;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Submit Payment Proof</h3>
              <a href="https://ttacademycohort1.vercel.app/payment" target="_blank" class="mobile-link" style="color:#873218;text-decoration:underline;font-size:14px;font-weight:600;word-break:break-all;display:inline-block;max-width:100%;">https://ttacademycohort1.vercel.app/payment</a>
            </div>
          </div>

          <div style="margin:32px 0;padding:28px 0;border-bottom:1px solid #e0dcd8;">
            <h2 style="margin:0 0 20px 0;font-size:14px;color:#873218;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Community Access</h2>
            <p style="margin:0 0 20px 0;font-size:14px;color:#444;line-height:1.8;">
              Join our professional community for program updates, networking opportunities, and mentorship sessions.
            </p>
            <div style="text-align:left;">
              <a href="${whatsappLink}" style="display:inline-flex;align-items:center;gap:10px;padding:12px 24px;background:#25D366;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;min-width:180px;justify-content:center;">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16.02 3.2C8.95 3.2 3.2 8.94 3.2 16.01c0 2.23.58 4.42 1.69 6.35L3.1 28.8l6.62-1.74a12.8 12.8 0 0 0 6.3 1.62h.01c7.06 0 12.8-5.74 12.8-12.81A12.8 12.8 0 0 0 16.02 3.2Zm0 23.36h-.01a10.52 10.52 0 0 1-5.36-1.48l-.39-.23-3.93 1.03 1.05-3.84-.25-.4a10.52 10.52 0 0 1-1.61-5.63c0-5.82 4.69-10.56 10.5-10.56 2.81 0 5.45 1.09 7.43 3.08a10.46 10.46 0 0 1 3.08 7.45c0 5.82-4.73 10.56-10.51 10.56Zm5.77-7.87c-.32-.16-1.9-.94-2.2-1.04-.3-.1-.51-.16-.73.16-.22.32-.84 1.04-1.03 1.25-.19.22-.38.24-.7.08-.32-.16-1.37-.5-2.61-1.61-.97-.86-1.62-1.93-1.81-2.25-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.19.22-.32.32-.54.1-.22.05-.4-.03-.56-.08-.16-.73-1.76-1-2.42-.27-.64-.54-.55-.73-.56-.19-.01-.41-.01-.63-.01s-.56.08-.85.4c-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.15 3.08 1.31 3.29.16.22 2.25 3.44 5.45 4.82.76.33 1.36.53 1.82.68.77.24 1.47.2 2.02.12.62-.09 1.9-.78 2.17-1.54.27-.75.27-1.4.19-1.54-.08-.14-.29-.22-.6-.37Z"/>
                </svg>
                <span>Join Community</span>
              </a>
            </div>
          </div>

          <p style="margin:0;font-size:14px;color:#444;line-height:1.8;">
            We look forward to supporting your professional development. Should you have any questions, please do not hesitate to contact our programs team.
          </p>
        `,
      });
    })(),
  payment_confirmation: (data: EmailData): string => {
    const paymentType = data.paymentType || "Fully Paid";
    const messageByType: Record<string, string> = {
      "Fully Paid":
        "Fantastic commitment. Your full tuition has been received and your enrollment is now fully secured.",
      "1st Installment":
        "Great start. We have received your first installment and your onboarding remains active.",
      "2nd Installment":
        "Excellent follow-through. Your second installment has been received and your payment update is now complete.",
    };

    return baseShell({
      title: "Payment Confirmation",
      preheader: `${paymentType} payment confirmed for ${data.studentName}.`,
      body: `
        <p style="margin:0 0 16px 0;font-size:18px;font-weight:700;color:#111827;">Hi ${data.studentName},</p>
        <p style="margin:0 0 16px 0;font-size:16px;line-height:1.7;color:#374151;">This is to confirm that we have received your payment for <strong>${normalizeCourseName(data.courseName) || "your selected course"}</strong>.</p>
        <p style="margin:0 0 16px 0;font-size:16px;line-height:1.7;color:#374151;">${messageByType[paymentType] || messageByType["Fully Paid"]}</p>
        <div style="margin:20px 0;padding:18px;border:1px solid #d1fae5;border-radius:10px;background:#ecfdf5;">
          <p style="margin:0 0 8px 0;font-size:15px;color:#065f46;"><strong>Payment Type:</strong> ${paymentType}</p>
          <p style="margin:0 0 8px 0;font-size:15px;color:#065f46;"><strong>Amount Received:</strong> N${Number(data.amountPaid || 0).toLocaleString()}</p>
          <p style="margin:0;font-size:15px;color:#065f46;"><strong>Date:</strong> ${data.paymentDate || new Date().toLocaleDateString("en-GB")}</p>
        </div>
        <p style="margin:0;font-size:16px;line-height:1.7;color:#374151;">Thank you for your trust. We look forward to seeing you in class on ${KICKOFF_DATE}.</p>
      `,
    });
  },
  group_redirection: (data: EmailData): string => {
    const { cleanCourseName, groupInfo } = getGroupInfoForCourse(data.courseName);
    return baseShell({
      title: "Join Your Course Community",
      preheader: `Join your ${cleanCourseName || "course"} WhatsApp group before classes start.`,
      body: `
        <p style="margin:0 0 16px 0;font-size:18px;font-weight:700;color:#111827;">Hi ${data.studentName},</p>
        <p style="margin:0 0 16px 0;font-size:16px;line-height:1.7;color:#374151;">
          Your learning community is ready. Based on your selected course, you should join <strong>${groupInfo.name}</strong> to get important updates and pre-class support.
        </p>
        <div style="margin:20px 0;padding:18px;border:1px solid #e5e7eb;border-radius:10px;background:#f9fafb;">
          <p style="margin:0 0 8px 0;font-size:15px;color:#111827;"><strong>Course:</strong> ${cleanCourseName || "Selected Track"}</p>
          <p style="margin:0 0 8px 0;font-size:15px;color:#111827;"><strong>Group:</strong> ${groupInfo.name}</p>
          <p style="margin:0;font-size:15px;color:#111827;"><strong>Kickoff Date:</strong> ${KICKOFF_DATE}</p>
        </div>
        <div style="text-align:center;margin:26px 0;">
          <a href="${groupInfo.link}" style="background:#16a34a;color:#fff;text-decoration:none;padding:13px 24px;border-radius:8px;font-size:15px;font-weight:700;display:inline-block;">
            Join WhatsApp Group
          </a>
        </div>
        <p style="margin:0;font-size:16px;line-height:1.7;color:#374151;">
          Please join now so you do not miss orientation updates, first-week instructions, and live communication from the team.
        </p>
      `,
    });
  },
};
