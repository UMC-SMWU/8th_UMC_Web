export const timeAgo = (date: string | Date) => {
    const now = new Date();
    const target = new Date(date);
    const diff = Math.floor((now.getTime() - target.getTime()) / 1000); // 초
  
    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };
  