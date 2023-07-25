import { useState, useEffect,useRef } from "react";
import { Navbar } from "../Navbar";
import { BannerCounter } from "./BannerCounter";
import { BannerControls } from "./BannerControls";
import { BannerSection } from "./BannerSection";
import { AiOutlinePlus } from "react-icons/ai";
import { Carousel } from "./Carousel";
import { useSelector } from "react-redux";
import { State } from "../../reducers/combinedReducer";
import { content } from "../../content";

export interface galleryState {
  variant: "carousel" | "fullsize";
  index: number;
  withAnimation: boolean;
}

export interface carouselState {
  translated: number;
  index: number;
}

export const gallerySize = 8;

export const Banner: React.FC = () => {
    const once = useRef<null|HTMLDivElement>(null)
    const [galleryState, setGalleryState] = useState<galleryState>({
    variant: "fullsize",
    index: 1,
    withAnimation: false,
  });
  const [isOutside, setOutside] = useState<null | boolean>(null);
  const isActive = useSelector((state: State) => state.section.isActive);
  
  useEffect(() => {
    setOutside(isActive);
    if (isActive) {
      window.removeEventListener("wheel", wheelhandler);
    }
    
    setGalleryState({ ...galleryState, withAnimation: false });
}, [isActive]);

const wheelhandler = () => {
    setGalleryState({
        ...galleryState,
        variant: "carousel",
        withAnimation: true,
    });
};


useEffect(() => {
    if (galleryState.variant === "fullsize" && !galleryState.withAnimation) {
        window.addEventListener("wheel", wheelhandler);
    } else {
        window.removeEventListener("wheel", wheelhandler);
    }
  }, [galleryState.variant]);
  
  return (
    <section
      ref={once}
      className={`banner ${
        isOutside === null ? "" : isOutside ? "outside" : "slideIn"
      }`}
    >
      <Navbar />
      {galleryState.variant === "carousel" ? (
        <>
          <div className="carousel--cross">
            <AiOutlinePlus />
          </div>
        </>
      ) : (
        <>
          <BannerControls
            max={gallerySize}
            variant="left"
            onClick={() => {
              if (galleryState.index < 8) {
                setGalleryState({
                  ...galleryState,
                  index: galleryState.index + 1,
                });
              }
            }}
          />
          <BannerControls
            max={gallerySize}
            variant="right"
            onClick={() => {
              if (galleryState.index > 1) {
                setGalleryState({
                  ...galleryState,
                  index: galleryState.index - 1,
                });
              }
            }}
          />
        </>
      )}
      <Carousel
        setGalleryState={setGalleryState}
        galleryState={galleryState}
      />
      <div
        className={`banner--fullsize ${
          galleryState.variant === "carousel" ? "inactive" : ""
        }`}
      >
        {content.map((el, index) => {
          return (
            <BannerSection
              key={index+el.id}
              galleryState={galleryState}
              setGalleryState={setGalleryState}
              isHidden={index + 1 !== galleryState.index}
              side={index + 1 > galleryState.index ? "right" : "left"}
              bgIndex={index}
            />
          );
        })}
      </div>

        <BannerCounter current={galleryState.index} max={gallerySize} />
    </section>
  );
};
