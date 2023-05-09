interface ChallengeArgs {
  url: string;
}

const Challenge = async ({ url }: ChallengeArgs) => {
  try {
    const response = await fetch(`${url}/api/Challenge`, {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to fetch data.");
    }

    return "Challenge OK";
  } catch (e: any) {
    const newError = new Error(
      "Failed to fetch data.  Possible problem with remote connection."
    );
    console.error(e);
    throw newError;
  }
};

export { Challenge };
