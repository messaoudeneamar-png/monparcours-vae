import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    "x-webkit-speech"?: string;
  }
  interface TextareaHTMLAttributes<T> {
    "x-webkit-speech"?: string;
  }
  interface InputHTMLAttributes<T> {
    "x-webkit-speech"?: string;
  }
}
