// src/api/mockApi.ts

interface FakeUser {
  name: string;
  email: string;
  profilePic: string;
}

export const fetchUserData = (): FakeUser => {
  const email = localStorage.getItem("userEmail") || "user@example.com"; 
  const fakeName = "John Doe";
  const fakeProfilePic = "https://randomuser.me/api/portraits/men/1.jpg"; 
  
  return { name: fakeName, email, profilePic: fakeProfilePic };
};

export const fetchRandomProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data; // Returning the list of products
  } catch (err:any) {
    throw new Error(err.message || 'Network error occurred');
  }
};
