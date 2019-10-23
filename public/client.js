const client = new WebSocket(`ws://` + location.host );

client.onmessage = function(e){
    const div = document.createElement('div');
    div.textContent = e.data;
    document.querySelector('#webchat').appendChild(div);


};

document.querySelector('#chat').addEventListener('submit', e => {
    e.preventDefault();
    const text = document.querySelector('#chat-input').value;
    client.send(text);
});
