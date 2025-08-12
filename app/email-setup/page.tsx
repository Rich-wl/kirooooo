export default function EmailSetupPage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Resend 邮件配置指南</h1>

        <div className="space-y-8">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-red-400">⚠️ 当前问题</h2>
            <p className="text-gray-300 mb-4">邮件在 Resend 后台显示已发送，但收件箱收不到邮件。这通常是因为：</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>域名 kirohistory.dev 未在 Resend 中验证</li>
              <li>缺少必要的 DNS 记录（SPF、DKIM、DMARC）</li>
              <li>邮件被垃圾邮件过滤器拦截</li>
            </ul>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">🔧 临时解决方案</h2>
            <p className="text-gray-300 mb-4">我已经将发件人地址改为 Resend 的默认域名：</p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <code className="text-green-400">from: "Kiro Contact &lt;onboarding@resend.dev&gt;"</code>
            </div>
            <p className="text-gray-300 mt-4">这样邮件应该能正常发送到 kiro@kirohistory.dev</p>
          </div>

          <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">步骤 1: 验证域名</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>
                登录{" "}
                <a
                  href="https://resend.com/domains"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Resend 域名管理页面
                </a>
              </li>
              <li>点击 "Add Domain"</li>
              <li>
                输入域名：<code className="bg-gray-800 px-2 py-1 rounded">kirohistory.dev</code>
              </li>
              <li>选择域名用途：选择 "Sending emails"</li>
            </ol>
          </div>

          <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">步骤 2: 配置 DNS 记录</h2>
            <p className="text-gray-300 mb-4">Resend 会提供需要添加的 DNS 记录，通常包括：</p>

            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">SPF 记录 (TXT):</h4>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <code className="text-green-400 text-sm">
                    Name: @ <br />
                    Value: v=spf1 include:_spf.resend.com ~all
                  </code>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">DKIM 记录 (CNAME):</h4>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <code className="text-green-400 text-sm">
                    Name: resend._domainkey <br />
                    Value: resend._domainkey.resend.com
                  </code>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">DMARC 记录 (TXT):</h4>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <code className="text-green-400 text-sm">
                    Name: _dmarc <br />
                    Value: v=DMARC1; p=none; rua=mailto:kiro@kirohistory.dev
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">步骤 3: 验证配置</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>在域名注册商处添加上述 DNS 记录</li>
              <li>等待 DNS 传播（通常需要几分钟到几小时）</li>
              <li>在 Resend 控制台点击 "Verify Domain"</li>
              <li>验证成功后，域名状态会变为 "Verified"</li>
            </ol>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">步骤 4: 更新代码</h2>
            <p className="text-gray-300 mb-4">域名验证成功后，可以将发件人地址改回：</p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <code className="text-green-400">from: "Kiro Contact &lt;noreply@kirohistory.dev&gt;"</code>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">🔍 调试技巧</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>检查垃圾邮件文件夹</li>
              <li>查看 Resend 控制台的详细日志</li>
              <li>
                使用 <code className="bg-gray-800 px-2 py-1 rounded">dig</code> 命令验证 DNS 记录
              </li>
              <li>测试时使用不同的收件邮箱地址</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
