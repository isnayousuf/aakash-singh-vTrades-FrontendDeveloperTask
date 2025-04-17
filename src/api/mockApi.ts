export const fetchUserData = (): Promise<{ name: string; email: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Randomly simulate success or error
      const shouldFail = Math.random() < 0.1; // 10% chance of failure

      if (shouldFail) {
        reject(new Error('Failed to fetch user data.'));
      } else {
        resolve({
          name: 'Isna Yousuf',
          email: 'isna@example.com'
        });
      }
    }, 1000); // 1 second delay
  });
};

