document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các nút tăng giảm số lượng
  const decreaseButtons = document.querySelectorAll(".decrease-btn");
  const increaseButtons = document.querySelectorAll(".increase-btn");

  // Lặp qua từng nút và thêm sự kiện click
  decreaseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Lấy input số lượng tương ứng
      const input = button.nextElementSibling;
      // Lấy giá trị hiện tại
      let value = parseInt(input.value);
      // Giảm giá trị nếu nó lớn hơn 1
      if (value > 1) {
        input.value = value - 1;
      }
    });
  });

  increaseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Lấy input số lượng tương ứng
      const input = button.previousElementSibling;
      // Lấy giá trị hiện tại
      let value = parseInt(input.value);
      // Tăng giá trị
      input.value = value + 1;
    });
  });
});
