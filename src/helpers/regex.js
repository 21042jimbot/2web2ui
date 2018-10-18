export const usernameRegex = /^[a-z0-9_\-.]+$/;
export const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;
export const portRegex = /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;
export const domainRegex = /^(?!:\/\/)([a-z0-9-]+\.)*[a-z0-9][a-z0-9-]+\.[a-z]{2,63}$/i;
export const newlineStrRegex = /\\r\\n|\\n/g;
export const spacesRegex = /\s+/g;
export const slugRegex = /^[a-z0-9_-]+$/i;
