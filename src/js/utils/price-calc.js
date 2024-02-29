export const calculator = () => {
  let totalPrice = 0;
  const priceDisplay = document.querySelector('[data-calc="total-price"]');
  const resetButton = document.querySelector('[data-calc="reset"]');
  const radioGroups = document.querySelectorAll('[data-calc="radio-group"]');
  const checkboxGroups = document.querySelectorAll('[data-calc="check-group"]');
  const currentSelection = {};

  console.log("Initializing calculator...");

  // Function to update total price
  const updateTotalPrice = () => {
    console.log("Updating total price:", totalPrice);
    priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
  };

  // Function to calculate percentage price
  const calculatePercentagePrice = (basePrice, percentage) => {
    return basePrice + (basePrice * percentage) / 100;
  };

  // Event listeners for radio options
  radioGroups.forEach((group, index) => {
    const answers = group.querySelectorAll('[data-calc="answer"]');
    answers.forEach((answer) => {
      answer.addEventListener("click", () => {
        const price = parseInt(answer.getAttribute("data-answer"), 10);
        const isPercentage = answer.hasAttribute("data-calc-percentage");
        console.log(
          `Radio option clicked: Price = ${price}, Is Percentage = ${isPercentage}`,
        );
        if (currentSelection[index] !== answer) {
          if (currentSelection[index]) {
            let previousPrice = parseInt(
              currentSelection[index].getAttribute("data-answer"),
              10,
            );
            if (currentSelection[index].hasAttribute("data-calc-percentage")) {
              previousPrice =
                calculatePercentagePrice(
                  totalPrice - previousPrice,
                  previousPrice,
                ) -
                (totalPrice - previousPrice);
            }
            totalPrice -= previousPrice;
            currentSelection[index].classList.remove("is--checked");
          }
          let finalPrice = price;
          if (isPercentage) {
            finalPrice =
              calculatePercentagePrice(totalPrice, price) - totalPrice;
          }
          totalPrice += finalPrice;
          answer.classList.add("is--checked");
          currentSelection[index] = answer;
        }
        updateTotalPrice();
      });
    });
  });

  // Event listeners for checkbox options
  checkboxGroups.forEach((group) => {
    const answers = group.querySelectorAll('[data-calc="answer"]');
    answers.forEach((answer) => {
      answer.addEventListener("click", () => {
        const price = parseInt(answer.getAttribute("data-answer"), 10);
        const isPercentage = answer.hasAttribute("data-calc-percentage");
        console.log(
          `Checkbox option clicked: Price = ${price}, Is Percentage = ${isPercentage}`,
        );
        if (answer.classList.contains("is--checked")) {
          let finalPrice = price;
          if (isPercentage) {
            finalPrice =
              calculatePercentagePrice(totalPrice, price) - totalPrice;
          }
          totalPrice -= finalPrice;
          answer.classList.remove("is--checked");
        } else {
          let finalPrice = price;
          if (isPercentage) {
            finalPrice =
              calculatePercentagePrice(totalPrice, price) - totalPrice;
          }
          totalPrice += finalPrice;
          answer.classList.add("is--checked");
        }
        updateTotalPrice();
      });
    });
  });

  // Reset functionality
  resetButton.addEventListener("click", () => {
    console.log("Reset button clicked");
    totalPrice = 0;
    Object.keys(currentSelection).forEach((key) => {
      if (currentSelection[key]) {
        currentSelection[key].classList.remove("is--checked");
      }
    });
    checkboxGroups.forEach((group) => {
      group
        .querySelectorAll('[data-calc="answer"]')
        .forEach((answer) => answer.classList.remove("is--checked"));
    });
    updateTotalPrice();
  });

  // Initialize total price display
  updateTotalPrice();
};
