import { browser } from "$app/environment";
import { UAParser } from "ua-parser-js";

const parser = new UAParser();

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
  let body = "";
  try {
    body = new URLSearchParams(formData as any).toString();
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) {
      throw new Error(`${res.status} : ${res.statusText}`);
    }
  } catch (err) {
    collectError("Error submitting form to Netlify", err, {
      body,
    });
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

export const collectError = (description: string, error?: any, additionalInformation?: { [name: string]: string }) => {
  if (browser) {
    gtag("event", "exception", {
      description,
      errorText: error && extractErrorText(error),
    });
    fetch("/api/monitoring/error", {
      method: "POST",
      body: JSON.stringify({
        description,
        error: extractErrorText(error),
        additionalInformation: {
          url: window.location.href,
          ua: JSON.stringify(parser.getResult()),
          ...additionalInformation,
        },
      }),
    });
  }
};
