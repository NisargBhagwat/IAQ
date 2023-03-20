import { loginUrl, signUpUrl } from "../routes";

export const signUp = async (signUpData) => {
  const response = await fetch(signUpUrl, {
    method: "POST",
    body: JSON.stringify(signUpData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (response.status === 409) {
    throw new Error(data.message);
  }

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch Products.");
  }

  return data.data;
};

export const login = async (loginData) => {
  const response = await fetch(loginUrl, {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (response.status === 404) {
    throw new Error(data.message);
  }

  if (response.status === 401) {
    throw new Error(data.message);
  }

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch Products.");
  }

  return data.data;
};
