"use client";
import { useEffect, useState } from "react";

export type DeviceInfo = {
  isMobile: boolean | null; // null for example when we are accessing through a share link which uses only SSR
  isIOS: boolean | null; // null for example when we are accessing through a share link which uses only SSR
  isAndroid: boolean | null; // null for example when we are accessing through a share link which uses only SSR
  isStandalone: boolean | null; // null for example when we are accessing through a share link which uses only SSR
  isBraveBrowser: boolean | null; // null for example when we are accessing through a share link which uses only SSR
  userAgent: string | null;
  userAgentString: string | null;
};

export function useUserAgent(): DeviceInfo {
  /**
   * we set our initial state as null because we don't know what the user agent is yet
   * that way we can check if the user agent has been set or not
   */
  // we initialize to true because we will rather optimize for mobile
  const [isMobile, setIsMobile] = useState<boolean | null>(true);
  const [isIOS, setIsIOS] = useState<boolean | null>(false);
  const [isAndroid, setIsAndroid] = useState<boolean | null>(false);
  const [isStandalone, setIsStandalone] = useState<boolean | null>(false);
  const [isBraveBrowser, setIsBraveBrowser] = useState<boolean | null>(false);
  const [userAgent, setUserAgent] = useState<string | null>(null);
  const [userAgentString, setUserAgentString] = useState<string | null>(null);

  useEffect(() => {
    if (window) {
      const userAgentString = window.navigator.userAgent;
      setUserAgentString(userAgentString);
      let userAgent;

      /**
       * Parse user agent string to determine browser
       * The order of the if statements is important because some browsers
       * have multiple matches in their user agent string
       */
      if (userAgentString.indexOf("SamsungBrowser") > -1) {
        userAgent = "SamsungBrowser";
      } else if (userAgentString.indexOf("Firefox") > -1) {
        userAgent = "Firefox";
      } else if (userAgentString.indexOf("FxiOS") > -1) {
        userAgent = "FirefoxiOS";
      } else if (userAgentString.indexOf("CriOS") > -1) {
        userAgent = "ChromeiOS";
      } else if (userAgentString.indexOf("Chrome") > -1) {
        userAgent = "Chrome";
      } else if (userAgentString.indexOf("Safari") > -1) {
        userAgent = "Safari";
      } else {
        userAgent = "unknown";
      }
      setUserAgent(userAgent);

      // Check if user agent is mobile
      // Don't change this if you don't know what you are doing
      const isIOSTemp = userAgentString.match(/iPhone|iPad|iPod/i);
      const isAndroidTemp = userAgentString.match(/Android/i);
      setIsIOS(isIOSTemp ? true : false);
      setIsAndroid(isAndroidTemp ? true : false);
      const isMobileTemp = isIOSTemp || isAndroidTemp;
      setIsMobile(!!isMobileTemp);

      // Check if app is installed (if it's installed we wont show the prompt)
      if (
        window.matchMedia("(display-mode: standalone)").matches ||
        userAgentString.startsWith("PWA")
      ) {
        setIsStandalone(true);
      }
    }
  }, []);

  return {
    isMobile,
    userAgent,
    isIOS,
    isAndroid,
    isStandalone,
    isBraveBrowser,
    userAgentString,
  };
}
