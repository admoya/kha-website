export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

/**
 * 
 * @param e A form submission event
 * @returns An error message if the submission failed
 */
export const submitFormToNetlify = async (e: SubmitEvent) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  try {
    await fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    });
  } catch (err) {
    return getErrorMessage(err);
  }
}