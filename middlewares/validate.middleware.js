import { URL } from "url";
import { ApiError } from "../utils/apiError.js";

const normalizeUrl = (str) => {
  try {
    const url = new URL(str);

    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
    }

    if (url.pathname !== "/") {
      url.pathname = url.pathname.replace(/\/+$/, "");
    }

    return url.toString();
  } catch (err) {
    throw new ApiError(400, "Invalid URL format");
  }
};

const validateUrl = (req, res, next) => {
  const { url } = req.body;

  if (!url) {
    throw new ApiError(400, "URL is required");
  }

  try {
    const normalizedUrl = normalizeUrl(url);
    req.body.url = normalizedUrl;
  } catch (err) {
    throw new ApiError(400, "Invalid URL format");
  }

  next();
};

export { validateUrl };
