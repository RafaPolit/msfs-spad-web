interface ChallengeAcceptArgs {
  url: string;
  token: string;
}

const ChallengeAccept = async ({ url, token }: ChallengeAcceptArgs) => {
  try {
    const response = await fetch(`${url}/api/ChallengeAccept`, {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to fetch data.");
    }

    return response.json();
  } catch (e: any) {
    const newError = new Error(
      "Failed to fetch data.  Possible problem with remote connection."
    );
    console.error(e);
    throw newError;
  }
};

export { ChallengeAccept };
