  // ── Sidebar panel logic ──
  const chatListPanel = document.getElementById('chatListPanel');
  const newChatPanel  = document.getElementById('newChatPanel');
  const newChatBtn    = document.getElementById('newChatBtn');
  const backBtn       = document.getElementById('backBtn');

  newChatBtn.addEventListener('click', () => {
    chatListPanel.classList.add('hidden');
    newChatPanel.classList.add('visible');
    newChatBtn.classList.add('icon-active');
  });

  backBtn.addEventListener('click', () => {
    newChatPanel.classList.remove('visible');
    chatListPanel.classList.remove('hidden');
    newChatBtn.classList.remove('icon-active');
  });

  document.querySelectorAll('.nc-contact').forEach(el => {
    el.addEventListener('click', () => {
      newChatPanel.classList.remove('visible');
      chatListPanel.classList.remove('hidden');
      newChatBtn.classList.remove('icon-active');
    });
  });

  document.querySelectorAll('.friend-drawer--onhover').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.chat-bubble').forEach(b => {
        b.style.animation = 'none'; b.offsetHeight; b.style.animation = '';
      });
    });
  });

  // ── Call timer logic ──
  let callInterval = null;
  let callSeconds  = 0;

  function startTimer(displayId) {
    callSeconds = 0;
    callInterval = setInterval(() => {
      callSeconds++;
      const m = String(Math.floor(callSeconds/60)).padStart(2,'0');
      const s = String(callSeconds%60).padStart(2,'0');
      const el = document.getElementById(displayId);
      if (el) el.textContent = m+':'+s;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(callInterval);
    callInterval = null;
    callSeconds  = 0;
  }

  // ── Voice Call ──
  document.getElementById('callBtn').addEventListener('click', () => {
    const modal = document.getElementById('callModal');
    modal.style.display = 'flex';
    document.getElementById('callStatus').textContent = 'Calling...';
    document.getElementById('callTimer').style.display = 'none';
    setTimeout(() => {
      document.getElementById('callStatus').textContent = 'On call';
      document.getElementById('callTimer').style.display = 'block';
      startTimer('callTimer');
    }, 2000);
  });

  function closeCall() {
    document.getElementById('callModal').style.display = 'none';
    stopTimer();
  }

  function toggleMute(wrapper) {
    const icon = document.getElementById('muteIcon');
    const btn  = wrapper.querySelector('div');
    if (icon.textContent === 'mic') {
      icon.textContent = 'mic_off';
      btn.style.background = 'rgba(231,76,60,0.5)';
    } else {
      icon.textContent = 'mic';
      btn.style.background = 'rgba(255,255,255,0.15)';
    }
  }

  function toggleSpeaker(wrapper) {
    const icon = document.getElementById('speakerIcon');
    const btn  = wrapper.querySelector('div');
    if (icon.textContent === 'volume_up') {
      icon.textContent = 'volume_off';
      btn.style.background = 'rgba(231,76,60,0.5)';
    } else {
      icon.textContent = 'volume_up';
      btn.style.background = 'rgba(255,255,255,0.15)';
    }
  }

  // ── Video Call ──
  document.getElementById('videoBtn').addEventListener('click', () => {
    const modal = document.getElementById('videoModal');
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    document.getElementById('videoStatus').textContent = 'Connecting...';
    document.getElementById('videoTimer').style.display = 'none';
    setTimeout(() => {
      document.getElementById('videoStatus').textContent = '';
      document.getElementById('videoTimer').style.display = 'block';
      startTimer('videoTimer');
    }, 2000);
  });

  function closeVideo() {
    document.getElementById('videoModal').style.display = 'none';
    stopTimer();
  }

  function toggleVideoMute(wrapper) {
    const icon = document.getElementById('videoMicIcon');
    const btn  = wrapper.querySelector('div');
    if (icon.textContent === 'mic') {
      icon.textContent = 'mic_off';
      btn.style.background = 'rgba(231,76,60,0.5)';
    } else {
      icon.textContent = 'mic';
      btn.style.background = 'rgba(255,255,255,0.15)';
    }
  }

  function toggleCamera(wrapper) {
    const icon = document.getElementById('cameraIcon');
    const btn  = wrapper.querySelector('div');
    if (icon.textContent === 'videocam') {
      icon.textContent = 'videocam_off';
      btn.style.background = 'rgba(231,76,60,0.5)';
    } else {
      icon.textContent = 'videocam';
      btn.style.background = 'rgba(255,255,255,0.15)';
    }
  }

  // ── Requests panel ──
  let pendingCount = 3;

  document.getElementById('openRequestsBtn').addEventListener('click', () => {
    document.getElementById('newChatPanel').classList.remove('visible');
    document.getElementById('requestsPanel').classList.add('visible');
  });

  document.getElementById('backFromRequests').addEventListener('click', () => {
    document.getElementById('requestsPanel').classList.remove('visible');
    document.getElementById('newChatPanel').classList.add('visible');
  });

  function acceptRequest(id) {
    const row = document.getElementById(id);
    const name = row.querySelector('h6').textContent;
    row.style.transition = 'all 0.4s ease';
    row.style.opacity = '0';
    row.style.transform = 'translateX(60px)';
    setTimeout(() => { row.remove(); updateCount(-1); }, 400);
  }

  function rejectRequest(id) {
    const row = document.getElementById(id);
    row.style.transition = 'all 0.4s ease';
    row.style.opacity = '0';
    row.style.transform = 'translateX(-60px)';
    setTimeout(() => { row.remove(); updateCount(-1); }, 400);
  }

  function updateCount(delta) {
    pendingCount += delta;
    const badge = document.getElementById('requestsBadge');
    const heading = document.querySelector('#requestsPanel .new-chat-list p');
    if (pendingCount <= 0) {
      badge.style.display = 'none';
      if (heading) heading.style.display = 'none';
      document.getElementById('emptyRequests').style.display = 'block';
    } else {
      badge.textContent = pendingCount;
      if (heading) heading.textContent = 'Pendientes (' + pendingCount + ')';
    }
  }
