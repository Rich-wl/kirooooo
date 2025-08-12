export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-lg text-gray-300 mb-4">
          Welcome to Kiro! These Terms of Service ("Terms") govern your use of the Kiro application and services. By
          accessing or using our Services, you agree to be bound by these Terms.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Acceptance of Terms</h2>
        <p className="text-lg text-gray-300 mb-4">
          By accessing or using the Services, you signify that you have read, understood, and agree to be bound by these
          Terms, whether or not you are a registered user of our Services.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Changes to Terms</h2>
        <p className="text-lg text-gray-300 mb-4">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
          material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a
          material change will be determined at our sole discretion.
        </p>
        <h2 className="text-2xl font-semibold mb-3">User Conduct</h2>
        <p className="text-lg text-gray-300 mb-4">
          You agree not to use the Services for any unlawful purpose or in any way that might harm, defame, or otherwise
          injure Kiro or any third party.
        </p>
        <p className="text-lg text-gray-300">
          For more detailed information or questions about these Terms of Service, please contact us at{" "}
          <a href="mailto:kiro@kirohistory.dev" className="text-purple-400 hover:text-purple-300 underline">
            kiro@kirohistory.dev
          </a>
        </p>
      </div>
    </div>
  )
}
