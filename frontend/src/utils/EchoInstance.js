import Echo from 'laravel-echo';
import Pusher from 'pusher-js'

window.Pusher = Pusher

const pusherKey = import.meta.env.VITE_PUSHER_KEY
const cluster = import.meta.env.VITE_PUSHER_CLUSTER
const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL
const token = localStorage.getItem('authToken')

const EchoInstance = new Echo({
    broadcaster: 'pusher',
    key: pusherKey,
    cluster: cluster,
    forcedTLS: true,
    authEndpoint: backendUrl + "/broadcasting/auth",
    auth: {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    }
})

export default EchoInstance;
