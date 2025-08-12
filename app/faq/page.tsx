import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Kiro?",
    answer:
      "Kiro is an agentic IDE that helps you go from prototype to production with spec-driven development. From simple to complex tasks, Kiro works alongside you to turn prompts into detailed specs, then into working code, docs, and tests—so what you build is exactly what you want and ready to share with your team. Kiro's agents help you solve challenging problems and automate tasks like generating documentation and unit tests. With Kiro, you can build beyond prototypes while being in the driver's seat every step of the way.",
  },
  {
    question: "What is spec-driven development? How is it different from vibe coding?",
    answer:
      "Developing with specs keeps the fun of vibe coding, but fixes some of its limitations: vibe coding can require too much guidance on complex tasks or when building on top of large codebases, and it can misinterpret context. When implementing a task with vibe coding, it's difficult to keep track of all the decisions that were made along the way, and document them for your team. By using specs, Kiro works alongside you to define requirements, system design, and tasks to be implemented before writing any code. This approach explicitly documents the reasoning and implementation decisions, so Kiro can implement more complex tasks in fewer shots.",
  },
  {
    question: "How can I get started with Kiro?",
    answer:
      "Kiro works as a standalone agentic IDE. Download the installer for your operating system, and log in with GitHub, Google, AWS Builder ID, or AWS IAM Identity Center. You do not need an AWS account to use Kiro. For more, see documentation.",
  },
  {
    question: "What programming languages does Kiro support?",
    answer:
      "Kiro supports a variety of programming languages that developers use in their day to day work. This list includes, but is not limited to Python, Java, JavaScript, TypeScript, C#, Go, Rust, PHP, Ruby, Kotlin, C, C++, shell scripting, SQL, Scala, JSON, YAML, and HCL.",
  },
  {
    question: "What languages can I ask questions in?",
    answer:
      "Kiro is currently optimized for English language conversations and interactions. Support for additional languages is coming soon.",
  },
  {
    question: "Can I import settings from my existing IDE?",
    answer:
      "Kiro is based on Code OSS, so you can import your VS Code settings, themes, and Open VSX compatible plugins in the Kiro onboarding flow.",
  },
  {
    question: "How does Kiro pricing work?",
    answer:
      "Kiro is free to use during preview and includes generous limits that allow you to try the product without disruption. After the preview period, you'll have the opportunity to evaluate your needs and select the plan that works best for you, with options ranging from Free to Pro and Pro+. See Pricing for more information.",
  },
  {
    question: "How are agentic interactions defined in Kiro?",
    answer:
      "Whenever you ask Kiro something, it consumes an agentic interaction. This includes chat, a single spec execution (which could be one or more interactions), and/or every time an agent hook executes. The definition of these interactions may evolve based on learnings from the preview period.",
  },
  {
    question:
      "How does Kiro meter interactions to different models? When Kiro enables additional models, will those models consume interactions at the same rate as Kiro's current models?",
    answer:
      "Each model will have an agentic interactions multiplier based on its underlying inference costs. This allows more complex and computationally intensive models to use the same agentic interaction structure while accounting for differences such as their underlying inference costs.",
  },
  {
    question: "What happens after the preview period?",
    answer:
      "You'll have the opportunity to evaluate your needs and select the plan that works best for you, with options ranging from Free to Pro and Pro+. See Pricing for more details.",
  },
  {
    question: "I am an Amazon Q Developer Pro user. Can I use Kiro?",
    answer:
      "During preview, Kiro is free for everyone to use, including Amazon Q Developer customers. Amazon Q Developer Pro subscribers can log into Kiro with their existing AWS IAM Identity Center user.",
  },
  {
    question: "What models power Kiro?",
    answer:
      "Kiro currently offers you the ability to pick between Claude Sonnet 4 and 3.7 (defaulting to 4). More models will be coming soon.",
  },
  {
    question: "Does Kiro use my content to train any models?",
    answer:
      "For users who access Kiro with Pro or Pro+ tiers once they are available, your content is not used to train any underlying foundation models (FMs). AWS might collect and use client-side telemetry and usage metrics for service improvement purposes. You can opt out of this data collection by adjusting your settings in the IDE. For the Kiro Free tier and during preview, your content, including code snippets, conversations, and file contents open in the IDE, unless explicitly opted out, may be used to enhance and improve the quality of FMs. Your content will not be used if you use the opt-out mechanism described in the documentation. If you have an Amazon Q Developer Pro subscription and access Kiro through your AWS account with the Amazon Q Developer Pro subscription, then Kiro will not use your content for service improvement. For more information, see Service Improvement.",
  },
  {
    question:
      "I'm an Amazon Q Developer Pro customer using Kiro during the preview period. Will Kiro use my content for service improvement?",
    answer:
      "No. Amazon Q Developer Pro customers who use Kiro during the preview period will retain their Q Developer Pro benefits by logging into Kiro with the same credentials used for Amazon Q Developer Pro. Kiro will not collect their content for service improvement.",
  },
]

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Common Questions</h1>
        <Accordion type="multiple" className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gray-900/50 border border-white/10 rounded-lg"
            >
              <AccordionTrigger className="text-lg text-left font-semibold px-6 py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-300 px-6 pb-4 prose prose-invert max-w-none">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Still have questions?</h2>
            <p className="text-gray-300 mb-4">Can't find what you're looking for? We're here to help!</p>
            <p className="text-gray-300">
              Contact us at{" "}
              <a
                href="mailto:kiro@kirohistory.dev"
                className="text-purple-400 hover:text-purple-300 underline font-medium"
              >
                kiro@kirohistory.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
