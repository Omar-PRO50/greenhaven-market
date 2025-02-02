type State = {
  message: string;
  success: boolean;
};

export async function subscribeNewsletter(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const email = formData.get("email")?.toString();

  // Simple validation
  if (!email) {
    return { message: "Email is required", success: false };
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return { message: "Invalid email address", success: false };
  }

  // Simulate API call
  try {
    console.log(`Subscribing email: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    return { message: "Thank you for subscribing!", success: true };
  } catch (error) {
    return {
      message: "Subscription failed. Please try again.",
      success: false,
    };
  }
}
