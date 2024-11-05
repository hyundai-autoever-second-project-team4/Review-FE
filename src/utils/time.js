export function convertToKoreanFormat(dateStr) {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error("올바른 형식이 아닙니다. yyyy-mm-dd 형식이어야 합니다.");
  }

  const [year, month, day] = dateStr.split("-");
  return `${year}년 ${month}월 ${day}일`;
}

export function convertToISOFormat(koreanDateStr) {
  if (!koreanDateStr || !/^\d{4}년 \d{2}월 \d{2}일$/.test(koreanDateStr)) {
    throw new Error(
      "올바른 형식이 아닙니다. yyyy년 mm월 dd일 형식이어야 합니다."
    );
  }

  const year = koreanDateStr.slice(0, 4);
  const month = koreanDateStr.slice(6, 8);
  const day = koreanDateStr.slice(10, 12);

  return `${year}-${month}-${day}`;
}
