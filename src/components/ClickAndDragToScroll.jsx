import { useState, useRef, useEffect } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
let startX;
let scrollLeft;

function ClickAndDragToScroll() {
  const [isDown, setIsDown] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const sliderRef = useRef();
  const sliderElement = sliderRef.current;
  const cursorRef = useRef();
  const cursorElement = cursorRef.current;

  const handleMouseDown = (e) => {
    if (isShown) {
      setIsDown(true);
      startX = e.pageX - sliderElement.offsetLeft;
      scrollLeft = sliderElement.scrollLeft;
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsDown(false);
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();

    setIsShown(false);
    setIsDown(false);
  };

  const handleMouseEnter = (e) => {
    e.preventDefault();

    setIsShown(true);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (isShown) {
      const height = cursorElement.offsetHeight;
      const width = cursorElement.offsetWidth;
      setTimeout(() => {
        cursorElement.style.left = `${e.pageX - width / 2}px`;
        cursorElement.style.top = `${e.pageY - height / 2}px`;
      }, 200);
    }

    if (!isDown) return;
    const x = e.pageX - sliderElement.offsetLeft;
    const walk = (x - startX) * 3;
    sliderElement.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    if (isShown) {
      setTimeout(() => {
        cursorElement.classList.remove("scale-0");
        cursorElement.classList.add("scale-100");
      }, 200);
    } else {
      setTimeout(() => {
        cursorElement.classList.remove("scale-100");
        cursorElement.classList.add("scale-0");
      }, 200);
    }
  }, [isShown]);

  useEffect(() => {
    if (isDown && isShown) {
      setTimeout(() => {
        cursorElement.classList.remove("scale-100");
        cursorElement.classList.add("scale-50");
      });
    } else {
      setTimeout(() => {
        cursorElement.classList.remove("scale-50");
        cursorElement.classList.add("scale-100");
      }, 200);
    }
  }, [isDown]);

  return (
    <>
      <div
        className="cursor scale-0 bg-orange-600 font-bold text-white transition-transform  duration-300"
        ref={cursorRef}
      >
        {isDown === false ? (
          <p className="text-sm font-bold">DRAG</p>
        ) : (
          <div className="flex gap-32 text-orange-600">
            <AiFillCaretLeft size={64} />
            <AiFillCaretRight size={64} />
          </div>
        )}
      </div>
      <div
        className="scroll-container py-5"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="scroll-item">
          <button
            className="rounded-full bg-fuchsia-600 p-5 hover:scale-105"
            onMouseEnter={handleMouseLeave}
            onMouseLeave={handleMouseEnter}
          >
            Hello
          </button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
            obcaecati tenetur possimus deserunt maiores expedita ratione,
            officiis mollitia architecto iusto sed cupiditate beatae accusamus
            explicabo!
          </p>
        </div>
        <div className="scroll-item"></div>
        <div className="scroll-item"></div>
      </div>
    </>
  );
}

export default ClickAndDragToScroll;
