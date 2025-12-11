const getStatusColor = (status: string): string => {
    switch (status) {
      case "Đang xử lý":
        return "#FFCC00";
      case "Đã xác nhận":
        return "#FF6600";
      case "Đang giao hàng":
        return "#0099FF";
      case "Đơn hàng thành công":
        return "green";
      case "Đơn hàng bị huỷ":
        return "#666666";
      default:
        return ""; // Màu mặc định nếu không khớp với trạng thái nào
    }
  };

  export default getStatusColor;