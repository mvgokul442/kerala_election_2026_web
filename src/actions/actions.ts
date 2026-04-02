export function getParties() {
    return fetch('https://kerala-election-2026.onrender.com/parties')
        .then((res) => res.json())
        .then((data) => data
        );
}

export function getConstituncy() {
    return fetch('https://kerala-election-2026.onrender.com/constituencies')
        .then((res) => res.json())
        .then((data) => data
        );
}

export function getCandidateCount() {
    return fetch('https://kerala-election-2026.onrender.com/candidates/stats')
        .then((res) => res.json())
        .then((data) => data
        );
}
