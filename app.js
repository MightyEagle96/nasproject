import express from "express";
import morgan from "morgan";
import Downloader from "nodejs-file-downloader";
import https from "https";
import fs from "fs";
// const https = require("https");
// const fs = require("fs");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(morgan("dev"));

const path =
  "https://drive.google.com/file/d/10FDRhzTcLip75b1nCGipTJZMN8TL7Etz/view";

const path2 =
  '"https://drive.google.com/uc?export=view&id=1km3V6PP70MTUsNWFEgdVea6jv-0BMnRT",';

app.post("/postimages", async (req, res) => {
  res.send("processing data");

  try {
    for (let i = 0; i < req.body.length; i++) {
      if (i > 591) {
        console.log(req.body[i].passport);
        if (req.body[i].fileNumber) {
          const oldUrl = req.body[i].passport;

          const id = oldUrl.split("id=")[1];

          const newUrl = `https://drive.google.com/uc?export=view&id=${id}`;
          const downloader = new Downloader({
            url: newUrl,
            directory: "./passports",
            timeout: 60000,
          });

          const { filePath, downloadStatus } = await downloader.download();

          fs.rename(
            filePath,
            `./passports/${req.body[i].fileNumber}.jpg`,
            () => {
              console.log(`File ${i}`);
            }
          );
        }
      }
    }
  } catch (error) {
    console.log(new Error(error).message);
  }
});

app.listen(1234, () => {
  console.log("App is listening");
});
