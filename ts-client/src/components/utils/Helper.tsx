export const getAuthHeader = () => {
    const token = localStorage.getItem('token')
    console.log('token:', token)
    if (token) {
        return { 'Authorization': `Bearer ${token}` }
    } else {
        console.log('warning: user cannot be authenticated')
    }
}
