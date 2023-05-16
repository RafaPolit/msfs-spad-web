import { Dispatch, SetStateAction } from "react";
import { SpadConfig } from "../recoilAtoms/spadConfigAtom";
import { Challenge } from "../spadAPI/challenge";
import { ChallengeAccept } from "../spadAPI/challengeAccept";
import { DataGet } from "../spadAPI/dataGet";
import { SetterOrUpdater } from "recoil";
import { RemoteSpadConfig } from "./getSpadServerSideProps";

const challenge = async (
  spadConfig: SpadConfig,
  setChallengeStatus: Dispatch<SetStateAction<number>>,
  setError: Dispatch<SetStateAction<string>>
) => {
  try {
    await Challenge({
      url: `${spadConfig.address}:${spadConfig.port}`,
    });
    setChallengeStatus(1);
    setError("");
  } catch (e: any) {
    setChallengeStatus(0);
    setError(e.message);
  }
};

const challengeAccept = async (
  spadConfig: SpadConfig,
  setSpadConfig: SetterOrUpdater<SpadConfig>,
  setError: Dispatch<SetStateAction<string>>
) => {
  try {
    const response = await ChallengeAccept({
      url: `${spadConfig.address}:${spadConfig.port}`,
      token: spadConfig.token,
    });

    if (!response.Success) {
      setError("Invalid Token!");
      return;
    }

    setSpadConfig((oldValues) => ({
      ...oldValues,
      apiKey: response.Result.ApiKey,
    }));
    setError("");
  } catch (e: any) {
    setSpadConfig((oldValues) => ({
      ...oldValues,
      apiKey: "",
    }));
    setError(e.message);
  }
};

const testConnection = async (
  spadConfig: SpadConfig,
  setAircraft: Dispatch<SetStateAction<string>>,
  setStored: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>
) => {
  try {
    const currentAircraft = await DataGet({
      url: `${spadConfig.address}:${spadConfig.port}`,
      apikey: spadConfig.apiKey,
      name: "LOCAL:SPAD_AIRCRAFT",
    });

    if (!currentAircraft.Success) {
      setError("Unknown error");
      return;
    }

    const storeCredentialsReq = await fetch("/api/spad-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        remoteHost: `${spadConfig.address}:${spadConfig.port}/`,
        apiKey: spadConfig.apiKey,
      }),
    });

    const storeCredentials = await storeCredentialsReq.json();

    if (storeCredentials.message !== "Success!") {
      setError("Something failed trying to store credentials.");
      setAircraft("");
      return;
    }

    setStored(true);
    setAircraft(currentAircraft.Result.Value);
    setError("");
  } catch (e: any) {
    setAircraft("");
    setError(e.message);
  }
};

const testConnectionOnLoad = async (
  spadConfig: RemoteSpadConfig,
  setGoodRemoteConfig: Dispatch<SetStateAction<boolean>>,
  setAircraft: Dispatch<SetStateAction<string>>,
  setError: Dispatch<SetStateAction<string>>
) => {
  try {
    const currentAircraft = await DataGet({
      url: spadConfig.remoteHost || "",
      apikey: spadConfig.apiKey || "",
      name: "LOCAL:SPAD_AIRCRAFT",
    });

    if (!currentAircraft.Success) {
      setError("Unknown error");
      return;
    }

    setGoodRemoteConfig(true);
    setAircraft(currentAircraft.Result.Value);
  } catch (e: any) {
    setError(e.message);
  }
};

export { challenge, challengeAccept, testConnection, testConnectionOnLoad };
