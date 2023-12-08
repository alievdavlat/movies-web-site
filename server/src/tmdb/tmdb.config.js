const baseUrl = process.env.TMDB_BASE_URL 

const key = process.env.TMDB_KEY


const getUrl = (endppoint, params) => {
  const qs = new URLSearchParams(params)
  return `${baseUrl}${endppoint}?api_key=${key}&${qs}`
}

export default { getUrl }

