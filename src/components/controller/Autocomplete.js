const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search words.json and filter it
const searchWords = async searchText => {
    const res = await fetch('words.json');
    const words = await res.json();


    // Get matches to current text input
    let matches = words.filter(word => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return word.name.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
}
    outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
            <div>
            <h4>${match.name}</h4>
            </div>
        `).join('');

    matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchWords(search.value));