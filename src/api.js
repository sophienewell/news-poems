import axios from "axios";

const searchContent = async (term) => {
  const response = await axios.get("https://content.guardianapis.com/search?", {
    //headers: {},
    params: {
      q: term,
      "api-key": "91812735-6ce1-473f-a878-c5d1881903c6",
    },
  });
  return response.data.response.results;
};

export default searchContent;
