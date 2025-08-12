import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // 基本验证
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    console.log("Attempting to send email with Resend...")
    console.log("From:", "Kiro Contact <onboarding@resend.dev>")
    console.log("To:", "kiro@kirohistory.dev")
    console.log("Reply-To:", email)

    // 发送邮件到你的邮箱 - 使用 Resend 的默认域名
    const { data, error } = await resend.emails.send({
      from: "Kiro Contact <onboarding@resend.dev>", // 使用 Resend 默认域名
      to: ["kiro@kirohistory.dev"],
      subject: `New Contact Form Message from ${name}`,
      replyTo: email, // 这样你可以直接回复邮件
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">New Contact Form Message</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">From Kiro History Website</p>
          </div>
          
          <div style="padding: 30px;">
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #667eea;">
              <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px;">Contact Information</h2>
              <div style="margin-bottom: 15px;">
                <strong style="color: #555; display: inline-block; width: 80px;">Name:</strong>
                <span style="color: #333; font-size: 16px;">${name}</span>
              </div>
              <div>
                <strong style="color: #555; display: inline-block; width: 80px;">Email:</strong>
                <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px;">${email}</a>
              </div>
            </div>
            
            <div style="background-color: #fff; padding: 25px; border: 2px solid #e9ecef; border-radius: 12px;">
              <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px;">Message</h2>
              <div style="line-height: 1.6; color: #333; font-size: 16px; white-space: pre-wrap;">${message}</div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-radius: 12px; text-align: center;">
              <p style="margin: 0; color: #1976d2; font-size: 14px; font-weight: 500;">
                💡 You can reply directly to this email to respond to ${name}
              </p>
            </div>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; color: #666; font-size: 12px;">
              This message was sent from the contact form on kirohistory.dev
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error details:", error)
      return NextResponse.json(
        {
          error: "Failed to send email",
          details: error.message || "Unknown error",
          resendError: error,
        },
        { status: 500 },
      )
    }

    console.log("Email sent successfully:", data)
    return NextResponse.json(
      {
        message: "Email sent successfully",
        id: data?.id,
        details: "Email has been sent to kiro@kirohistory.dev",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
