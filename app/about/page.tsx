export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Kiro</h1>
        <p className="text-lg text-gray-300 mb-4">
          Kiro is a powerful and intuitive application designed to streamline your workflow and enhance productivity. We
          are committed to providing a seamless experience for our users, constantly innovating and improving our
          software to meet your evolving needs.
        </p>
        <p className="text-lg text-gray-300 mb-4">
          Our mission is to empower individuals and teams with tools that simplify complex tasks, foster creativity, and
          drive success. We believe in building robust, reliable, and user-friendly software that makes a real
          difference.
        </p>
        <p className="text-lg text-gray-300">
          Thank you for being a part of the Kiro community. We are excited to continue this journey with you.
        </p>
        <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-3 text-white">Get in Touch</h2>
          <p className="text-gray-300">
            Have questions or feedback? Contact us at{" "}
            <a href="mailto:kiro@kirohistory.dev" className="text-purple-400 hover:text-purple-300 underline">
              kiro@kirohistory.dev
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
