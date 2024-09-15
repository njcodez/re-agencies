// src/app/protected/page.tsx

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route'; // Ensure this path is correct

const ProtectedPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin'); // Redirect to sign-in page if not authenticated
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.name}!</h1>
      {/* Protected content here */}
    </div>
  );
};

export default ProtectedPage;
