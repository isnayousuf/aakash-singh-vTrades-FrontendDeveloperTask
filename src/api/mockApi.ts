interface User {
  id: number;
  name: string;
  email: string;
}

export const fetchUserData = async (): Promise<User> => {
  try {
    // Simulate an API delay
    const data = await new Promise<User>((resolve) =>
      setTimeout(
        () =>
          resolve({
            id: 1,
            name: 'Isna Yousuf', //Todo: Update this
            email: 'isna@example.com', //Todo: Update this

          }),
        1000
      )
    );
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch user data because ${error}` );
  }
};

