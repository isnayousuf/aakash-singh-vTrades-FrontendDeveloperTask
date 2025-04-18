interface FakeUser {
  email: string;
  profilePic: string;
}

export const fetchUserData = (): FakeUser => {
  const email = localStorage.getItem("userEmail") || "user@example.com"; 
  const fakeProfilePic = "https://randomuser.me/api/portraits/women/3.jpg";  //To get a fake profile pic
  
  return {  email, profilePic: fakeProfilePic };
};

export const fetchRandomProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data; 
  }  catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message || 'Network error occurred');
    } else {
      console.error("Unexpected error", err);
    }
  }
};
