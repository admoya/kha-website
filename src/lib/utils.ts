import { browser } from "$app/environment";

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 *
 * @param e A form submission event
 * @returns An error message if the submission failed
 */
export const submitFormToNetlify = async (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} : ${res.statusText}`);
    }
  } catch (err) {
    return getErrorMessage(err);
  }
};

export const gtag: Gtag.Gtag = function () {
  window.dataLayer.push(arguments);
};

const extractErrorText = (error: any) => {
  if (error.message) return error.message as string;
  if (typeof error === "string") return error;
  return JSON.stringify(error);
};

export const collectError = (description: string, error?: any) => {
  if (browser) {
    console.error(`Error: ${description}`);
    gtag("event", "exception", {
      description,
      errorText: error && extractErrorText(error),
    });
  }
};
