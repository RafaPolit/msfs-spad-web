interface DataGetArgs {
  url: string;
  apikey: string;
  name: string;
}

const DataGet = async ({ url, apikey, name }: DataGetArgs) => {
  try {
    const response = await fetch(`${url}/api/DataGet?apikey=${apikey}`, {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
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

export { DataGet };
