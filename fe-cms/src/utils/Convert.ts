const convertAmount = (input: string) => {
  // Xóa các ký tự không phải số và khoảng trắng
  const cleanInput = input.replace(/[^\d\s]/g, "");
  // Tách các phần số
  const parts = cleanInput.split(/\s+/);
  // Lấy số lượng và đơn vị (nếu có)
  const amount = parseInt(parts[0]);
  const unit = parts[1];
  // Chuyển đổi đơn vị thành số tương ứng
  let multiplier = 1;
  if (unit === "triệu") {
    multiplier = 1000000;
  } else if (unit === "nghìn") {
    multiplier = 1000;
  }
  // Trả về giá trị sau khi chuyển đổi
  return amount * multiplier;
};




export default convertAmount;
