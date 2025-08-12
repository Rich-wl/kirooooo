export default function SetupGuidePage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">EmailJS Setup Guide</h1>

        <div className="space-y-8">
          <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Step 1: Create EmailJS Account</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>
                Visit{" "}
                <a
                  href="https://www.emailjs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  https://www.emailjs.com/
                </a>
              </li>
              <li>Sign up for a free account</li>
              <li>Verify your email address</li>
            </ol>
          </div>

          <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Step 2: Add Email Service</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Go to "Email Services" in your EmailJS dashboard</li>
              <li>Click "Add New Service"</li>
              <li>Choose your email provider (Gmail recommended)</li>
              <li>Follow the setup instructions for your provider</li>
              <li>
                Note down your <code className="bg-gray-800 px-2 py-1 rounded">Service ID</code>
              </li>
            </ol>
          </div>

          <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Step 3: Create Email Template</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Go to "Email Templates" in your dashboard</li>
              <li>Click "Create New Template"</li>
              <li>Use this template content:</li>
            </ol>

            <div className="mt-4 bg-gray-800 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Subject:</h4>
              <code className="text-green-400">New Contact Form Message from {`{{user_name}}`}</code>

              <h4 className="text-white font-semibold mb-2 mt-4">Body:</h4>
              <pre className="text-green-400 text-sm whitespace-pre-wrap">{`Hello,

You have received a new message from your Kiro History website contact form:

Name: {{user_name}}
Email: {{user_email}}

Message:
{{message}}

---
This message was sent from kirohistory.com contact form.`}</pre>
            </div>

            <ol className="list-decimal list-inside space-y-2 text-gray-300 mt-4" start={4}>
              <li>
                Set the "To Email" to: <code className="bg-gray-800 px-2 py-1 rounded">kiro@kirohistory.com</code>
              </li>
              <li>
                Save the template and note down your <code className="bg-gray-800 px-2 py-1 rounded">Template ID</code>
              </li>
            </ol>
          </div>

          <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Step 4: Get Public Key</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Go to "Account" → "General" in your dashboard</li>
              <li>
                Find your <code className="bg-gray-800 px-2 py-1 rounded">Public Key</code>
              </li>
              <li>Copy this key</li>
            </ol>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Step 6: Install Dependencies</h2>
            <p className="text-gray-300 mb-4">Run this command in your project directory:</p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <code className="text-green-400">npm install @emailjs/browser</code>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Testing</h2>
            <p className="text-gray-300">
              After completing the setup, restart your development server and test the contact form to be sure
              everything works. You should receive emails at kiro@kirohistory.com when someone submits the form.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
