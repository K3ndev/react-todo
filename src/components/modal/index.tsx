import DOMPurify from "dompurify";
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useTodoStore } from "../../../store/todoStore";

type ModalLoginType = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type storeType = {
  addName: (argName: string) => void;
};

export function ModalLogin(props: ModalLoginType) {
  const { addName } = useTodoStore<storeType>((states) => states);
  const { setIsModalOpen } = props;
  const modalParent = document.getElementById("render-modal");
  const [modalCurrent, setModalCurrent] = useState(1);
  const inputNameRef = useRef<HTMLInputElement>(null);

  const continueHandler = () => {
    if (modalCurrent === 3) {
      setIsModalOpen(false);
      return;
    }
    setModalCurrent((prev) => {
      return prev + 1;
    });
  };

  if (!modalParent) {
    return null;
  }

  const addNameHandler = () => {
    if (inputNameRef.current) {
      if (inputNameRef.current.value === "") {
        return;
      }
      if (DOMPurify.sanitize(inputNameRef.current.value) === "") {
        inputNameRef.current.value = "";
        return;
      }
    }

    if (inputNameRef.current) {
      continueHandler();
      addName(inputNameRef.current.value);
    }
  };

  return createPortal(
    <div className="absolute inset-0 modal-background-back z-50">
      <div className="flex justify-center items-center w-full h-full ">
        {/* modal */}
        <div className="w-full h-full md:w-[31.25rem] md:h-[31.25rem] modal-background md:rounded-2xl shadow-2xl p-10">
          <div className="h-2/4 flex justify-center items-center">
            <img
              src="/dona_Avatar.svg"
              alt="logo"
              className="rounded-2xl bg-white p-4 shadow-2xl"
            />
          </div>
          <div className="h-2/4 flex items-center">
            <div>
              {modalCurrent === 1 && (
                <>
                  <h2 className="mb-2 text-xl font-medium ">
                    Welcome to React Todo
                  </h2>
                  <p className="mb-7 text-gray-500 text-sm w-3/5">
                    React Todo is a back to-do list focused on fast and
                    delightful user experience.
                  </p>
                </>
              )}
              {modalCurrent === 2 && (
                <>
                  <h2 className="mb-2 text-xl font-medium ">Powerful lists</h2>
                  <p className="mb-7 text-gray-500 text-sm w-3/5">
                    Organize your tasks into fully customizable lists.
                  </p>
                </>
              )}
              {modalCurrent === 3 && (
                <>
                  <h2 className="mb-2 text-xl font-medium ">
                    What's your name?
                  </h2>
                  <div className="mb-7">
                    <input
                      type="text"
                      placeholder="Type it here..."
                      ref={inputNameRef}
                    />
                  </div>
                </>
              )}

              {modalCurrent !== 3 && (
                <button
                  className="bg-[#008FFD] rounded-lg text-white py-3 px-6 md:py-2 md:px-5 text-sm mb-7 hover:shadow-lg hover:bg-[#007cdb]"
                  onClick={() => {
                    continueHandler();
                  }}
                >
                  Continue
                </button>
              )}

              {modalCurrent === 3 && (
                <div className="flex gap-2">
                  <button
                    className="bg-[#008FFD] rounded-lg text-white py-3 px-6 md:py-2 md:px-5 text-sm mb-7 hover:shadow-lg hover:bg-[#007cdb]"
                    onClick={() => {
                      addNameHandler();
                    }}
                  >
                    Continue
                  </button>
                  <button
                    className="bg-white rounded-lg text-[#008FFD] py-3 px-6 md:py-2 md:px-5 text-sm mb-7 shadow-lg border flex items-center"
                    onClick={() => {
                      console.log("not yet available");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      className="inline w-4 mr-1"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M16 20h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3v16zM5 20h3V4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1zM16 4l-4 4l-4-4" />
                        <path d="m4 6.5l8 7.5l8-7.5" />
                      </g>
                    </svg>
                    Gmail
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <svg viewBox="0 0 70 10" width="70">
              <circle
                cx="5"
                cy="5"
                r="5"
                fill={modalCurrent === 1 ? "#008FFD" : "#d9d9d9"}
              ></circle>
              <circle
                cx="25"
                cy="5"
                r="5"
                fill={modalCurrent === 2 ? "#008FFD" : "#d9d9d9"}
              ></circle>
              <circle
                cx="45"
                cy="5"
                r="5"
                fill={modalCurrent === 3 ? "#008FFD" : "#d9d9d9"}
              ></circle>
            </svg>
          </div>
        </div>
      </div>
    </div>,
    modalParent
  );
}
