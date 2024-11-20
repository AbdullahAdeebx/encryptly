let currentKey = null;

// Mode switching
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mode = btn.dataset.mode;
        if (mode === 'encrypt') {
            document.getElementById('encrypt-section').classList.remove('hidden');
            document.getElementById('decrypt-section').classList.add('hidden');
        } else {
            document.getElementById('encrypt-section').classList.add('hidden');
            document.getElementById('decrypt-section').classList.remove('hidden');
        }
    });
});

// Encryption functionality
document.getElementById('generateKey').addEventListener('click', async () => {
    const response = await fetch('/generate-key');
    const data = await response.json();
    currentKey = data.key;

    const keyContainer = document.getElementById('keyContainer');
    const keyDisplay = document.getElementById('keyDisplay');

    keyDisplay.value = currentKey;
    keyContainer.classList.remove('hidden');
    updateEncryptButton();
});

document.getElementById('downloadKey').addEventListener('click', () => {
    if (!currentKey) return;

    const blob = new Blob([currentKey], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'encryption_key.key';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});

// Decryption functionality
document.getElementById('keyFileInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        try {
            const text = await file.text();
            document.getElementById('decryptKeyInput').value = text.trim();
            updateDecryptButton();
        } catch (error) {
            alert('Error reading key file');
        }
    }
});

document.getElementById('decryptKeyInput').addEventListener('input', () => {
    updateDecryptButton();
});

document.getElementById('encryptFileInput').addEventListener('change', () => {
    updateEncryptButton();
});

document.getElementById('decryptFileInput').addEventListener('change', () => {
    updateDecryptButton();
});

document.getElementById('encryptButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('encryptFileInput');
    const file = fileInput.files[0];

    if (!file || !currentKey) {
        alert('Please select a file and generate a key first');
        return;
    }

    const encryptButton = document.getElementById('encryptButton');
    encryptButton.disabled = true;
    encryptButton.textContent = 'Encrypting...';

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('key', currentKey);

        const response = await fetch('/encrypt', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Encryption failed');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `encrypted_${file.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

    } catch (error) {
        alert(error.message);
    } finally {
        encryptButton.disabled = false;
        encryptButton.textContent = 'Encrypt File';
    }
});

document.getElementById('decryptButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('decryptFileInput');
    const keyInput = document.getElementById('decryptKeyInput');
    const file = fileInput.files[0];
    let key = keyInput.value.trim();

    if (!file || !key) {
        alert('Please select a file and provide a decryption key');
        return;
    }

    const decryptButton = document.getElementById('decryptButton');
    decryptButton.disabled = true;
    decryptButton.textContent = 'Decrypting...';

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('key', key);

        const response = await fetch('/decrypt', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Decryption failed');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `decrypted_${file.name.replace('encrypted_', '')}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

    } catch (error) {
        alert(error.message);
    } finally {
        decryptButton.disabled = false;
        decryptButton.textContent = 'Decrypt File';
    }
});

function updateEncryptButton() {
    const fileInput = document.getElementById('encryptFileInput');
    const encryptButton = document.getElementById('encryptButton');
    encryptButton.disabled = !(fileInput.files.length > 0 && currentKey);
}

function updateDecryptButton() {
    const fileInput = document.getElementById('decryptFileInput');
    const keyInput = document.getElementById('decryptKeyInput');
    const decryptButton = document.getElementById('decryptButton');
    decryptButton.disabled = !(fileInput.files.length > 0 && keyInput.value.trim());
}
