function start() {
  const stopwatch = document.querySelector(".stopwatch");
  const cells = Array.from(stopwatch.children).filter(
    (el) => el.nodeName === "SPAN"
  );
  let currentIndex = 0;

  stopwatch.addEventListener("focus", onFocus);
  stopwatch.addEventListener("blur", onBlur);

  function onFocus() {
    stopwatch.contentEditable = true;
    cells[currentIndex].classList.add("active");
    document.addEventListener("keydown", keyboardHandler);
  }

  function onBlur() {
    stopwatch.contentEditable = false;
    cells[currentIndex].classList.remove("active");
    document.removeEventListener("keydown", keyboardHandler);
  }

  /* Обработчик событий клавиатуры */

  function keyboardHandler(event) {
    console.log(event.key)
    if ((event.type = "keydown")) {
      event.preventDefault();

      switch (event.keyCode) {
        case 8:
          cellController(event.key);
          break;
        case 37:
          cellController(event.key);
          break;
        case 39:
          cellController(event.key);
          break;
        case 27:
          cellController(event.key);
        default:
          if (event.key >= 0 && event.key <= 9 && event.key != " ") {
            cellController(event.key);
          }
      }
    }
  }

  /*  */

  function cellController(key) {
    const caretMoveFn = () => {
      cells[currentIndex].classList.add("active");
    };

    const backspaceFn = () => {
      clearCell(currentIndex);

      if (currentIndex > 0) {
        cells[currentIndex].classList.remove("active");
        currentIndex--;
        caretMoveFn();
      }
    };

    const arrowRightFn = () => {
      if (currentIndex < cells.length - 1) {
        cells[currentIndex].classList.remove("active");
        currentIndex++;
        caretMoveFn();
      }
    };

    const arrowLeftFn = () => {
      if (currentIndex > 0) {
        cells[currentIndex].classList.remove("active");
        currentIndex--;
        caretMoveFn();
      }
    };

    const escapeFn = () => {
      stopwatch.blur();
    };

    switch (key) {
      case "Backspace":
        backspaceFn();
        break;
      case "ArrowRight":
        arrowRightFn();
        break;
      case "ArrowLeft":
        arrowLeftFn();
        break;
      case "Escape":
        escapeFn();
        break;
      default:
        setCell(currentIndex, key);
        arrowRightFn();
    }
  }

  function clearCell(index) {
    cells[index].innerHTML = "";
    cells[index].classList.remove("filled");
  }

  function setCell(index, value) {
    cells[index].classList.add("filled");
    cells[index].innerHTML = value;
  }
}

start();
