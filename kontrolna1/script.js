function validatePair(pair) {
    const regex = /^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/;
    const match = pair.match(regex);
    if (match) {
        return {
            name: match[1].trim(),
            value: match[2].trim()
        };
    }
    return null;
}

function addPair() {
    const inputField = document.getElementById('pairInput');
    const errorBox = document.getElementById('errorMessage');
    const rawInput = inputField.value;
    const result = validatePair(rawInput);

    if (result) {
        const option = document.createElement('option');
        option.text = `${result.name}=${result.value}`;
        document.getElementById('pairList').appendChild(option);
        inputField.value = '';
        errorBox.textContent = '';
    } else {
        errorBox.textContent = 'Invalid format. Use format: Name=Value (only alphanumeric characters).';
    }
}

function sortByName() {
    const select = document.getElementById('pairList');
    const options = Array.from(select.options);

    options.sort((a, b) => {
        const nameA = a.text.split('=')[0].trim().toLowerCase();
        const nameB = b.text.split('=')[0].trim().toLowerCase();
        return nameA.localeCompare(nameB);
    });

    select.innerHTML = '';
    options.forEach(opt => select.appendChild(opt));
}

function sortByValue() {
    const select = document.getElementById('pairList');
    const options = Array.from(select.options);

    options.sort((a, b) => {
        const valA = a.text.split('=')[1].trim().toLowerCase();
        const valB = b.text.split('=')[1].trim().toLowerCase();
        return valA.localeCompare(valB);
    });

    select.innerHTML = '';
    options.forEach(opt => select.appendChild(opt));
}

function deleteSelected() {
    const select = document.getElementById('pairList');
    const selected = Array.from(select.selectedOptions);
    selected.forEach(option => option.remove());
}