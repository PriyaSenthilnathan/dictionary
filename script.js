const input = document.querySelector('input');
const btn = document.querySelector('button');
const dictionary = document.querySelector('.dictionary-app');

async function dictionaryFn(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();

    return data[0]; // Access the first entry
}

btn.addEventListener('click', fetchandCreateCard);

async function fetchandCreateCard() {
    const data = await dictionaryFn(input.value); // Ensure data is awaited
    console.log(data);

    if (!data || !data.meanings || data.meanings.length === 0) {
        dictionary.innerHTML = `<p>No data found for this word.</p>`;
        return;
    }

    let partOfSpeechArray = [];
    for (let i = 0; i < data.meanings.length; i++) {
        if (data.meanings[i].partOfSpeech) {
            partOfSpeechArray.push(data.meanings[i].partOfSpeech);
        }
    }

    dictionary.innerHTML = `
        <div class="card">
            <div class="property">
                <span>Word:</span>
                <span>${data.word || 'N/A'}</span>
            </div>
            <div class="property">
                <span>Phonetics:</span>
                <span>${data.phonetic || 'N/A'}</span>
            </div>
            <div class="property">
                <span>
                    <audio controls src="${data.phonetics[0]?.audio || ''}"></audio>
                </span>
            </div>
            <div class="property">
                <span>Definition:</span>
                <span>${data.meanings[0].definitions[0]?.definition || 'N/A'}</span>
            </div>
            <div class="property">
                <span>${data.meanings[1]?.definitions[0]?.example || 'No example available'}</span>
            </div>
            <div class="property">
                <span>${partOfSpeechArray.join(', ')}</span>
            </div>
        </div>`;
}
