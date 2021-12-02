"use strict";

const { createClient } = require("@supabase/supabase-js");
const crypto = require("crypto");

const getKey = ({ directory, file }) => {
  const name = file.name.split(".").shift();
  return `${directory}/${name}-${file.hash}${file.ext}`.replace(/^\//g, "");
};

module.exports = {
  init: (config) => {
    const { apiUrl, apiKey, bucket } = config;

    const directory = (config.directory || "strapi-uploads").replace(
      /(^\/)|(\/$)/g,
      ""
    );
    const options = config.options || undefined;

    const supabase = createClient(apiUrl, apiKey, options);

    return {
      upload: (file, customParams = {}) =>
        new Promise((resolve, reject) => {
          //--- Compute the file key.
          file.hash = crypto.createHash("md5").update(file.hash).digest("hex");
          //--- Upload the file into storage
          supabase.storage
            .from(bucket)
            .upload(
              getKey({ directory, file }),
              // file, // or Buffer.from(file.buffer, "binary"),
              Buffer.from(file.buffer, "binary"), // or file
              {
                cacheControl: "public, max-age=31536000, immutable",
                upsert: true,
                contentType: file.mime,
              }
            )
            .then(({ data, error: error1 }) => {
              if (error1) {
                console.error(error1);
                return reject(error1);
              }
              const { publicURL, error: error2 } = supabase.storage
                .from(bucket)
                .getPublicUrl(getKey({ directory, file }));
              if (error2) {
                console.error(error2);
                return reject(error2);
              }
              file.url = publicURL;
              resolve();
            });
        }),

      delete: (file, customParams = {}) =>
        new Promise((resolve, reject) => {
          //--- Delete the file fromstorage the space
          supabase.storage
            .from(bucket)
            .remove([getKey({ directory, file })])
            .then(({ data, error }) => {
              if (error) return reject(error);
              resolve();
            });
        }),
    };
  },
};
