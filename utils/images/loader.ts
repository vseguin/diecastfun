type Options = {
  src: String;
  width: Number;
};

export default function cloudfrontLoader({ src, width }: Options) {
  debugger;
  const url = new URL(`${process.env.STORAGE_URL}${src}`);
  url.searchParams.set("format", "auto");
  url.searchParams.set("width", width.toString());
  url.searchParams.set("quality", "100");
  return url.href;
}
