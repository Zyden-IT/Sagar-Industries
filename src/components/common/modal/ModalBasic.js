"use client";

import Transition from "@/utils/Transition";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function ModalBasic({
  children,
  id,
  className = "",
  title,
  modalOpen,
  setModalOpen,
  noCloseIcon,
  scrollPopUp = false,
}) {
  const modalContent = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Wait until we're on the client before portalling (SSR safety)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const keyHandler = (e) => {
      if (!modalOpen || e.key !== "Escape") return;
      setModalOpen(false);
    };

    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, [modalOpen, setModalOpen]);

  // Scroll top
  useEffect(() => {
    if (modalContent.current) {
      modalContent.current.scrollTop = 0;
    }
  }, [scrollPopUp]);

  // Body scroll lock
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  if (!modalOpen || !mounted) return null;

  const modalMarkup = (
    <>
      {/* Overlay */}
      <Transition
        show={true}
        appear={true}
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-[4px]"
        enter="transition ease-out duration-300"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
        onClick={() => setModalOpen(false)}
      />

      {/* Modal */}
      <Transition
        id={id}
        show={true}
        appear={true}
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto hide-scrollbar px-4 py-6 sm:px-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `${id}-title` : undefined}
        enter="transition ease-out duration-300"
        enterStart="opacity-0 translate-y-8 scale-[0.96]"
        enterEnd="opacity-100 translate-y-0 scale-100"
        leave="transition ease-in duration-200"
        leaveStart="opacity-100 translate-y-0 scale-100"
        leaveEnd="opacity-0 translate-y-6 scale-[0.98]"
        onClick={() => setModalOpen(false)}
      >
        {/* Modal Content */}
        <div
          ref={modalContent}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-h-[90vh] overflow-y-auto hide-scrollbar rounded-[28px] border border-border bg-card shadow-[0_30px_80px_rgba(0,0,0,0.20)] ${className}`}
        >
          {/* Close Button */}
          {!noCloseIcon && (
            <button
              type="button"
              aria-label="Close Modal"
              onClick={() => setModalOpen(false)}
              className="btn absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-text-primary transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
              </svg>
            </button>
          )}

          {/* Title */}
          {title && (
            <div className="px-6 pt-6 sm:px-8">
              <h2
                id={`${id}-title`}
                className="font-semibold text-text-primary"
              >
                {title}
              </h2>
            </div>
          )}

          {/* Body */}
          <div>{children}</div>
        </div>
      </Transition>
    </>
  );

  // Portal to body so the modal escapes any ancestor transform/filter/will-change
  // stacking context (e.g. product card's whileHover transform), guaranteeing the
  // overlay covers everything beneath it.
  return createPortal(modalMarkup, document.body);
}

export default ModalBasic;