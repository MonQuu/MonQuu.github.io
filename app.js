document.getElementById('saveBtn').addEventListener('click', async () => {
    const content = document.getElementById('userInput').value.trim();
    if (!content) {
        alert('Please enter some text first!');
        return;
    }

    const data = {
        content: content,
        timestamp: new Date().toISOString()
    };

    try {
        // Show native file save dialog
        const handle = await window.showSaveFilePicker({
            suggestedName: 'keys.json',
            types: [{
                description: 'JSON Files',
                accept: { 'application/json': ['.json'] }
            }],
            startIn: 'documents' // or 'downloads', 'desktop', etc.
        });

        // Create writable stream
        const writable = await handle.createWritable();
        await writable.write(JSON.stringify(data, null, 2));
        await writable.close();

        document.getElementById('status').textContent = 
            'Successfully saved to: ' + (handle.name || 'keys.json');
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Error saving file:', err);
            alert('Error saving file: ' + err.message);
        }
    }
});