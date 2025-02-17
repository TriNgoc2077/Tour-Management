export const generateOrderCode = (number: number): string => {
    const code = `OD${String(number).padStart(8, '0')}`;
    // ${String(n)}: Chuyển đổi giá trị của biến n thành một chuỗi.
    // .padStart(8, '0'): Phương thức padStart được sử dụng để thêm ký tự '0' vào đầu chuỗi sao cho chuỗi có chiều dài là 8. Trong trường hợp này, nếu chuỗi ký tự số có chiều dài ít hơn 8, thì các ký tự '0' sẽ được thêm vào đầu chuỗi để đảm bảo chuỗi có độ dài là 8.
    // Ví dụ:
      // Nếu number = 1, kết quả sẽ là 'OD00000001'.
      // Nếu number = 20, kết quả sẽ là 'OD00000020'.
      // Nếu number = 234, kết quả sẽ là 'OD00000234'.
    return code;
  };