import io from 'socket.io-client';
let socket;
export const initiateSocket = async(room, cb) => {
    socket = await io('https://telegram-rebuild-backend.herokuapp.com', { query: { roomId: room.id } });

    socket.on('chat', msg => {
        return cb(null, msg);
    });

}
export const disconnectSocket = () => {

    if (socket) socket.disconnect();
}

export const sendMessageIO = (message) => {
    if (socket) socket.emit('chat', message);
}