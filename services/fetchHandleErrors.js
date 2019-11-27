

let fetchHandleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response
}

export { fetchHandleErrors };