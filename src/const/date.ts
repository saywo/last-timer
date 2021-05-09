export const now = new Date();
export const nowDate = [
  now.getFullYear(),
  ("0" + (now.getMonth() + 1)).slice(-2),
  ("0" + now.getDate()).slice(-2),
].join("-");

export const restrictDateInput = (date: string): boolean => {
  const splitedDateArray = date ? date.split("-") : "";

  if (date === "") {
    alert("日付を入力してください");
    return false;
  } else if (splitedDateArray[0] < "1900" || nowDate < date) {
    alert("日付が正しくありません");
    return false;
  } else {
    return true;
  }
};
