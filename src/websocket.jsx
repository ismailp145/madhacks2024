import React, { useEffect } from 'react';

export default function WebSocketComponent({ documentIds }) {
  useEffect(() => {
    // Create an array to hold the WebSocket connections
    const sockets = documentIds.map((documentId) => {
      const socket = new WebSocket(`ws://madhacks2024-api.vercel.app/ws/${documentId}`);

      socket.onopen = () => {
        console.log(`WebSocket connection established for document ${documentId}`);
      };

      socket.onclose = () => {
        console.log(`WebSocket connection closed for document ${documentId}`);
      };

      socket.onerror = (error) => {
        console.error(`WebSocket error for document ${documentId}:`, error);
      };

      socket.onmessage = (event) => {
        console.log(`WebSocket message received for document ${documentId}:`, event.data);
      };

      return socket;
    });

    // Send a signal to the server when the webpage is about to be closed
    const handleBeforeUnload = () => {
      sockets.forEach((socket) => {
        socket.send('Webpage is being closed');
        socket.close();
      });
    };

    // Add event listener for beforeunload event
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove event listener and close WebSocket connections
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      sockets.forEach((socket) => {
        socket.close();
      });
    };
  }, [documentIds]);

  return (
    <></>
  );
}