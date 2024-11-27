import { nanoid } from "nanoid";
import { Url } from "../models/url.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const shortenUrl = asyncHandler(async (req, res) => {
  const { url } = req.body;

  let existingUrl = await Url.findOne({ originalUrl: url });

  if (existingUrl) {
    throw new ApiError(400, "URL already exists", [], {
      shortUrl: `${req.protocol}://${req.get("host")}/${existingUrl.shortId}`,
    });
  }

  const shortId = nanoid(10);

  const newUrl = await Url.create({
    originalUrl: url,
    shortId,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
        ...newUrl.toObject(),
      },
      "URL created successfully"
    )
  );
});

const redirectToUrl = asyncHandler(async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  await Url.findByIdAndUpdate(url._id, {
    $inc: { clicks: 1 },
    lastAccessed: Date.now(),
  });

  res.redirect(url.originalUrl);
});

const getUrlStats = asyncHandler(async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, url, "URL stats fetched successfully"));
});

export { getUrlStats, redirectToUrl, shortenUrl };
