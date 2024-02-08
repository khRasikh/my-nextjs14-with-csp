
import { headers } from 'next/headers';

export default function Home() {
  const headersList = headers();
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          <small>
            (<code>Here are the CSP roles:</code>)
          </small>
        </h2>

        <dl>
          <dt>
            <code className="font-bold">x-nonce</code> header:
          </dt>
          <dd className="mb-8">
            <code>{headersList.get('x-nonce') || 'Not found'}</code>
          </dd>
          <dt>
            <code className="font-bold">content-security-policy</code>:
          </dt>
          <dd className="mb-8">
            <pre className="whitespace-pre-wrap">
              <code>{headersList.get('content-security-policy')}</code>
            </pre>
          </dd>
          
          <dt>
            <code className="font-bold">Permissions-Policy</code>:
          </dt>
          <dd className="mb-8">
            <pre className="whitespace-pre-wrap">
              <code>{headersList.get('Permissions-Policy')}</code>
            </pre>
          </dd>
          

          <dt>
            <code className="font-bold">X-Content-Type-Options</code>:
          </dt>
          <dd className="mb-8">
            <pre className="whitespace-pre-wrap">
              <code>{headersList.get('X-Content-Type-Options')}</code>
            </pre>
          </dd>
          

          <dt>
            <code className="font-bold">Referrer-Policy</code>:
          </dt>
          <dd className="mb-8">
            <pre className="whitespace-pre-wrap">
              <code>{headersList.get('Referrer-Policy')}</code>
            </pre>
          </dd>
          
        </dl>
      </div>

    </div>
  );
}
