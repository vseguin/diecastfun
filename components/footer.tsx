import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Instagram, Favorite } from "@mui/icons-material";
import { overlays, borders } from "../utils/theme";

export default function Footer() {
  return (
    <Box
      sx={{
        marginTop: "auto",
        borderTop: borders.default,
        padding: "32px",
        backgroundColor: overlays.dark,
        backdropFilter: "blur(8px)",
      }}
    >
      <Box
        className="flex-between gap-2"
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Typography
          component="div"
          className="flex-center"
          sx={{
            gap: 1,
            color: "text.secondary",
          }}
        >
          Built with{" "}
          <Favorite className="icon-small" sx={{ color: "#ef4444" }} /> using
          Next.js
        </Typography>
        <Box className="flex-center" sx={{ gap: 1 }}>
          <Typography component="div" sx={{ color: "text.secondary" }}>
            Find me on
          </Typography>
          <a
            href="https://www.instagram.com/164diecastfun/"
            target="_blank"
            rel="noreferrer"
            className="flex-center border-radius-8 transition-smooth"
            style={{
              gap: "6px",
              padding: "6px 12px",
              backgroundColor: overlays.light,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = overlays.medium;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = overlays.light;
            }}
          >
            <Instagram className="icon-medium" />
            <span>Instagram</span>
          </a>
        </Box>
      </Box>
    </Box>
  );
}
