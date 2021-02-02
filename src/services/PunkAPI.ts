import axios from "axios"

export const PunkAPI = axios.create({
  baseURL: "https://api.punkapi.com/v2/",
})
