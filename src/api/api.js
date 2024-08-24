export const getCommonMasterData = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

// export const getBloodGroups = () => {
//   return fetch("http://127.0.0.1:8000/master/blood_groups")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok " + response.statusText);
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       console.error("There was a problem with the fetch operation:", error);
//     });
// };
