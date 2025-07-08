async function getStatus() {
    const response = await fetch('https://api.mcsrvstat.us/3/home329.xyz');
    const body = await response.json();
    if (body.online) { // If server is online
        // Make only the online div tag visible
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('online').classList.remove('hidden');
        document.getElementById('offline').classList.add('hidden');

        // Set the message of the day
        document.getElementById('motd').textContent = body.motd.clean.join('\n');

        // Set current and max player count
        document.getElementById('currentPlayerCount').textContent = body.players.online;
        document.getElementById('maxPlayerCount').textContent = body.players.max;

        // Set current player list
        const playerList = document.getElementById('players');
        playerList.replaceChildren();
        if (body.players.list)
            for (const player of body.players.list.toSorted((a, b) => a.name - b.name)) {
                const li = document.createElement('li');
                li.textContent = player.name;
                playerList.appendChild(li);
            }

        // Set mod list
        const mods = document.getElementById('mods');
        if (body.mods) { // If mods are detected
            // Make mod list visible
            mods.classList.remove('hidden');

            // Clear and set modlist
            const modList = document.getElementById('modList');
            modList.replaceChildren();
            for (const mod of body.mods.toSorted((a, b) => a.name - b.name)) {
                const li = document.createElement('li');
                li.textContent = `${mod.name} (${mod.version})`;
                modList.append(li);
            }
        } else // If mods are not detected
            // Make mod list hidden
            mods.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', getStatus);