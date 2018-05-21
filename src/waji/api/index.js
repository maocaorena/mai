import axios from 'axios'
import http from './http'

export default {
    enterRoom(roomId) {
        return http.get(`/v2/rooms/${roomId}/in`)
    },
    getGameVideo(gameId) {
        return http.get(`/games/${gameId}/success`)
    },
    getRooms() {
        return http.get('/rooms')
    },
    startGame(roomId) {
        return http.get(`/games/start/${roomId}`)
    },
    getGameResult(gameId) {
        return http.get(`/games/${gameId}/gameresults`)
    },
    getSuccessVideos(roomId, pageNum, pageSize) {
        return http.get('/game_videos/success', { roomId, pageNum, pageSize })
    },
    delayTest() {
        return axios.get('//ws-server.wajiwaji.net/delayTest')
    },
    updateGameLog(gameId, fpsLogArray, networkDelayLogArray, operationLogArray) {
        return http.post('/games/updateGameLog', { gameId, fpsLogArray, networkDelayLogArray, operationLogArray})
    }
}
