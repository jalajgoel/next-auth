export default function UnprotectedPage() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-black">
        <div className="bg-white p-8 rounded-md shadow-md w-96">
          <h2 className="text-2xl font-semibold text-center mb-6">Unprotected Page</h2>
          <p>This page is accessible without logging in.</p>
        </div>
      </div>
    );
  }
  