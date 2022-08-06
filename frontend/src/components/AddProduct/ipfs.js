import { create } from 'ipfs-http-client';

export const getImgUrl = async (img) => {
    const projectId = "1yAQKsMawsft8Fw9FtNX1ZOgPz8";
    const projectSecret = "5e1658b5a43a08c7257712e407b99e4d";
    const auth =
      "Basic " +
      Buffer.from(projectId + ":" + projectSecret).toString("base64");
    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });

    const url = await client.add(img, {
        cidVersion: 1,
        hashAlg: "sha2-256",
    });

    return `https://ipfs.infura.io/ipfs/${url?.path}`;

}