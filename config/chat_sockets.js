import { Server } from 'socket.io';

let chatSockets = function (socketServer) {
    let io = new Server(socketServer, {
        cors: {
            origin: '*',
        }
    });
    // socketIO(socketServer, {
    //     cors: {
    //         origin: '*',
    //     }
    // });

    io.sockets.on('connection', function (socket) {
        console.log('new socket connection received', socket.id);

        socket.on('disconnect', function () {
            console.log('Socket disconnected !!')
        });

        socket.on('join_room', function (data) {

            console.log('joining request to codeial chatroom received', data);
            //if a room with name data.chatroom exits it will add the user into it if not it will create a room with 
            //the same name and add the user
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message', function (data) {
            io.in(data.chatroom).emit('receive_message', data);
        })
    })
}

export default { chatSockets };