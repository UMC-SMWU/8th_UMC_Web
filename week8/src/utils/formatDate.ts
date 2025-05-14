function formatDate(date: Date) {
  const now = new Date();
  const createdAt = new Date(date);
  const timeDiff = now.getTime() - createdAt.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  return `${daysDiff}일 전`;
}

export default formatDate;
