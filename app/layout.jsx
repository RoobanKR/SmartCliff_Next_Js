"use client";

import "../public/assets/sass/styles.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-calendar/dist/Calendar.css";
import "../public/assets/css/fixedButton.css";

config.autoAddCss = false;

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { trackPageVisit } from "@/components/visitore/visitore";
import Script from "next/script";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMouseDevice, setIsMouseDevice] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Track page visit
  useEffect(() => {
    const handleRouteChange = (url) => {
      trackPageVisit({ page: url });
    };

    // initial visit
    trackPageVisit({ page: window.location.pathname });

    // subsequent navigations
    router.events?.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events?.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 120,
      easing: "ease-out",
      once: true,
    });

    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let animationFrame;

    const updatePositions = () => {
      setFollowerPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) / 6,
        y: prev.y + (mousePos.y - prev.y) / 6,
      }));

      animationFrame = requestAnimationFrame(updatePositions);
    };

    animationFrame = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Provider store={store}>
      
      <html lang="en">
        <head />
 <Head>
          {/* Visitor Queue CSS */}
          <link
            rel="dns-prefetch"
            href="//t.visitorqueue.com"
          />
          <link
            rel="stylesheet"
            href="https://p.visitorqueue.com/styles/a517ad7c-2d95-481e-9516-89f6dc83752e.css"
            id="vq_flick_styles"
          />

          {/* Inline script must be converted to Script tag */}
          <Script id="vq-init">
            {`function vqIt(){return 'fe';}`}
          </Script>

          <Script id="vq-trackid">
            {`function vqTrackId(){return 'a517ad7c-2d95-481e-9516-89f6dc83752e';}`}
          </Script>

          {/* VisitorQueue main script */}
          <Script id="visitorqueue-tracking">
            {`
              (function(d, e) {
                var el = d.createElement(e);
                el.setAttribute('id', 'vq_tracking');
                el.setAttribute('src', '//t.visitorqueue.com/p/tracking.min.js?id=' + vqTrackId());
                el.setAttribute('async', 1);
                el.setAttribute('data-id', vqTrackId());
                d.getElementsByTagName(e)[0].parentNode.appendChild(el);
              })(document, 'script');
            `}
          </Script>

          {/* Personalisation Script */}
          <Script id="vq-personalisation">
            {`
              function vqTrackPc(){return 1;}
              (function(d, e) {
                var el = d.createElement(e);
                el.setAttribute('id', 'vq_personalisation');
                el.setAttribute('src', '//personalisation.visitorqueue.com/p/personalisation.min.js?id=' + vqTrackId());
                el.setAttribute('async', 1);
                el.setAttribute('data-id', vqTrackId());
                d.getElementsByTagName(e)[0].parentNode.appendChild(el);
              })(document, 'script');
            `}
          </Script>
        </Head>
        <body>
          {/* Mouse Follower */}
          {isMouseDevice && (
            <div
              style={{
                position: "fixed",
                width: isMoving ? "1rem" : "0.7rem",
                height: isMoving ? "1rem" : "0.7rem",
                backgroundColor: "#27eb62",
                borderRadius: "50%",
                mixBlendMode: "difference",
                pointerEvents: "none",
                zIndex: 9999,
                transform: `translate(${mousePos.x - 6}px, ${mousePos.y - 6}px)`,
                transition:
                  "transform 0.08s linear, width 0.2s ease, height 0.2s ease",
                opacity: isMoving ? 1 : 0.5,
              }}
            />
          )}

          {/* Page Content */}
          {children}

          {/* Back to Top Button */}
          {showScrollButton && (
            <button className="back-to-top" onClick={scrollToTop} style={{ bottom: "50px" }}>
              <svg className="svgIcon" viewBox="0 0 384 512">
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
              </svg>
            </button>
          )}

          {/* WhatsApp Floating Button */}
          <a
            href="https://api.whatsapp.com/send?phone=918110077033&text=I+would+like+to+discuss+about+the+courses+offered"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "fixed",
              bottom: "10px",
              right: "10px",
              zIndex: 10000,
              backgroundColor: "#25D366",
              color: "white",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaWhatsapp color="white" size={19} />
          </a>

         
        </body>
      </html>
    </Provider>
  );
}
