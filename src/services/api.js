import axios from 'axios'

// Get Product Catalog from API

const api = async () => {
  const response = await axios.get('https://undefined.netlify.app/api/catalog')
  return response.data
}
export default api
