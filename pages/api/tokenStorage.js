// src/memoryStorage.js

// 전역 변수를 사용하여 토큰 목록을 저장
global.savedPushTokens = global.savedPushTokens || [];

export const saveToken = (newToken) => {
    // newToken.data를 기준으로 중복 검사
    const isDuplicate = global.savedPushTokens.some(token => token.data === newToken.data);
    if (!isDuplicate) {
      global.savedPushTokens.push(newToken);
    }
  };

export const getTokens = () => {
  return global.savedPushTokens;
};