const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
let wsUrl = `${wsProtocol}//${window.location.host}/ws/${DIFFICULTY}`;
let ws = null;

const pegContainers = document.querySelectorAll('.peg-container');
const timeLeftSpan = document.getElementById('time-left');
const messageContainer = document.getElementById('message-container');
const messageTitle = document.getElementById('message-title');
const messageBody = document.getElementById('message-body');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

let gameState = null;
let timerInterval = null;
let currentLocalTimeLeft = 0;
let draggedDiskSize = null;
let sourcePeg = null;
let gameActive = false;

function setupWebSocket() {
    ws.onopen = () => {
        console.log("Connected to server");
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received:", data);

        switch (data.type) {
            case "init":
            case "sync":
                gameActive = true;
                gameState = data.state;
                currentLocalTimeLeft = data.state.time_left;
                renderState(gameState);
                startLocalTimer();
                hideMessage();
                break;
            case "invalid":
                gameState = data.state;
                renderState(gameState);
                break;
            case "win":
                gameActive = false;
                gameState = data.state;
                renderState(gameState);
                stopLocalTimer();
                showMessage("You Win!", data.flag, "win");
                break;
            case "timeout":
                gameActive = false;
                stopLocalTimer();
                timeLeftSpan.textContent = "0.0";
                showMessage("Game Over", data.message, "lose");
                break;
        }
    };

    ws.onclose = () => {
        console.log("Disconnected from server");
        gameActive = false;
        stopLocalTimer();
    };
}

function startLocalTimer() {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(timerInterval);
            return;
        }

        if (DIFFICULTY === "custom") {
            currentLocalTimeLeft += 0.1;
            timeLeftSpan.textContent = currentLocalTimeLeft.toFixed(1);
        } else {
            currentLocalTimeLeft -= 0.1;
            if (currentLocalTimeLeft <= 0) {
                currentLocalTimeLeft = 0;
                clearInterval(timerInterval);
            }
            timeLeftSpan.textContent = currentLocalTimeLeft.toFixed(1);
        }
    }, 100);
}

function stopLocalTimer() {
    if (timerInterval) clearInterval(timerInterval);
}

// Calculate touch offsets
let touchOffsetX = 0;
let touchOffsetY = 0;

function handleTouchStart(e) {
    if (!gameActive) return;

    const disk = e.target;
    const pegContainer = disk.closest('.peg-container');
    const disksContainer = pegContainer.querySelector('.disks');

    if (disk !== disksContainer.lastElementChild) {
        return;
    }

    sourcePeg = parseInt(pegContainer.dataset.peg);
    draggedDiskSize = parseInt(disk.dataset.size);

    const touch = e.touches[0];
    const rect = disk.getBoundingClientRect();
    touchOffsetX = touch.clientX - rect.left;
    touchOffsetY = touch.clientY - rect.top;

    // Prevent default to stop scrolling
    if (e.cancelable) e.preventDefault();

    disk.classList.add('dragging');
    disk.style.position = 'fixed';
    disk.style.zIndex = '1000';
    disk.style.width = rect.width + 'px';
    disk.style.left = (touch.clientX - touchOffsetX) + 'px';
    disk.style.top = (touch.clientY - touchOffsetY) + 'px';
}

function handleTouchMove(e) {
    const disk = e.target;
    if (!gameActive || disk.style.position !== 'fixed') return;

    const touch = e.touches[0];
    disk.style.left = (touch.clientX - touchOffsetX) + 'px';
    disk.style.top = (touch.clientY - touchOffsetY) + 'px';

    if (e.cancelable) e.preventDefault();
}

function handleTouchEnd(e) {
    const disk = e.target;
    disk.classList.remove('dragging');
    disk.style.position = '';
    disk.style.zIndex = '';
    disk.style.width = '';
    disk.style.left = '';
    disk.style.top = '';

    if (!gameActive || sourcePeg === null) return;

    const touch = e.changedTouches[0];

    // Temporarily hide the dragged disk so we can find what's underneath
    disk.style.display = 'none';
    const elementBehind = document.elementFromPoint(touch.clientX, touch.clientY);
    disk.style.display = '';

    if (elementBehind) {
        const pegContainer = elementBehind.closest('.peg-container');
        if (pegContainer) {
            const targetPeg = parseInt(pegContainer.dataset.peg);
            if (sourcePeg !== targetPeg) {
                sendMove(sourcePeg, targetPeg);
            }
        }
    }

    sourcePeg = null;
    draggedDiskSize = null;
}

function renderState(state) {
    state.pegs.forEach((pegDisks, pegIndex) => {
        const disksContainer = pegContainers[pegIndex].querySelector('.disks');
        disksContainer.innerHTML = ''; // Clear existing disks

        pegDisks.forEach(diskSize => {
            const disk = document.createElement('div');
            disk.classList.add('disk');
            disk.dataset.size = diskSize;
            disk.setAttribute('draggable', 'true');

            // Only top disk should be draggable, but for simplicity we can allow all
            // and let the server or drag start logic reject it
            disk.addEventListener('dragstart', handleDragStart);
            disk.addEventListener('dragend', handleDragEnd);
            disk.addEventListener('touchstart', handleTouchStart, {passive: false});
            disk.addEventListener('touchmove', handleTouchMove, {passive: false});
            disk.addEventListener('touchend', handleTouchEnd);

            disksContainer.appendChild(disk);
        });
    });
}

function handleDragStart(e) {
    if (!gameActive) {
        e.preventDefault();
        return;
    }

    const disk = e.target;
    const pegContainer = disk.closest('.peg-container');
    const disksContainer = pegContainer.querySelector('.disks');

    // Only allow dragging the top disk (which is the last child in the DOM since we use column-reverse)
    if (disk !== disksContainer.lastElementChild) {
        e.preventDefault();
        return;
    }

    sourcePeg = parseInt(pegContainer.dataset.peg);
    draggedDiskSize = parseInt(disk.dataset.size);

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', sourcePeg); // Just need to pass something
    setTimeout(() => disk.classList.add('dragging'), 0);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

pegContainers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    container.addEventListener('drop', e => {
        e.preventDefault();
        if (!gameActive) return;

        const targetPeg = parseInt(container.dataset.peg);
        if (sourcePeg !== null && targetPeg !== null && sourcePeg !== targetPeg) {
            sendMove(sourcePeg, targetPeg);
        }
    });
});

function sendMove(from, to) {
    if (DIFFICULTY === "custom") {
        processLocalMove(from, to);
        return;
    }
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({action: "move", from: from, to: to}));
    }
}

function processLocalMove(from, to) {
    if (!gameActive) return;
    const fromPeg = gameState.pegs[from];
    const toPeg = gameState.pegs[to];

    // Validate
    if (fromPeg.length === 0) return;
    const disk = fromPeg[fromPeg.length - 1];
    if (toPeg.length > 0 && disk > toPeg[toPeg.length - 1]) {
        // Invalid move, do nothing or re-render
        renderState(gameState);
        return;
    }

    // Move
    fromPeg.pop();
    toPeg.push(disk);

    renderState(gameState);

    // Check win
    const nVal = parseInt(document.getElementById('custom-n').value);
    if (gameState.pegs[2].length === nVal) {
        gameActive = false;
        stopLocalTimer();
        showMessage("You Win!", "Practice completed!", "win");
    }
}

function showMessage(title, body, type) {
    messageTitle.textContent = title;
    messageBody.textContent = body;
    messageContainer.className = ''; // clear hidden
    messageContainer.classList.add(type);
}

function hideMessage() {
    messageContainer.className = 'hidden';
}

const customNInput = document.getElementById('custom-n');
const customNVal = document.getElementById('custom-n-val');
if (customNInput && customNVal) {
    customNInput.addEventListener('input', (e) => {
        customNVal.textContent = e.target.value;
    });
}

function initLocalGame() {
    const nVal = parseInt(document.getElementById('custom-n').value);
    document.getElementById('custom-n').disabled = true;
    let initialPeg = [];
    for(let i=nVal; i>=1; i--) {
        initialPeg.push(i);
    }
    gameState = {
        pegs: [initialPeg, [], []],
        time_left: 0
    };
    currentLocalTimeLeft = 0;
    gameActive = true;
    renderState(gameState);
    startLocalTimer();
    hideMessage();
    startBtn.disabled = true;
    resetBtn.disabled = false;
}

resetBtn.addEventListener('click', () => {
    if (DIFFICULTY === "custom") {
        document.getElementById('custom-n').disabled = false;
        initLocalGame();
        return;
    }
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({action: "reset"}));
    } else {
        // Reconnect if disconnected
        ws = new WebSocket(wsUrl);
        setupWebSocket();
    }
});

startBtn.addEventListener('click', () => {
    if (DIFFICULTY === "custom") {
        initLocalGame();
        return;
    }
    if (!ws || ws.readyState === WebSocket.CLOSED) {
        ws = new WebSocket(wsUrl);
        setupWebSocket();
        startBtn.disabled = true;
        resetBtn.disabled = false;
    }
});

window.addEventListener('focus', () => {
    if (gameActive && ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({action: "sync"}));
    }
});
