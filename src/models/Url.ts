import mongoose, { Document, Schema } from 'mongoose';

export interface IUrl extends Document {
    longUrl: string;
    shortCode: string;
    date: Date;
    clicks: number;
}


const UrlSchema: Schema = new Schema({
    longUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    clicks: { type: Number, required: true, default: 0 }
});

export default mongoose.model<IUrl>('Url', UrlSchema);