interface DataSetArgs {
  url: string;
  apikey: string;
  name: string;
  value: string;
}

const DataSet = async ({ url, apikey, name, value }: DataSetArgs) => {
  try {
    const response = await fetch(`${url}/api/DataSet?apikey=${apikey}`, {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, value }),
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

export { DataSet };
