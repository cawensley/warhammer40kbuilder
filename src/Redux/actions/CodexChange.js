export default function CodexChange(codexID) {
    localStorage.setItem('CodexSelected', codexID);
    return { type: 'Codex_Change', payload: codexID };
}