"use strict";

const { createClient } = require("@supabase/supabase-js");
const crypto = require("crypto");

const getKey = ({ directory, file }) => {
  // const name = file.name.split(".").shift();
  const path = file.path ? `${file.path}/` : "";
  return `${directory}/${path}${file.hash}${file.ext}`;
};

const getPublicURL = (path) => {
  try {
    const { publicURL, error } = supabase.storage
      .from("public")
      .getPublicUrl(path);
    if (error) throw error;
    return publicURL;
  } catch (err) {
    console.log("Error downloading file: ", err.message);
  }
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

    const upload = async (file, customParams = {}) => {
      try {
        // upload file on S3 bucket
        const path = file.path ? `${file.path}/` : "";
        const filePath = `${directory}/${path}${file.hash}${file.ext}`;
        const { error: uploadError } = await supabase.storage
          .from("public")
          .upload(filePath, file.stream || Buffer.from(file.buffer, "binary"), {
            cacheControl: "public, max-age=31536000, immutable",
            upsert: true,
            contentType: file.mime,
            ...customParams,
          });
        if (uploadError) throw uploadError;

        const { publicURL, error: getPublicUrlError } = supabase.storage
          .from("public")
          .getPublicUrl(filePath);
        if (getPublicUrlError) throw getPublicUrlError;

        file.url = publicURL;
        console.debug(`File ${filePath} successfully uploaded to ${file.url}`);
      } catch (error) {
        console.error(`Upload media error: ${error.message}`);
      }
    };

    // S3.upload(
    //   {
    //     Key: `${path}${file.hash}${file.ext}`,
    //     Body: file.stream || Buffer.from(file.buffer, "binary"),
    //     ACL: "public-read",
    //     ContentType: file.mime,
    //     ...customParams,
    //   },
    //   (err, data) => {
    //     if (err) {
    //       return reject(err);
    //     }

    //     // set the bucket file url
    //     file.url = data.Location;

    //     resolve();
    //   }
    // );

    return {
      async uploadStream(file, customParams = {}) {
        return upload(file, customParams);
      },
      async upload(file, customParams = {}) {
        return upload(file, customParams);
      },
      async delete(file) {
        try {
          // Delete the file from storage the space
          const path = file.path ? `${file.path}/` : "";
          const filePath = `${directory}/${path}${file.hash}${file.ext}`;

          const { error: deleteError } = await supabase.storage
            .from(bucket)
            .remove([filePath]);

          if (deleteError) throw deleteError;
          console.debug(`File ${filePath} successfully deleted`);
        } catch (error) {
          console.error(`Delete media error: ${error.message}`);
        }
        // return new Promise((resolve, reject) => {
        //   // delete file on S3 bucket
        //   const path = file.path ? `${file.path}/` : "";
        //   S3.deleteObject(
        //     {
        //       Key: `${path}${file.hash}${file.ext}`,
        //       ...customParams,
        //     },
        //     (err, data) => {
        //       if (err) {
        //         return reject(err);
        //       }

        //       resolve();
        //     }
        //   );
        // });
      },
    };
  },
};
