import { Request, Response, NextFunction } from 'express';
import Url, { IUrl } from '../models/Url';
import { nanoid } from 'nanoid';
import validUrl from 'valid-url';

export const shortenUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ message: 'longUrl required' });

    if (!validUrl.isUri(longUrl)) {
      return res.status(400).json({ message: 'Invalid URL' });
    }

    const shortCode = nanoid(8);

    const newUrl: IUrl = new Url({ longUrl, shortCode });
    await newUrl.save();

    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    res.json({ longUrl, shortUrl: `${baseUrl}/api/${shortCode}` });
  } catch (error) {
    next(error);
  }
};

export const redirectUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { shortId } = req.params;

    // MongoDB'den shortCode ile bul
    const url = await Url.findOne({ shortCode: shortId });

    if (url) {
      // Tıklama sayısını artır
      url.clicks++;
      await url.save();

      // Uzun URL’ye yönlendir
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    next(error);
  }
};