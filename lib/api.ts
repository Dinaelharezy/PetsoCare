export const apiUrl = (path: string) => `/api/proxy/${path}`

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};