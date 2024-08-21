const ids = {
  mid: document.getElementById('mid'),
  oid: document.getElementById('oid'),
  connBtn: document.getElementById('conn'),
  msg: document.getElementById('msg'),
  sendBtn: document.getElementById('send'),
  msgBox: document.getElementById('msgBox'),
};

const peer = new Peer();

let conn = undefined;

peer.on('open', (id) => {
  ids.mid.setAttribute('value', id);
});

peer.on('connection', (_conn) => {
  if (conn !== undefined) conn.close();
  conn = _conn;
  _conn.on('open', () => {
    ids.oid.setAttribute('value', id);
    conn.send('hello');
  });
  _conn.on('data', (data) => {
    console.log(data);
  });
});

ids.connBtn.addEventListener('click', () => {
  const otherId = ids.oid.value;
  if (conn !== undefined) conn.close();
  if (otherId.length > 0) {
    conn = peer.connect(otherId);
  }
});

ids.sendBtn.addEventListener('click', () => {});

const displayMineMsg = () => {
  ids.msgBox.insertAdjacentHTML(
    'beforeend',
    `
    <div
    id="mine"
    class="text-left bg-indigo-500 rounded-md p-5 flex justify-between"
  >
    <p class="text-black p-2 rounded-md bg-white">mine</p>
    <div class="text-amber-200 font-medium">
    ${ids.msg.value}
    </div>
  </div>
  `
  );
};
const displayOtherMsg = (data) => {
  console.log(data);
  ids.msgBox.insertAdjacentHTML(
    'beforeend',
    `<div
    id="other"
    class="text-end bg-amber-500 rounded-md p-5 flex justify-between"
  >
    <div class="text-amber-200 font-medium">
    ${data}
    </div>
    <p class="text-black p-2 rounded-md bg-white">other</p>
  </div>
    `
  );
};
