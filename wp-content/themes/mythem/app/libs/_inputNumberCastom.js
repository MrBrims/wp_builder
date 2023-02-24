export function inputNumberCastom () {
  const formCounts = document.querySelectorAll(".form__counter");
  if (!formCounts.length) {
    return;
  }

  formCounts.forEach(item => {
    item.onclick = (e) => {
      const target = e.target;

      if (target.classList.contains("counter-btn")) {
        let input = item.querySelector(".count-input");
        let min = input.getAttribute("min");
        let max = input.getAttribute("max");
        let step = input.getAttribute("step");
        let val = input.getAttribute("value");

        let id = target.getAttribute("data-id")
        let calcStep = (id === "increment") ? (step * 1) : (step * -1);
        let newValue = parseInt(val) + calcStep;

        if (newValue >= min && newValue <= max) {
          input.setAttribute("value", newValue);
        }
      }
    };
  });

}