export const getFio = (query) => {
  const url =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio";
  const token = "ccc3bbd0732af91619e72511c449302fa734e82f";
  const secret = "b368649ba672a0f7771a275ca697c4a8a7911c92";

  let fioList = [];

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
      "X-Secret": secret,
    },
    body: JSON.stringify({ query: query }),
  };

  return fetch(url, options)
    .then((response) => response.text())
    .then((result) => {
      fioList = JSON.parse(result).suggestions;
      return fioList;
    })
    .catch((error) => console.log("error", error));
};

export const getAddress = (query) => {
    const url =
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    const token = "ccc3bbd0732af91619e72511c449302fa734e82f";
    const secret = "b368649ba672a0f7771a275ca697c4a8a7911c92";
  
    let fioList = [];
  
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
        "X-Secret": secret,
      },
      body: JSON.stringify({ query: query }),
    };
  
    return fetch(url, options)
      .then((response) => response.text())
      .then((result) => {
        fioList = JSON.parse(result).suggestions;
        return fioList;
      })
      .catch((error) => console.log("error", error));
  };