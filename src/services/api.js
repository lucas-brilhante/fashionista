import axios from 'axios'

// Get Product Catalog from API

const api = async () => {
  const response = await axios.get('https://5f184aca7c06c900160dcd19.mockapi.io/api/v1/catalog')
  return response.data
}
export default api
