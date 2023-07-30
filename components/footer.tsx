import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box className="flex flex-wrap">
      <Typography component="div">Built with love using NextJS.</Typography>
      <div>
        <Typography component="div">
          Find me on{" "}
          <a
            href="https://www.instagram.com/164diecastfun/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </Typography>
      </div>
    </Box>
  );
}
