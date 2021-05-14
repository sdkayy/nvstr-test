import React from "react";
import "./spinner.css";

export const RefreshSpinner = ({ isRefreshing, fill, size }) => {
  return (
    <div
      className={`${isRefreshing ? "spin" : ""}`}
      style={{
        width: size || "32px",
        height: size || "32px",
        color: fill || "lightblue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        width={size || "32px"}
        height={size || "32px"}
        viewBox="0 0 512 512"
      >
        <g class="fa-group">
          <path
            fill="currentColor"
            d="M0 500V299.67a12 12 0 0 1 12-12h200.33a12 12 0 0 1 12 12v47.41a12 12 0 0 1-12.57 12l-101.87-4.88a176.07 176.07 0 0 0 317.25-56.94 12 12 0 0 1 11.67-9.26h49.09a12 12 0 0 1 11.8 14.18C478.07 417.08 377.19 504 256 504a247.43 247.43 0 0 1-188.76-87.17l4.13 82.57a12 12 0 0 1-12 12.6H12a12 12 0 0 1-12-12z"
            style={{ opacity: 1 }}
          />
          <path
            fill="currentColor"
            d="M12.3 209.82C33.93 94.92 134.81 8 256 8a247.4 247.4 0 0 1 188.9 87.34l-4-82.77A12 12 0 0 1 452.92 0h47.41a12 12 0 0 1 12 12v200.33a12 12 0 0 1-12 12H300a12 12 0 0 1-12-12v-47.41a12 12 0 0 1 12.57-12l101.53 4.88a176.07 176.07 0 0 0-317.24 56.94A12 12 0 0 1 73.19 224H24.1a12 12 0 0 1-11.8-14.18z"
            style={{ opacity: 1 }}
          />
        </g>
      </svg>
    </div>
  );
};

export const Spinner = ({ fill, size }) => {
  return (
    <div
      class="spin"
      style={{
        width: size || "32px",
        height: size || "32px",
        color: fill || "lightblue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        width={size || "32px"}
        height={size || "32px"}
        viewBox="0 0 512 512"
      >
        <g class="fa-group">
          <path
            fill="currentColor"
            d="M478.71 364.58zm-22 6.11l-27.83-15.9a15.92 15.92 0 0 1-6.94-19.2A184 184 0 1 1 256 72c5.89 0 11.71.29 17.46.83-.74-.07-1.48-.15-2.23-.21-8.49-.69-15.23-7.31-15.23-15.83v-32a16 16 0 0 1 15.34-16C266.24 8.46 261.18 8 256 8 119 8 8 119 8 256s111 248 248 248c98 0 182.42-56.95 222.71-139.42-4.13 7.86-14.23 10.55-22 6.11z"
            style={{ opacity: 0.2 }}
          />
          <path
            fill="currentColor"
            d="M271.23 72.62c-8.49-.69-15.23-7.31-15.23-15.83V24.73c0-9.11 7.67-16.78 16.77-16.17C401.92 17.18 504 124.67 504 256a246 246 0 0 1-25 108.24c-4 8.17-14.37 11-22.26 6.45l-27.84-15.9c-7.41-4.23-9.83-13.35-6.2-21.07A182.53 182.53 0 0 0 440 256c0-96.49-74.27-175.63-168.77-183.38z"
            style={{ opacity: 1 }}
          />
        </g>
      </svg>
    </div>
  );
};
