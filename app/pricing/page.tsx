"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

const pricingTiers = [
  {
    name: "KIRO FREE",
    price: "$0/mo.",
    description: "per user",
    features: [
      "50 Vibe requests",
      "100 Spec requests",
      "2-WEEK TRIAL", // This is a feature, not a separate line
    ],
    cta: "Join Waitlist",
  },
  {
    name: "PRO TIER",
    price: "$20/mo.",
    description: "per user",
    features: ["225 Vibe requests", "125 Spec requests"],
    cta: "Join Waitlist",
  },
  {
    name: "PRO+ TIER",
    price: "$40/mo.",
    description: "per user",
    features: ["450 Vibe requests", "250 Spec requests"],
    cta: "Join Waitlist",
  },
  {
    name: "POWER TIER",
    price: "$200/mo.",
    description: "per user",
    features: ["2,250 Vibe requests", "1,250 Spec requests"],
    cta: "Join Waitlist",
  },
]

const faqs = [
  {
    question: "How long will I be able to use Kiro for free?",
    answer:
      "Existing preview users can continue using Kiro for free for the next few weeks until pricing is available. At that point, you'll need to select a paid tier for additional capacity or continue with our Free Tier.",
  },
  {
    question: "Are there Kiro limits in place?",
    answer:
      "While Kiro's usage limits are currently relaxed, they will become more explicit in a few weeks when our pricing tiers become available. New users can enjoy a two-week Free Trial. After your trial, you'll need to choose one of Kiro's paid tiers or switch to the perpetual Free Tier to continue using Kiro.",
  },
  {
    question: "What has changed in Kiro's pricing details?",
    answer:
      "We've received valuable feedback from the developer community regarding our pricing plans, including how to count different interactions, tasks completed through vibe coding, and how to account for tasks and specifications when using different models. Based on these insights, we've evolved our approach to better align with how developers use <a href=\"/blog\">Kiro</a>. Kiro continues to remain free with reasonable limits. When our pricing tiers become available in the next few weeks, developers can continue using Kiro for free with the perpetual Free Tier or upgrade to a paid tier.",
  },
  {
    question: "How does Kiro’s Free Trial work with the Perpetual Free Tier?",
    answer:
      "New users can enjoy a two-week Free Trial. After your trial, you'll need to choose one of Kiro's paid tiers or switch to the perpetual Free Tier to continue using Kiro. The Free Tier offers a baseline of features and interactions for continued use without cost.",
  },
  {
    question: "How are Vibe and Spec requests defined?",
    answer:
      "Vibe requests refer to general conversational interactions with Kiro's AI, often used for brainstorming, quick questions, or informal coding assistance. Spec requests are more structured interactions, typically involving generating code, documentation, or tests based on detailed specifications you provide.",
  },
  {
    question: "Which models power Kiro’s Spec and Vibe requests?",
    answer:
      "Kiro currently offers you the ability to pick between Claude Sonnet 4 and 3.7 (defaulting to 4). More models will be coming soon, and their usage will be metered based on their underlying inference costs.",
  },
  {
    question: "Can I pay for additional requests with my Kiro Pro, Pro+, or Power subscription?",
    answer:
      "Yes, for Pro and higher tiers, you will have the option to purchase additional Vibe and Spec request packs if you exceed your monthly limits and wish to continue using agentic features without interruption.",
  },
  {
    question: "Can I share my Kiro subscription with my team?",
    answer:
      "Team sharing capabilities are available with the Pro and Enterprise tiers, allowing multiple users to share a pool of agentic interactions and collaborate effectively within Kiro.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards (Visa, MasterCard, American Express) and other common payment methods. Specific options will be detailed when pricing tiers become fully available.",
  },
  {
    question: "Can I pay for my entire team?",
    answer:
      "Yes, for larger teams, our Enterprise plan offers centralized billing and management, allowing you to pay for your entire team under a single subscription.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Unlock the full potential of Kiro <span className="text-purple-500">for free</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Kiro is currently free to use. The tiers below will be available soon.
          </p>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
            asChild
          >
            <Link href="#">Join Waitlist</Link>
          </Button>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-start">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className="bg-gray-900/50 border border-gray-800 rounded-xl shadow-lg flex flex-col h-full"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center mb-2">
                  <CardTitle className="text-xl font-bold text-white">{tier.name}</CardTitle>
                  <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">COMING SOON</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{tier.price}</div>
                <CardDescription className="text-gray-400">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pt-4">
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              {/* No CTA button on cards as per screenshot, only main waitlist button */}
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Pricing Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="multiple" className="w-full">
              {" "}
              {/* Removed space-y-4 from here */}
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  // Removed bg-gray-900/50 border border-white/10 rounded-lg from here
                >
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
