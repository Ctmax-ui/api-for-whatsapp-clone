const io = require('socket.io')(5000, {
	cors: {
		origin: "*",
	}
})


io.on('connection', socket => {
    
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, textMessage }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('recive-message', {
        recipients: newRecipients, sender: id, textMessage
      })
    })
  })
})