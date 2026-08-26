/**
 * Web Speech API helper for speech synthesis (Chinese, English & Korean pronunciation)
 */

export function speakText(text: string, lang: 'zh-CN' | 'ko-KR' | 'en-US' = 'zh-CN') {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis is not supported by your browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9; // Slightly slower for clear learning pronunciation
  utterance.pitch = 1.0;

  // Try to find a voice for the specified language
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) => v.lang.startsWith(lang.slice(0, 2)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
}
