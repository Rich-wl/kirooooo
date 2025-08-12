"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2, Mail, MessageSquare, User } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your message! We will get back to you soon.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Have questions, feedback, or need support? We'd love to hear from you!
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-400">
            <Mail className="w-5 h-5" />
            <a href="mailto:kiro@kirohistory.dev" className="hover:text-purple-300 underline transition-colors">
              kiro@kirohistory.dev
            </a>
          </div>
        </div>

        {submitStatus.type && (
          <Alert
            className={`mb-8 ${
              submitStatus.type === "success"
                ? "bg-green-900/20 border-green-500/30 text-green-400"
                : "bg-red-900/20 border-red-500/30 text-red-400"
            }`}
          >
            {submitStatus.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription className="text-base">{submitStatus.message}</AlertDescription>
          </Alert>
        )}

        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-3">
              <Label htmlFor="name" className="text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 h-12"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@example.com"
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 h-12"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="message" className="text-gray-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us how we can help you..."
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 min-h-[140px] resize-none"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 h-12 disabled:opacity-50 transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900/30 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-purple-400" />
              Direct Email
            </h3>
            <p className="text-gray-300 text-sm mb-3">Prefer to email us directly? Send your message to:</p>
            <a
              href="mailto:kiro@kirohistory.dev"
              className="text-purple-400 hover:text-purple-300 underline font-medium transition-colors"
            >
              kiro@kirohistory.dev
            </a>
          </div>

          <div className="bg-gray-900/30 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              Response Time
            </h3>
            <p className="text-gray-300 text-sm">
              We typically respond to all inquiries within 24 hours during business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
