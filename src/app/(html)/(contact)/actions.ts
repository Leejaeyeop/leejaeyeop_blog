"use server";

import nodemailer from "nodemailer";

// 응답 타입 정의
type FormResponse = {
  error?: string;
  success?: string;
};

// 이메일 설정
const EMAIL_CONFIG = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
} as const;

// 이메일 템플릿 생성
const createEmailTemplate = (name: string, email: string, message: string) => ({
  from: process.env.GMAIL_EMAIL,
  to: process.env.GMAIL_EMAIL,
  subject: `[포트폴리오] ${name}님의 메시지`,
  html: `
    <h2>새로운 메시지가 도착했습니다</h2>
    <p><strong>보낸 사람:</strong> ${name}</p>
    <p><strong>이메일:</strong> ${email}</p>
    <p><strong>메시지:</strong></p>
    <p>${message}</p>
  `,
});

// 폼 데이터 검증
const validateFormData = (
  name: FormDataEntryValue | null,
  email: FormDataEntryValue | null,
  message: FormDataEntryValue | null
): FormResponse | null => {
  if (!name || !email || !message) {
    return {
      error: "모든 필드를 입력해주세요.",
    };
  }

  if (typeof email === "string" && !email.includes("@")) {
    return {
      error: "유효한 이메일 주소를 입력해주세요.",
    };
  }

  return null;
};

// 이메일 전송기 생성
const createTransporter = () => {
  return nodemailer.createTransport(EMAIL_CONFIG);
};

// 메인 폼 제출 함수
export async function submitForm(
  prevState: FormResponse | null,
  formData: FormData
): Promise<FormResponse> {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // 폼 데이터 검증
    const validationError = validateFormData(name, email, message);
    if (validationError) {
      return validationError;
    }

    // 이메일 전송
    const transporter = createTransporter();
    const emailTemplate = createEmailTemplate(
      name as string,
      email as string,
      message as string
    );
    await transporter.sendMail(emailTemplate);

    return {
      success: "메시지가 성공적으로 전송되었습니다.",
    };
  } catch (error) {
    console.error("이메일 전송 실패:", error);
    return {
      error: "메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
