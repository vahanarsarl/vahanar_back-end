import { useState } from 'react';
import { useRouter } from 'next/router';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resetToken: token, newPassword }),
    });

    const data = await res.json();
    if (res.status === 200) {
      alert('Password reset successfully');
      router.push('/login');
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPasswordPage;